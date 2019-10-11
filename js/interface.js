'use strict';

(function () {
  var PIN_HEIGHT = 80;
  var PINHALF_WIDTH = 32;
  var MIN_FIELDX = 0 - PINHALF_WIDTH;
  var MIN_FIELDY = 130;
  var MAX_FIELDY = 710;

  // Добавлена возможность открывать и закрывать карточки объявлений по нажатию на метки

  // функции открытия и закрытия карточки объявления
  window.renderOpenPopup = function (arrayData) {
    var startNumber = -1;

    collectPinAll().forEach(function (elem) {
      startNumber++;
      renderPinListener(elem, arrayData[startNumber]); // window.data.dataValues - массив данных

    });
  };


  // Запуск функции открытия и закрытия карточки объявления
  var renderPinListener = function (pin, card) {
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();

      openPopup(pin, card);
    });
  };


  // Логика открытия и закрытия 1-ой карточки объявления
  var openPopup = function (pin, cardPopup) {
    var mapCard = document.querySelector('.map__card');

    // Проверка, есть ли уже метка с активным классом
    collectPinAll().forEach(function (elemPin) {
      if (elemPin.classList.contains('map__pin--active')) {
        elemPin.classList.remove('map__pin--active');
      }
    });

    // Удаление уже открытой карточки
    if (mapCard) {
      mapCard.remove();
    }

    pin.classList.add('map__pin--active');

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
      pin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
    };

    closePopupButton.addEventListener('click', function () {
      closePopup();
    });

  };

  // Функция находит все метки на карте
  var collectPinAll = function () {
    var pinAll = document.querySelectorAll('.offer__pin');
    return pinAll;
  };

  // Добавление возможности перемещения главной метки---------------------------------------------------------------------------------------------------------------
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

      inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop + PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // Сценарий при котором происходит просто клик по метке (без перемещения)
      if (!dragged) {
        var onMainPinButtonClick = function (evtClick) {
          evtClick.preventDefault();
          inputAddress.value = (pinMainButton.offsetLeft + PINHALF_WIDTH) + ', ' + (pinMainButton.offsetTop + PIN_HEIGHT);
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
