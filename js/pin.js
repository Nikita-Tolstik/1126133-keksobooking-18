'use strict';

//  Создание pin (метки)

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  // Формирование pin (метки)
  var renderPin = function (dataOffer) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = dataOffer.location.x + 'px';
    pinElement.style.top = dataOffer.location.y + 'px';
    pinElement.querySelector('img').src = dataOffer.author.avatar;
    pinElement.querySelector('img').alt = dataOffer.offer.title;
    pinElement.classList.add('offer__pin');
    pinElement.classList.add('hidden');

    return pinElement;
  };

  // Добавление метки в разметку / на карту

  window.successHandler = function (arrayData) {
    var fragment = document.createDocumentFragment();

    arrayData.forEach(function (pinElement) {
      fragment.appendChild(renderPin(pinElement));
    });

    pinListElement.appendChild(fragment);

    window.renderOpenPopup(arrayData); // Вызов функции добавления возможности открытия и закрытия карточки объявления
  };

  // Вызов функции загрузки данных с сервера и обработки ошибок
  window.backend.load(window.successHandler, window.backend.errorHandler);

})();
