'use strict';

(function () {
  var PINHALF_WIDTH = 32;
  var ONE_GUEST = '1';
  var PINHALF_HEIGHT = 30;
  var PIN_HEIGHT = 80;


  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormfieldsetAll = adForm.querySelectorAll('fieldset');
  var capacityOptionDisabled = document.querySelectorAll('#capacity option');

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.children;
  var mapFiltersAll = Array.from(mapFiltersChildren);

  var pinMainButton = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  var pinMainX = pinMainButton.style.left;
  var pinMainY = pinMainButton.style.top;

  // Функция неактивного состояния страницы
  window.isInactive = function () {

    adFormfieldsetAll.forEach(function (element) {
      element.disabled = true;
    });

    mapFiltersAll.forEach(function (element) {
      element.disabled = true;
    });

    pinMainButton.style.left = pinMainX;
    pinMainButton.style.top = pinMainY;

    inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop + PINHALF_HEIGHT);
  };


  window.isInactive(); // Функция неактивного состояния страницы

  // Активное состояние страницы
  var openMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    adFormfieldsetAll.forEach(function (element) {
      element.disabled = false;
    });

    mapFiltersAll.forEach(function (element) {
      element.disabled = false;
    });

    capacityOptionDisabled.forEach(function (elem) {
      elem.disabled = true;
      if (elem.selected) {
        elem.selected = false;
      }
      if (elem.value === ONE_GUEST) {
        elem.selected = true;
        elem.disabled = false;
      }
    });


    window.updatePins(); // Вызов функции отрисовки меток на карте

    inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop + PIN_HEIGHT);

    pinMainButton.removeEventListener('keydown', window.onEnterPress);
    pinMainButton.removeEventListener('mousedown', window.onMainPinPress);
  };


  window.onEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openMap();
    }
  };

  window.onMainPinPress = function (evtCl) {
    evtCl.preventDefault();
    openMap();
  };

  pinMainButton.addEventListener('mousedown', window.onMainPinPress);

  pinMainButton.addEventListener('keydown', window.onEnterPress);


})();
