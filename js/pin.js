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

    window.util.removeCard(); // Удаление открытой карточки объявления
    window.util.removePin(); // Удаление всех меток

    // Проверка отображения определённого кол-ва объявлений
    var quantity = pins.length > MAX_PIN ? MAX_PIN : pins.length;
    var fragment = document.createDocumentFragment();

    // Отрисовка определённого кол-ва объявлений
    pins.slice(0, quantity).forEach(function (pinElement) {
      fragment.appendChild(renderPin(pinElement));
    });

    window.util.pinListElement.appendChild(fragment);
    window.renderOpenPopup(pins); // Вызов функции добавления возможности открытия и закрытия карточки объявления
  };

})();
