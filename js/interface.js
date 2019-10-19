'use strict';

(function () {

  var START_NUMBER = -1;

  // функции открытия и закрытия карточки объявления
  window.renderPopup = function (data) {
    var start = START_NUMBER;

    getPins().forEach(function (element) {
      start++;
      renderPinListener(element, data[start]); // window.data.dataValues - массив данных

    });
  };


  // Запуск функции открытия и закрытия карточки объявления
  var renderPinListener = function (pin, card) {
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();

      openPopup(pin, card);
    });
  };


  // Логика открытия и закрытия одной карточки объявления
  var openPopup = function (pin, cardPopup) {

    // Проверка, есть ли уже метка с активным классом
    getPins().forEach(function (elementPin) {
      if (elementPin.classList.contains('map__pin--active')) {
        elementPin.classList.remove('map__pin--active');
      }
    });

    pin.classList.add('map__pin--active');

    // Удаление открытой карточки объявления
    window.util.removeCard();

    window.card.renderCardFragment(cardPopup);

    var popup = document.querySelector('.popup');
    var closePopupButton = popup.querySelector('.popup__close');

    var onCardEscPress = function (evtEsc) {
      if (evtEsc.keyCode === window.util.ESC_KEYCODE) {
        closePopup();
      }
    };

    var closePopup = function () {
      window.util.removeCard();
      pin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
    };

    document.addEventListener('keydown', onCardEscPress);

    closePopupButton.addEventListener('click', function () {
      closePopup();
    });

  };

  // Функция находит все метки на карте
  var getPins = function () {
    var pins = document.querySelectorAll('.offer__pin');
    return pins;
  };

})();

