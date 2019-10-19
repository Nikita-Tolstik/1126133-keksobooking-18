'use strict';

//  Создание pin (метки)

(function () {

  var MAX_PIN = 5;

  // Формирование pin (метки)
  var renderPin = function (data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = data.location.x + 'px';
    pin.style.top = data.location.y + 'px';
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    pin.classList.add('offer__pin');

    return pin;
  };

  // Функция добавления меток в разметку / на карту
  window.appendPin = function (dataPins) {

    window.util.removeCard(); // Удаление открытой карточки объявления
    window.util.removePin(); // Удаление всех меток

    // Отсев объявлений не содержащих поле offer
    var pins = dataPins.filter(function (element) {
      return element.offer !== undefined;
    });

    // Проверка отображения определённого кол-ва объявлений
    var quantity = pins.length > MAX_PIN ? MAX_PIN : pins.length;
    var fragment = document.createDocumentFragment();

    // Отрисовка определённого кол-ва объявлений
    pins.slice(0, quantity).forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });

    window.util.pinList.appendChild(fragment);


    window.renderPopup(pins); // Вызов функции добавления возможности открытия и закрытия карточки объявления
  };

})();
