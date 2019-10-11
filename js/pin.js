'use strict';

//  Создание pin (метки)

(function () {

  var MAX_PIN = 5;

  // Формирование pin (метки)
  var renderPin = function (dataOffer) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = dataOffer.location.x + 'px';
    pinElement.style.top = dataOffer.location.y + 'px';
    pinElement.querySelector('img').src = dataOffer.author.avatar;
    pinElement.querySelector('img').alt = dataOffer.offer.title;
    pinElement.classList.add('offer__pin');

    return pinElement;
  };

  // Функция добавления меток в разметку / на карту
  window.appendPin = function (pins) {

    var pinListElement = document.querySelector('.map__pins');

    // Удаление уже открытой карточки
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    // Удаление старых меток после смены фильтра
    var pinMap = pinListElement.querySelectorAll('.offer__pin');
    if (pinMap) {
      pinMap.forEach(function (pin) {
        pin.remove();
      });
    }

    // Проверка отображения определённого кол-ва объявлений
    var quantity = pins.length > MAX_PIN ? MAX_PIN : pins.length;
    var fragment = document.createDocumentFragment();

    // Отрисовка определённого кол-ва объявлений
    pins.slice(0, quantity).forEach(function (pinElement) {
      fragment.appendChild(renderPin(pinElement));
    });

    pinListElement.appendChild(fragment);
    window.renderOpenPopup(pins); // Вызов функции добавления возможности открытия и закрытия карточки объявления
  };


  window.successHandler = function (data) {
    window.ads = data; // Передача данных сервера в глобальную область видимости
  };

  // Вызов функции загрузки данных с сервера и обработки ошибок
  window.backend.load(window.successHandler, window.backend.errorHandler);

})();
