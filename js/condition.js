'use strict';

(function () {

  var ONE_GUEST = '1';

  var adFormfieldsets = window.util.formAd.querySelectorAll('fieldset');
  var capacityOptions = document.querySelectorAll('#capacity option');
  window.filterContainer = window.util.map.querySelector('.map__filters-container');

  var mapFilterChildren = window.util.mapFilter.children;
  var mapFilters = Array.from(mapFilterChildren);

  var pinMainX = window.util.pinMainButton.style.left;
  var pinMainY = window.util.pinMainButton.style.top;

  // Пространство имён condition.js
  window.condition = {

    // Функция неактивного состояния страницы
    setInactive: function () {

      window.filterContainer.classList.add('hidden');

      adFormfieldsets.forEach(function (element) {
        element.disabled = true;
      });

      mapFilters.forEach(function (element) {
        element.disabled = true;
      });

      window.util.pinMainButton.style.left = pinMainX;
      window.util.pinMainButton.style.top = pinMainY;

      window.util.inputAddress.value = (window.util.pinMainButton.offsetLeft + window.draggable.PINHALF_SIZE) + ', ' + (window.util.pinMainButton.offsetTop + window.draggable.PINHALF_SIZE);
    },

    onEnterPress: function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        openMap();
      }
    },

    onMainPinPress: function (evtCl) {
      evtCl.preventDefault();
      openMap();
    }

  };

  window.condition.setInactive(); // Функция неактивного состояния страницы


  // Активное состояние страницы
  var openMap = function () {
    window.util.map.classList.remove('map--faded');
    window.util.formAd.classList.remove('ad-form--disabled');

    adFormfieldsets.forEach(function (element) {
      element.disabled = false;
    });

    mapFilters.forEach(function (element) {
      element.disabled = false;
    });

    capacityOptions.forEach(function (element) {
      element.disabled = true;
      if (element.selected) {
        element.selected = false;
      }
      if (element.value === ONE_GUEST) {
        element.selected = true;
        element.disabled = false;
      }
    });

    // Загрузка данных с сервера
    var onDataLoad = function (data) {
      window.ads = data; // Передача данных с сервера в глобальную область видимости

      window.filter.updatePins(); // Вызов функции отрисовки меток на карте
      // Отображение фильтров
      window.filterContainer.classList.remove('hidden');
    };

    // Вызов функции загрузки данных с сервера и обработки ошибок
    window.backend.load(onDataLoad, window.backend.onErrorLoad);


    window.util.inputAddress.value = (window.util.pinMainButton.offsetLeft + window.draggable.PINHALF_SIZE) + ', ' + (window.util.pinMainButton.offsetTop + window.draggable.PIN_HEIGHT);

    window.util.pinMainButton.removeEventListener('keydown', window.condition.onEnterPress);
    window.util.pinMainButton.removeEventListener('mousedown', window.condition.onMainPinPress);
  };


  window.util.pinMainButton.addEventListener('mousedown', window.condition.onMainPinPress);

  window.util.pinMainButton.addEventListener('keydown', window.condition.onEnterPress);


})();
