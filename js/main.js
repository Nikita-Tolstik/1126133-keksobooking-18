'use strict';

var QUANTITY_AD = 8;
var NUMBER_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ADRESS_LOCATION = ['600, 350', '350, 600', '500, 400', '300, 200', '100, 700'];
var MIN_LENGTH = 1;
var MIN_NUMBER = 0;
var TITLE_AD = ['Роскошно', 'Недорого', 'В центре', 'Сдам на сутки', 'Продам'];
var COST_SUM = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
var NUMBER_ROOMS = [1, 2, 3, 4, 5, 10];
var NUMBER_GUESTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var DESCRIPTION_AD = ['Уютно и просторно', 'Светло', 'Тихие соседи', 'Большие комнаты', 'Рядом метро', 'Большой балкон'];
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

var renderFragment = function (allOffer) {
  var fragment = document.createDocumentFragment();

  allOffer.forEach(function (num) {
    fragment.appendChild(renderPin(num));
  });

  return fragment;
};

pinListElement.appendChild(renderFragment(adds));
