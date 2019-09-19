'use strict';

var QUANTITY_AD = 8;

var NUMBER_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var MIN_NUMBER = 0;
var MAX_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURE_THINGS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DATA_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_Y = 130;
var MAX_Y = 630;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getDescriptionAd = function () {
  var newData = [];
  for (var i = 0; i < QUANTITY_AD; i++) {
    var information = {
      'author': {
        'avatar': 'img/avatars/user' + NUMBER_AVATARS[i] + '.png'
      },

      'offer': {
        'title': 'Жильё',
        'address': '600, 350',
        'price': 5000,
        'type': HOUSE_TYPES[getRandomNumber(MIN_NUMBER, HOUSE_TYPES.length)],
        'rooms': MAX_NUMBERS[getRandomNumber(MIN_NUMBER, MAX_NUMBERS.length)],
        'guests': MAX_NUMBERS[getRandomNumber(MIN_NUMBER, MAX_NUMBERS.length)],
        'checkin': CHECKIN_TIMES[getRandomNumber(MIN_NUMBER, CHECKIN_TIMES.length)],
        'checkout': CHECKOUT_TIMES[getRandomNumber(MIN_NUMBER, CHECKOUT_TIMES.length)],
        'features': FEATURE_THINGS.slice(MIN_NUMBER, getRandomNumber(MIN_NUMBER, FEATURE_THINGS.length)),
        'description': 'Уютно и просторно',
        'photos': DATA_PHOTOS.slice(MIN_NUMBER, getRandomNumber(MIN_NUMBER, DATA_PHOTOS.length)),
      },

      'location': {
        'x': доделать,
        'y': getRandomIntInclusive(MIN_Y, MAX_Y)
      }
    };
    newData.push(information);
  }
  return newData;
};
