'use strict';

var QUANTITY_AD = 8;
var NUMBER_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ADRESS_LOCATION = ['600, 350', '350, 600', '500, 400', '300, 200', '100, 700'];
var MIN_LENGTH = 1;
var MIN_NUMBER = 0;
var TITLE_AD = ['Роскошно', 'Недорого', 'В центре', 'Сдам на сутки', 'Продам'];
var COST_SUM = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
var NUMBER_ROOMS = [1, 2, 3, 4, 5, 14];
var NUMBER_GUESTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var DESCRIPTION_AD = ['Уютно и просторно.', 'Светло, тихо и чисто.', 'Тихие соседи.', 'Большие комнаты.', 'Рядом метро.', 'Большой балкон.'];
var FEATURE_THINGS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DATA_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = -25;
var MAX_X = 1175;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinListElement = document.querySelector('.map__pins');

var cardTemplate = document.querySelector('#card').content;
var cardListElement = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var getArrayRandomElement = function (valueElement) {
  var min = 0;
  var numberRandom = Math.floor(Math.random() * (valueElement.length - min)) + min;
  return valueElement[numberRandom];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getDescriptionAd = function (quantity) {

  var dataOptions = [];
  for (var i = 0; i < quantity; i++) {
    var information = {
      'author': {
        'avatar': 'img/avatars/user' + NUMBER_AVATARS[i] + '.png'
      },

      'offer': {
        'title': getArrayRandomElement(TITLE_AD),
        'address': getArrayRandomElement(ADRESS_LOCATION),
        'price': getArrayRandomElement(COST_SUM),
        'type': getArrayRandomElement(HOUSE_TYPES),
        'rooms': getArrayRandomElement(NUMBER_ROOMS),
        'guests': getArrayRandomElement(NUMBER_GUESTS),
        'checkin': getArrayRandomElement(CHECKIN_TIMES),
        'checkout': getArrayRandomElement(CHECKOUT_TIMES),
        'features': FEATURE_THINGS.slice(MIN_NUMBER, getRandomNumber(MIN_LENGTH, FEATURE_THINGS.length)),
        'description': getArrayRandomElement(DESCRIPTION_AD),
        'photos': DATA_PHOTOS.slice(MIN_NUMBER, getRandomNumber(MIN_LENGTH, DATA_PHOTOS.length)),
      },

      'location': {
        'x': getRandomNumber(MIN_X, MAX_X),
        'y': getRandomNumber(MIN_Y, MAX_Y)
      }
    };
    dataOptions.push(information);
  }
  return dataOptions;
};

var adds = getDescriptionAd(QUANTITY_AD);

var renderPin = function (dataOffer) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = dataOffer.location.x + 'px';
  pinElement.style.top = dataOffer.location.y + 'px';
  pinElement.querySelector('img').src = dataOffer.author.avatar;
  pinElement.querySelector('img').alt = dataOffer.offer.title;

  return pinElement;
};

var renderPinFragment = function (allOffer) {
  var fragment = document.createDocumentFragment();

  allOffer.forEach(function (num) {
    fragment.appendChild(renderPin(num));
  });

  return fragment;
};

pinListElement.appendChild(renderPinFragment(adds));

var firstCard = adds[0];

var getStringToNumber = function (number) {
  var element = String(number);
  var elementLast = Number(element[element.length - 1]);

  return elementLast;
};

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

// Формирование карточки объявления
var renderCard = function (dataOffer) {
  var cardElement = cardTemplate.cloneNode(true);

  var card = {
    'premise': {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    }
  };

  cardElement.querySelector('.popup__title').textContent = dataOffer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = dataOffer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = dataOffer.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.premise[dataOffer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = getStringEnd(dataOffer.offer.rooms, dataOffer.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataOffer.offer.checkin + ', ' + 'выезд до ' + dataOffer.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = dataOffer.offer.description;

  // Добавление фото помещений
  var photosList = cardElement.querySelector('.popup__photos');
  for (var j = 0; j < dataOffer.offer.photos.length; j++) {
    var photoElement = photosList.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = dataOffer.offer.photos[j];
    photosList.appendChild(photoElement);
  }
  var photoElements = photosList.querySelectorAll('.popup__photo');
  photosList.removeChild(photoElements[0]);

  // Формирование доступных удобств
  var listPopupFeatures = cardElement.querySelector('.popup__features');
  var element = listPopupFeatures.querySelectorAll('li');
  element.forEach(function (num) {
    var classElement = num.className;
    if (dataOffer.offer.features.indexOf(classElement.slice(31)) === -1) {
      listPopupFeatures.removeChild(num);
    }
  });

  cardElement.querySelector('.popup__avatar').src = dataOffer.author.avatar;

  return cardElement;
};

var renderCardFragment = function (allOffer) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(allOffer));

  return fragment;
};

cardListElement.insertBefore(renderCardFragment(firstCard), mapFiltersContainer);
