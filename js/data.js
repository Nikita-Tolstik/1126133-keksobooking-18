'use strict';

(function () {

  var QUANTITY_AD = 8;
  var MIN_LENGTH = 1;
  var MIN_NUMBER = 0;

  // Функция создания случайного элемента массива
  var getArrayRandomElement = function (valueElement) {
    var min = 0;
    var numberRandom = Math.floor(Math.random() * (valueElement.length - min)) + min;
    return valueElement[numberRandom];
  };


  var getDescriptionAd = function (quantity) {

    var dataOptions = [];
    for (var i = 0; i < quantity; i++) {
      var information = {
        'author': {
          'avatar': 'img/avatars/user' + window.util.NUMBER_AVATARS[i] + '.png'
        },

        'offer': {
          'title': getArrayRandomElement(window.util.TITLE_ADDS),
          'address': getArrayRandomElement(window.util.ADRESS_NUMBERS),
          'price': getArrayRandomElement(window.util.COST_NUMBERS),
          'type': getArrayRandomElement(window.util.HOUSE_TYPES),
          'rooms': getArrayRandomElement(window.util.NUMBER_ROOMS),
          'guests': getArrayRandomElement(window.util.NUMBER_GUESTS),
          'checkin': getArrayRandomElement(window.util.CHECKIN_TIMES),
          'checkout': getArrayRandomElement(window.util.CHECKOUT_TIMES),
          'features': window.util.FEATURE_THINGS.slice(MIN_NUMBER, window.util.getRandomNumber(MIN_LENGTH, window.util.FEATURE_THINGS.length)),
          'description': getArrayRandomElement(window.util.DESCRIPTION_ADDS),
          'photos': window.util.DATA_PHOTOS.slice(MIN_NUMBER, window.util.getRandomNumber(MIN_LENGTH, window.util.DATA_PHOTOS.length)),
        },

        'location': {
          'x': window.util.getRandomNumber(window.util.MIN_X, window.util.MAX_X),
          'y': window.util.getRandomNumber(window.util.MIN_Y, window.util.MAX_Y)
        }
      };
      dataOptions.push(information);
    }
    return dataOptions;
  };

  window.data = {
    dataValues: getDescriptionAd(QUANTITY_AD)
  };
})();
