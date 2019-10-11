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

  var form = document.querySelector('.ad-form');

  // Валидация заголовка
  var title = form.querySelector('#title');
  title.setAttribute('required', true);
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');

  // Валидация цены за ночь
  var priceNight = form.querySelector('#price');
  priceNight.setAttribute('required', true);
  priceNight.setAttribute('max', '1000000');

  // Валидация соответствия типа жилья и цены за ночь
  var type = form.querySelector('#type');
  var typeOptions = type.querySelectorAll('option');
  var selectType = typeOptions[type.selectedIndex].value;

  var typePrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  priceNight.setAttribute('placeholder', typePrice[selectType]);

  var validateType = function () {
    typeOptions.forEach(function (option) {
      if (option.selected) {
        priceNight.placeholder = typePrice[option.value];
        priceNight.setAttribute('min', typePrice[option.value]);

      }
    });
  };

  type.addEventListener('input', function () {
    validateType();
  });

  // Валидация адреса
  var address = form.querySelector('#address');
  address.setAttribute('readonly', true);

  // Валидация времени заезда и выезда
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  timeIn.addEventListener('input', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('input', function () {
    timeIn.value = timeOut.value;
  });

  // Вызов функции отправки данных на сервер
  form.addEventListener('submit', function (evt) {

    window.backend.save(new FormData(form), successHandler, window.backend.errorHandler);

    evt.preventDefault();
  });

  // Функция при успешной отрпавки данных на сервер
  var successHandler = function (response) {
    if (response) {
      var map = document.querySelector('.map');
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');

      // Удаление всех меток
      var pinAll = document.querySelectorAll('.offer__pin');
      pinAll.forEach(function (pinElement) {
        pinElement.remove();
      });

      // Удаление открытой карточки объявления
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }

      var mapFiltered = document.querySelector('.map__filters');

      mapFiltered.reset(); // Сброс формы фильтров
      form.reset(); // Сброс формы объявления
      window.isInactive(); // Перевод страницы в неактивный режим

      window.backend.load(window.successHandler, window.backend.errorHandler);

      // Перевод страницы в активный режим
      var pinMainButton = map.querySelector('.map__pin--main');

      pinMainButton.addEventListener('mousedown', window.onMainPinPress);
      pinMainButton.addEventListener('keydown', window.onEnterPress);

      // Отрисовка окна успешной отправке данных
      window.backend.successHandler();

    }
  };

})();
