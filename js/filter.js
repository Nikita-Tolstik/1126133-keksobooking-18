'use strict';

(function () {

  var START_VALUE = 'any';
  var EMPTY_ARRAY = [];
  var ONE_ELEMENT = 1;

  var Price = {
    'LOW_PRICE': 0,
    'MIN_MIDDLE_PRICE': 10000,
    'MAX_MIDDLE_PRICE': 50000,
    'HIGH_PRICE': 1000000
  };


  // Обработчики на форму фильтрации
  var typeValue = START_VALUE;
  var priceValue = START_VALUE;
  var roomValue = START_VALUE;
  var guestValue = START_VALUE;

  var features = window.util.mapFilter.querySelectorAll('fieldset input');
  var featureValues = [];


  // Добавление обработчиков на форму фильтрации по типу жилья, цене, кол-ву комнат, кол-ву гостей
  window.util.mapFilter.querySelectorAll('select').forEach(function (elem) {
    elem.addEventListener('input', function (evt) {

      switch (elem.name) {
        case 'housing-type':
          typeValue = evt.target.value;
          break;
        case 'housing-price':
          priceValue = evt.target.value;
          break;
        case 'housing-rooms':
          roomValue = evt.target.value;
          break;
        case 'housing-guests':
          guestValue = evt.target.value;
          break;
      }
      // Вызов функции устранения дребезга
      selectChange();
    });
  });


  // Смена удобства при клике
  features.forEach(function (elem) {
    elem.addEventListener('click', function () {
      changeCheckbox(!elem.checked, elem);
    });
  });

  // Смена удобства при нажатии на enter
  features.forEach(function (elem) {
    elem.addEventListener('keypress', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        changeCheckbox(elem.checked, elem);
      }
    });
  });


  var filteredPins;
  // Функция фильтрации объявления
  window.updatePins = function () {
    filteredPins = window.ads.slice();

    // Первоначальное отображение всех меток при запуске
    filteredPins = filteredPins.filter(function (elem) {
      return elem;
    });

    // Фильтрация по типу жилья
    if (typeValue !== START_VALUE) {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.type === typeValue;
      });
    }

    // Фильтрация по цене
    if (priceValue !== START_VALUE) {
      filteredPins = filteredPins.filter(function (elem) {
        switch (priceValue) {
          case 'middle':
            return elem.offer.price >= Price.MIN_MIDDLE_PRICE && elem.offer.price < Price.MAX_MIDDLE_PRICE;
          case 'high':
            return elem.offer.price >= Price.MAX_MIDDLE_PRICE && elem.offer.price < Price.HIGH_PRICE;
        }
        return elem.offer.price >= Price.LOW_PRICE && elem.offer.price < Price.MIN_MIDDLE_PRICE;
      });
    }


    // Фильтрация по кол-ву комнат
    if (roomValue !== START_VALUE) {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.rooms === Number(roomValue);
      });
    }

    // Фильтрация по кол-ву гостей
    if (guestValue !== START_VALUE) {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.guests === Number(guestValue);
      });
    }

    // Фильтрация по удобствам
    filteredPins = filteredPins.filter(function (elem) {

      // проверка, есть ли в списке каждое выбранное удобство
      if (elem.offer.features !== EMPTY_ARRAY) {
        var check = featureValues.every(function (element) {
          return elem.offer.features.includes(element);
        });
      }

      return check;
    });

    window.appendPin(filteredPins);
  };

  // Функция устранения дребезга
  var selectChange = window.debounce(function () {
    window.updatePins();
  });


  // Возвращает изначальные значения фильтров карты после отправки формы
  window.resetFilter = function () {
    typeValue = START_VALUE;
    priceValue = START_VALUE;
    roomValue = START_VALUE;
    guestValue = START_VALUE;
    featureValues = [];
  };


  // проверка, поставили или убрали чекбокс с данного удобства (если поставили - добавить, если убрали - удалить)
  var changeCheckbox = function (flag, element) {
    if (flag) {
      element.checked = false;
      featureValues.splice(featureValues.indexOf(element.value), ONE_ELEMENT);
    } else {
      element.checked = true;
      featureValues.push(element.value);
    }
    selectChange();
  };

})();
