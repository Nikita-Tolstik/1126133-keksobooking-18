'use strict';
/*
(function () {
  var CLASS_FEATURE = 31;

  var types = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content;
  var cardListElement = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');


  // Функция для определения одной последней цифры комнат/гостей
  var getStringToNumber = function (number) {
    var element = String(number);
    var elementLast = Number(element[element.length - 1]);

    return elementLast;
  };
  // Функция для определения двух последних цифр комнат/гостей
  var getStringToNumberDouble = function (number) {
    var element = String(number);
    var roomElementLast = Number(element[element.length - 2] + element[element.length - 1]);

    return roomElementLast;
  };
  // Определение окончания строки
  var getStringEnd = function (numberRoom, numberGuest) {
    var guestStringEnd = 'ей';
    if (getStringToNumber(numberGuest) === 1) {
      guestStringEnd = 'я';
    }

    var roomStringEnd = '';
    if (getStringToNumber(numberRoom) === 1) {
      roomStringEnd = 'а';
    } else if (getStringToNumberDouble(numberRoom) >= 12 && getStringToNumberDouble(numberRoom) <= 14) {
      roomStringEnd = '';
    } else if (getStringToNumber(numberRoom) >= 2 && getStringToNumber(numberRoom) <= 4) {
      roomStringEnd = 'ы';
    }

    return numberRoom + ' комнат' + roomStringEnd + ' для ' + numberGuest + ' гост' + guestStringEnd;
  };

  // Создание объявления
  var renderCard = function (dataOffer) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = dataOffer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = dataOffer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = dataOffer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = types[dataOffer.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = getStringEnd(dataOffer.offer.rooms, dataOffer.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataOffer.offer.checkin + ', ' + 'выезд до ' + dataOffer.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = dataOffer.offer.description;

    // Добавление фото помещений
    var photosList = cardElement.querySelector('.popup__photos');
    dataOffer.offer.photos.forEach(function (photo) {
      var photoElement = photosList.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;
      photosList.appendChild(photoElement);
    });

    var photoElements = photosList.querySelectorAll('.popup__photo');
    photosList.removeChild(photoElements[0]);

    // Формирование доступных удобств
    var listPopupFeatures = cardElement.querySelector('.popup__features');
    var element = listPopupFeatures.querySelectorAll('li');
    element.forEach(function (num) {
      var classElement = num.className;
      if (dataOffer.offer.features.indexOf(classElement.slice(CLASS_FEATURE)) === -1) {
        listPopupFeatures.removeChild(num);
      }
    });

    cardElement.querySelector('.popup__avatar').src = dataOffer.author.avatar;

    return cardElement;
  };

  // Добавление карточки в разметку
  var renderCardFragment = function (allOffer) {
    var fragment = document.createDocumentFragment();
    // Дописать цикл forEach
    fragment.appendChild(renderCard(allOffer));

    return fragment;
  };

  // Вызов метода отображения карточки, window.data.dataValues - массив данных
  cardListElement.insertBefore(renderCardFragment(window.data.dataValues[0]), mapFiltersContainer);
})();
*/
