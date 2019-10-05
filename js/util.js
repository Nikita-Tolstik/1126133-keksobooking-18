'use strict';

(function () {
  var NUMBER_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var ADRESS_NUMBERS = ['600, 350', '350, 600', '500, 400', '300, 200', '100, 700'];
  var TITLE_ADDS = ['Роскошно', 'Недорого', 'В центре', 'Сдам на сутки', 'Продам'];
  var COST_NUMBERS = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
  var NUMBER_ROOMS = [1, 2, 3, 4, 5, 14];
  var NUMBER_GUESTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var DESCRIPTION_ADDS = ['Уютно и просторно.', 'Светло, тихо и чисто.', 'Тихие соседи.', 'Большие комнаты.', 'Рядом метро.', 'Большой балкон.'];
  var FEATURE_THINGS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DATA_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = -25;
  var MAX_X = 1175;

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {

    NUMBER_AVATARS: NUMBER_AVATARS,
    ADRESS_NUMBERS: ADRESS_NUMBERS,
    TITLE_ADDS: TITLE_ADDS,
    COST_NUMBERS: COST_NUMBERS,
    NUMBER_ROOMS: NUMBER_ROOMS,
    NUMBER_GUESTS: NUMBER_GUESTS,
    HOUSE_TYPES: HOUSE_TYPES,
    CHECKIN_TIMES: CHECKIN_TIMES,
    CHECKOUT_TIMES: CHECKOUT_TIMES,
    DESCRIPTION_ADDS: DESCRIPTION_ADDS,
    FEATURE_THINGS: FEATURE_THINGS,
    DATA_PHOTOS: DATA_PHOTOS,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X,

    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();


