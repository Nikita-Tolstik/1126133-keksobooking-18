'use strict';

(function () {
  var PINHALF_WIDTH = 32;
  var ONE_GUEST = '1';
  var PINHALF_HEIGHT = 30;

  // Неактивное состояние страницы
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormfieldsetAll = adForm.querySelectorAll('fieldset');

  adFormfieldsetAll.forEach(function (element) {
    element.disabled = true;
  });

  var capacityOptionDisabled = document.querySelectorAll('#capacity option');

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersChildren = mapFilters.children;
  var mapFiltersAll = Array.from(mapFiltersChildren);

  mapFiltersAll.forEach(function (element) {
    element.disabled = true;
  });

  var pinMainButton = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop + PINHALF_HEIGHT);

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
      elem.disabled = 'disabled';
      if (elem.selected) {
        elem.selected = false;
      }
      if (elem.value === ONE_GUEST) {
        elem.selected = true;
      }
    });

    // Отображение других объявлений на карте (меток)
    var pinAll = document.querySelectorAll('.offer__pin');
    pinAll.forEach(function (pinElement) {
      pinElement.classList.remove('hidden');
    });

    inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop);
  };


  pinMainButton.addEventListener('mousedown', function () {
    openMap();
  });

  pinMainButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openMap();
    }
  });

})();
