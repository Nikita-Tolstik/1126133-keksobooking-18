'use strict';

(function () {
  var PIN_HEIGHT = 80;
  var PINHALF_WIDTH = 32;
  var MIN_FIELDX = 0 - PINHALF_WIDTH;
  var MIN_FIELDY = 130;
  var MAX_FIELDY = 710;
  var START_NUMBER = -1;

  // Добавлена возможность открывать и закрывать карточки объявлений по нажатию на метки

  // Логика открытия и закрытия 1-ой карточки объявления
  var openPopup = function (cardPopup) {
    // Проверка того есть ли уже открытый попап
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }

    window.card.renderCardFragment(cardPopup);

    var popup = document.querySelector('.popup');
    var closePopupButton = popup.querySelector('.popup__close');

    var onCardEscPress = function (evtEsc) {
      if (evtEsc.keyCode === window.util.ESC_KEYCODE) {
        closePopup();
      }
    };

    document.addEventListener('keydown', onCardEscPress);

    var closePopup = function () {
      popup.remove();
      document.removeEventListener('keydown', onCardEscPress);
    };

    closePopupButton.addEventListener('click', function () {
      closePopup();
    });

  };

  // Запуск функции открытия и закрытия карточки объявления
  var renderPinListener = function (pin, card) {
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();

      openPopup(card);
    });
  };

  // функции открытия и закрытия карточки объявления
  var renderOpenPopup = function () {
    var pinAll = document.querySelectorAll('.offer__pin');
    pinAll.forEach(function (elem) {
      START_NUMBER++;
      renderPinListener(elem, window.data.dataValues[START_NUMBER]); // window.data.dataValues - массив данных

    });
  };

  renderOpenPopup(); // Вызов функции добавления возможности открытия и закрытия карточки объявления


  // Добавление возможности перемещения главной метки
  var pinMainButton = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var mapPin = document.querySelector('.map__pins');

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
      var offsetX = pinMainButton.offsetLeft - shift.x;
      if (pinMainButton.offsetLeft - shift.x <= MIN_FIELDX) {
        offsetX = MIN_FIELDX;
      } else if (pinMainButton.offsetLeft - shift.x + PINHALF_WIDTH > maxFieldX) {
        offsetX = maxFieldX - PINHALF_WIDTH;
      }

      var offsetY = pinMainButton.offsetTop - shift.y;
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