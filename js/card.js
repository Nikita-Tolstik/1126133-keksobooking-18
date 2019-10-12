'use strict';

(function () {
  var CLASS_FEATURE = 31;

  var typeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // Функция для определения одной последней цифры комнат/гостей
  var getStringNumber = function (number) {
    var element = String(number);
    var lastElement = Number(element[element.length - 1]);

    return lastElement;
  };

  // Функция для определения двух последних цифр комнат/гостей
  var getStringNumberDouble = function (number) {
    var element = String(number);
    var lastElement = Number(element[element.length - 2] + element[element.length - 1]);

    return lastElement;
  };


  // Определение окончания строки
  var getStringEnd = function (numberRoom, numberGuest) {
    var guestStringEnd = 'ей';
    if (getStringNumber(numberGuest) === 1) {
      guestStringEnd = 'я';
    }

    var roomStringEnd = '';
    if (getStringNumber(numberRoom) === 1) {
      roomStringEnd = 'а';
    } else if (getStringNumberDouble(numberRoom) >= 12 && getStringNumberDouble(numberRoom) <= 14) {
      roomStringEnd = '';
    } else if (getStringNumber(numberRoom) >= 2 && getStringNumber(numberRoom) <= 4) {
      roomStringEnd = 'ы';
    }

    return numberRoom + ' комнат' + roomStringEnd + ' для ' + numberGuest + ' гост' + guestStringEnd;
  };


  // Создание объявления
  var renderCard = function (dataOffer) {
    var cardTemplate = document.querySelector('#card').content;

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = dataOffer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = dataOffer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = dataOffer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeMap[dataOffer.offer.type];
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
    var features = listPopupFeatures.querySelectorAll('li');
    features.forEach(function (num) {
      var classElement = num.className;
      if (dataOffer.offer.features.indexOf(classElement.slice(CLASS_FEATURE)) === -1) {
        listPopupFeatures.removeChild(num);
      }
    });

    cardElement.querySelector('.popup__avatar').src = dataOffer.author.avatar;

    return cardElement;
  };

  // Добавление карточки объявления в разметку
  window.card = {

    renderCardFragment: function (addOffer) {

      var mapFiltersContainer = document.querySelector('.map__filters-container');
      var elem = renderCard(addOffer);
      window.util.map.insertBefore(elem, mapFiltersContainer);
    }

  };

})();
