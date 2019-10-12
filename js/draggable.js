'use strict';

(function () {

  var PINHALF_SIZE = 32;
  var PIN_HEIGHT = 80;
  var MIN_FIELDX = 0 - PINHALF_SIZE;
  var MIN_FIELDY = 130;
  var MAX_FIELDY = 710;

  window.draggable = {
    PINHALF_SIZE: PINHALF_SIZE,
    PIN_HEIGHT: PIN_HEIGHT
  };

  // Добавление возможности перемещения главной метки
  window.util.pinMainButton.addEventListener('mousedown', function (evt) {
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
      var maxFieldX = window.util.pinListElement.offsetWidth;
      var offsetX = window.util.pinMainButton.offsetLeft - shift.x;
      if (window.util.pinMainButton.offsetLeft - shift.x <= MIN_FIELDX) {
        offsetX = MIN_FIELDX;
      } else if (window.util.pinMainButton.offsetLeft - shift.x + window.draggable.PINHALF_SIZE > maxFieldX) {
        offsetX = maxFieldX - window.draggable.PINHALF_SIZE;
      }

      var offsetY = window.util.pinMainButton.offsetTop - shift.y;
      if (window.util.pinMainButton.offsetTop - shift.y <= MIN_FIELDY) {
        offsetY = MIN_FIELDY;
      } else if (window.util.pinMainButton.offsetTop - shift.y + window.draggable.PIN_HEIGHT > MAX_FIELDY) {
        offsetY = MAX_FIELDY - window.draggable.PIN_HEIGHT;
      }

      window.util.pinMainButton.style.top = offsetY + 'px';
      window.util.pinMainButton.style.left = offsetX + 'px';

      window.util.inputAddress.value = (window.util.pinMainButton.offsetLeft + window.draggable.PINHALF_SIZE) + ', ' + (window.util.pinMainButton.offsetTop + window.draggable.PIN_HEIGHT);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      // Сценарий при котором происходит просто клик по метке (без перемещения)
      if (!dragged) {
        var onMainPinButtonClick = function (evtClick) {
          evtClick.preventDefault();
          window.util.inputAddress.value = (window.util.pinMainButton.offsetLeft + window.draggable.PINHALF_SIZE) + ', ' + (window.util.pinMainButton.offsetTop + window.draggable.PIN_HEIGHT);
          window.util.pinMainButton.removeEventListener('click', onMainPinButtonClick);
        };

        window.util.pinMainButton.addEventListener('click', onMainPinButtonClick);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
