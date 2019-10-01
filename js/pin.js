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

    return pinElement;
  };

  // Добавление метки в разметку / на карту
  var renderPinFragment = function (allOffer) {
    var fragment = document.createDocumentFragment();

    allOffer.forEach(function (pinElement) {
      fragment.appendChild(renderPin(pinElement));
    });

    return fragment;
  };

  // Вызов метода добавления меток в разметку / на карту, window.data.dataValues - массив данных
  pinListElement.appendChild(renderPinFragment(window.data.dataValues));


  // Элементы для Формирование отображения карты объяв
  /* var cardListElement = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var onPinClick = function (pin) {

    cardListElement.insertBefore(window.card.renderCardFragment(window.data.dataValues[5]), mapFiltersContainer);
  };

  var pinButton = pinListElement.querySelector('.map__pin');


  pinButton.addEventListener('click', function () {

    onPinClick(renderPin(window.data.dataValues[0]));

  });
*/

  var offerPins = pinListElement.querySelectorAll('.offer__pin');

  var onPinClick = function (pin, add) {
    var cardListElement = document.querySelector('.map');
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var openPopup = function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }

      cardListElement.insertBefore(window.card.renderCardFragment(window.data.dataValues[add]), mapFiltersContainer);
    };

    pin.addEventListener('click', function () {
      openPopup();
    });


  };

  for (var i = 0; i < offerPins.length; i++) {
    var pinButton = offerPins[i];
    onPinClick(pinButton, i);
  }
  // Вызов метода отображения карточки, window.data.dataValues - массив данных

})();


//  Создание pin (метки)
/*
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

    return pinElement;
  };

  // Добавление метки в разметку / на карту
  var renderPinFragment = function (allOffer) {
    var fragment = document.createDocumentFragment();

    allOffer.forEach(function (pinElement) {
      fragment.appendChild(renderPin(pinElement));
    });

    return fragment;
  };

  // Вызов метода добавления меток в разметку / на карту, window.data.dataValues - массив данных
  pinListElement.appendChild(renderPinFragment(window.data.dataValues));
})();
*/
