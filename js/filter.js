'use strict';

(function () {

  var START_VALUE = 'any';
  var EMPTY_ARRAY = [];
  var ONE_ELEMENT = 1;


  // Обработчики на форму фильтрации
  var typeValue = START_VALUE;
  var priceValue = START_VALUE;
  var roomValue = START_VALUE;
  var guestValue = START_VALUE;


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
      onSelectChange();
    });
  });


  // удобства
  var features = window.util.mapFilter.querySelectorAll('fieldset input');
  var featureValues = [];

  features.forEach(function (elem) {
    elem.addEventListener('change', function (evt) {
      var target = evt.target.value;
      var featureChecked = evt.target.checked;
      // проверка, поставили или убрали чекбокс с данного удобства (если поставили - добавить, если убрали - удалить)
      if (featureChecked) {
        featureValues.push(target);
      } else {
        featureValues.splice(featureValues.indexOf(target), ONE_ELEMENT);
      }
      // Вызов функции устранения дребезга
      onSelectChange();
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
            return elem.offer.price >= 10000 && elem.offer.price < 50000;
          case 'high':
            return elem.offer.price >= 50000 && elem.offer.price < 1000000;
        }
        return elem.offer.price >= 0 && elem.offer.price < 10000;
      });
    }


    // Фильтрация по кол-ву комнат
    if (roomValue !== START_VALUE) {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.rooms === parseInt(roomValue, 10);
      });
    }

    // Фильтрация по кол-ву гостей
    if (guestValue !== START_VALUE) {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.guests === parseInt(guestValue, 10);
      });
    }

    // Фильтрация по удобствам
    filteredPins = filteredPins.filter(function (elem) {
      var check = false;

      // проверка, есть ли в списке каждое выбранное удобство
      if (elem.offer.features !== EMPTY_ARRAY) {
        check = featureValues.every(function (element) {
          return elem.offer.features.includes(element);
        });
      }

      return check;
    });

    window.appendPin(filteredPins);
  };

  // Функция устранения дребезга
  var onSelectChange = window.debounce(function () {
    window.updatePins();
  });

  // Возвращает изначальные значения фильтров карты после отправки формы
  window.returnValue = function () {
    typeValue = START_VALUE;
    priceValue = START_VALUE;
    roomValue = START_VALUE;
    guestValue = START_VALUE;
    featureValues = [];
  };

})();
