'use strict';


// Проверка валидации комнат и гостей
(function () {
  var validateRoomsNumbers = function (evt) {
    var roomsCapacityMap = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0'],
    };

    var guestsCapacityMap = {
      '1': '2',
      '2': '1',
      '3': '0',
      '100': '3'
    };

    var selectedRoom = evt.target.value;
    var guests = roomsCapacityMap[selectedRoom];
    var guestSelect = document.querySelector('#capacity');
    var guestsOption = guestSelect.querySelectorAll('option');

    guestSelect.selectedIndex = guestsCapacityMap[selectedRoom];

    guestsOption.forEach(function (option) {
      if (guests.includes(option.value)) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });
  };

  var roomsSelect = document.querySelector('[name=rooms]');
  roomsSelect.addEventListener('input', function (evt) {
    validateRoomsNumbers(evt);
  });

  var formAd = document.querySelector('.ad-form');

  // Валидация заголовка
  var title = formAd.querySelector('#title');
  title.setAttribute('required', true);
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');

  // Валидация цены за ночь
  var priceNight = formAd.querySelector('#price');
  priceNight.setAttribute('required', true);
  priceNight.setAttribute('max', '1000000');

  // Валидация соответствия типа жилья и цены за ночь
  var type = formAd.querySelector('#type');
  var typeOptions = type.querySelectorAll('option');
  var selectType = typeOptions[type.selectedIndex].value;

  var typePrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  priceNight.setAttribute('placeholder', typePrice[selectType]);
  priceNight.setAttribute('value', typePrice[selectType]);


  var validateType = function () {
    typeOptions.forEach(function (option) {
      if (option.selected) {
        priceNight.placeholder = typePrice[option.value];
        priceNight.setAttribute('min', typePrice[option.value]);
        priceNight.setAttribute('value', typePrice[option.value]);

      }
    });
  };

  type.addEventListener('input', function () {
    validateType();
  });

  // Валидация адреса
  var address = formAd.querySelector('#address');
  address.setAttribute('readonly', true);

  // Валидация времени заезда и выезда
  var timeIn = formAd.querySelector('#timein');
  var timeOut = formAd.querySelector('#timeout');

  timeIn.addEventListener('input', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('input', function () {
    timeIn.value = timeOut.value;
  });
})();
