'use strict';

(function () {
  var PINHALF_WIDTH = 32;
  var PIN_HEIGHT = 80;
  var ONE_GUEST = '1';
  var PINHALF_HEIGHT = 30;
  var MIN_FIELDX = 0 - PINHALF_WIDTH;
  var MIN_FIELDY = 130;
  var MAX_FIELDY = 710;

  // Неактивное состояние страницы
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormfieldsetAll = adForm.querySelectorAll('fieldset');

  var mapPin = map.querySelector('.map__pins');

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

  // Перетаскивание главной метки
  pinMainButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      // Определение границ, за которые не выходит метка
      var maxFieldX = mapPin.offsetWidth;
      var offsetX = 0;
      offsetX = pinMainButton.offsetLeft - shift.x;
      if (pinMainButton.offsetLeft - shift.x <= MIN_FIELDX) {
        offsetX = MIN_FIELDX;
      } else if (pinMainButton.offsetLeft - shift.x + PINHALF_WIDTH > maxFieldX) {
        offsetX = maxFieldX - PINHALF_WIDTH;
      }

      var offsetY = 0;
      offsetY = pinMainButton.offsetTop - shift.y;
      if (pinMainButton.offsetTop - shift.y <= MIN_FIELDY) {
        offsetY = MIN_FIELDY;
      } else if (pinMainButton.offsetTop - shift.y + PIN_HEIGHT > MAX_FIELDY) {
        offsetY = MAX_FIELDY - PIN_HEIGHT;
      }

      pinMainButton.style.top = offsetY + 'px';
      pinMainButton.style.left = offsetX + 'px';

      inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // Сценарий при котором происходит просто клик по метке (без перемещения)
      if (!dragged) {
        var onMainPinButtonClick = function (evtClick) {
          evtClick.preventDefault();
          inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop);
          pinMainButton.removeEventListener('click', onMainPinButtonClick);
        };
        pinMainButton.addEventListener('click', onMainPinButtonClick);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
