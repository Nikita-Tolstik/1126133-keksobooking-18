'use strict';

(function () {
  var CLASS_FEATURE = 31;
  var CHECKIN_TEXT = 'Заезд после ';
  var CHECKOUT_TEXT = 'выезд до ';
  var PRICE_TEXT = '₽/ночь';
  var NOT_FOUND = -1;

  var typeMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };


  // Создание объявления
  var renderCard = function (data) {
    var cardTemplate = document.querySelector('#card').content;

    var cardAd = cardTemplate.cloneNode(true);

    cardAd.querySelector('.popup__title').textContent = data.offer.title;
    cardAd.querySelector('.popup__text--address').textContent = data.offer.address;

    var textPrice = cardAd.querySelector('.popup__text--price');
    if (data.offer.g === undefined) {
      textPrice.classList.add('hidden');
    } else {
      textPrice.textContent = data.offer.price + PRICE_TEXT;
    }

    cardAd.querySelector('.popup__type').textContent = typeMap[data.offer.type];

    var textCapacity = cardAd.querySelector('.popup__text--capacity');
    if (data.offer.rooms === undefined || data.offer.guests === undefined) {
      textCapacity.classList.add('hidden');
    } else {
      textCapacity.textContent = window.getStringEnd(data.offer.rooms, data.offer.guests);
    }

    var textTime = cardAd.querySelector('.popup__text--time');
    if (data.offer.checkin === undefined || data.offer.checkout === undefined) {
      textTime.classList.add('hidden');
    } else {
      textTime.textContent = CHECKIN_TEXT + data.offer.checkin + ', ' + CHECKOUT_TEXT + data.offer.checkout;
    }

    cardAd.querySelector('.popup__description').textContent = data.offer.description;

    // Добавление фото помещений
    var photosList = cardAd.querySelector('.popup__photos');

    if (data.offer.photos === undefined) {
      photosList.style = 'display: none';
    } else {

      data.offer.photos.forEach(function (photo) {
        var photoAd = photosList.querySelector('.popup__photo').cloneNode(true);
        photoAd.src = photo;
        photosList.appendChild(photoAd);
      });

      var photoAds = photosList.querySelectorAll('.popup__photo');
      photosList.removeChild(photoAds[0]);
    }

    // Формирование доступных удобств
    var listPopupFeatures = cardAd.querySelector('.popup__features');
    var features = listPopupFeatures.querySelectorAll('li');

    if (data.offer.features === undefined) {
      listPopupFeatures.classList.add('hidden');
    } else {
      features.forEach(function (num) {
        var classFeature = num.className;
        if (data.offer.features.indexOf(classFeature.slice(CLASS_FEATURE)) === NOT_FOUND) {
          listPopupFeatures.removeChild(num);
        }
      });
    }

    cardAd.querySelector('.popup__avatar').src = data.author.avatar;

    return cardAd;
  };

  // Добавление карточки объявления в разметку
  window.card = {
    renderCardFragment: function (offer) {

      var mapFiltersContainer = document.querySelector('.map__filters-container');
      var elem = renderCard(offer);
      window.util.map.insertBefore(elem, mapFiltersContainer);
    }
  };

})();
