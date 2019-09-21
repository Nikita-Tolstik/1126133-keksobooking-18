'use strict';

var QUANTITY_AD = 8;
var NUMBER_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var ADRESS_LOCATION = '600, 350';
var MIN_NUMBER = 0;
var TITLE_AD = 'Жильё';
var COST_SUM = 5000;
var MAX_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var DESCRIPTION_AD = 'Уютно и просторно';
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

var getDescriptionAd = function (quantity) {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomIntInclusive = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var dataOptions = [];
  for (var i = 0; i < quantity; i++) {
    var information = {
      'author': {
        'avatar': 'img/avatars/user' + NUMBER_AVATARS[i] + '.png'
      },

      'offer': {
        'title': TITLE_AD,
        'address': ADRESS_LOCATION,
        'price': COST_SUM,
        'type': HOUSE_TYPES[getRandomNumber(MIN_NUMBER, HOUSE_TYPES.length)],
        'rooms': MAX_NUMBERS[getRandomNumber(MIN_NUMBER, MAX_NUMBERS.length)],
        'guests': MAX_NUMBERS[getRandomNumber(MIN_NUMBER, MAX_NUMBERS.length)],
        'checkin': CHECKIN_TIMES[getRandomNumber(MIN_NUMBER, CHECKIN_TIMES.length)],
        'checkout': CHECKOUT_TIMES[getRandomNumber(MIN_NUMBER, CHECKOUT_TIMES.length)],
        'features': FEATURE_THINGS.slice(MIN_NUMBER, getRandomNumber(MIN_NUMBER, FEATURE_THINGS.length)),
        'description': DESCRIPTION_AD,
        'photos': DATA_PHOTOS.slice(MIN_NUMBER, getRandomNumber(MIN_NUMBER, DATA_PHOTOS.length)),
      },

      'location': {
        'x': getRandomIntInclusive(MIN_X, MAX_X),
        'y': getRandomIntInclusive(MIN_Y, MAX_Y)
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
