'use strict';

(function () {

  var PINHALF_SIZE = 32;
  var PIN_HEIGHT = 80;

  window.draggable = {
    PINHALF_SIZE: PINHALF_SIZE,
    PIN_HEIGHT: PIN_HEIGHT
  };

  // Добавление возможности перемещения главной метки
  window.util.pinMainButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startLocation = new window.Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;


      var shift = new window.Coordinate(moveEvt.clientX, moveEvt.clientY, window.util.pinMainButton.offsetLeft, window.util.pinMainButton.offsetTop);
      shift.setX(startLocation.x - shift.x);
      shift.setY(startLocation.y - shift.y);


      startLocation.setStartX(moveEvt.clientX);
      startLocation.setStartY(moveEvt.clientY);


      window.util.pinMainButton.style.top = shift.y + 'px';
      window.util.pinMainButton.style.left = shift.x + 'px';

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
