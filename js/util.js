'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {

    main: document.querySelector('main'),

    map: document.querySelector('.map'),

    mapFilter: document.querySelector('.map__filters'),

    inputAddress: document.querySelector('#address'),

    pinMainButton: document.querySelector('.map__pin--main'),

    pinList: document.querySelector('.map__pins'),

    formAd: document.querySelector('.ad-form'),

    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,

    // Функция удаления открытой карточки объявления
    removeCard: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
    },

    // Функция удаления всех меток
    removePin: function () {
      var pins = document.querySelectorAll('.offer__pin');
      if (pins) {
        pins.forEach(function (pin) {
          pin.remove();
        });
      }
    }

  };
})();
