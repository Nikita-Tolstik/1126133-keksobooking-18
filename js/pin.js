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

  var renderPinFragment = function (allOffer) {
    var fragment = document.createDocumentFragment();

    allOffer.forEach(function (pinElement) {
      fragment.appendChild(renderPin(pinElement));
    });

    pinListElement.appendChild(fragment);

  };

  renderPinFragment(window.data.dataValues); // Вызов метода добавления меток в разметку / на карту, window.data.dataValues - массив данных
  // window.data.dataValues - массив данных
})();
