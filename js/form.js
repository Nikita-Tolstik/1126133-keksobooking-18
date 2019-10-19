'use strict';


// Проверка валидации комнат и гостей
(function () {
  var roomSelect = document.querySelector('[name=rooms]');
  var title = window.util.formAd.querySelector('#title');
  var priceNight = window.util.formAd.querySelector('#price');

  var type = window.util.formAd.querySelector('#type');
  var typeOptions = type.querySelectorAll('option');
  var selectType = typeOptions[type.selectedIndex].value;

  var timeIn = window.util.formAd.querySelector('#timein');
  var timeOut = window.util.formAd.querySelector('#timeout');

  var buttonReset = window.util.formAd.querySelector('.ad-form__reset');

  var Limit = {
    MIN_LENGTH: '30',
    MAX_LENGTH: '100',
    MAX_PRICE: '1000000'
  };

  var priceMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };


  var validateGuestNumber = function (evt) {
    var roomMap = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0'],
    };

    var guestMap = {
      '1': '2',
      '2': '1',
      '3': '0',
      '100': '3'
    };

    var selectRoom = evt.target.value;
    var guests = roomMap[selectRoom];
    var guestSelect = document.querySelector('#capacity');
    var capacityOptions = guestSelect.querySelectorAll('option');

    guestSelect.selectedIndex = guestMap[selectRoom];

    capacityOptions.forEach(function (option) {
      if (guests.includes(option.value)) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });
  };


  roomSelect.addEventListener('input', function (evt) {
    validateGuestNumber(evt);
  });


  // Валидация заголовка
  title.setAttribute('required', true);
  title.setAttribute('minlength', Limit.MIN_LENGTH);
  title.setAttribute('maxlength', Limit.MAX_LENGTH);

  // Валидация цены за ночь
  priceNight.setAttribute('required', true);
  priceNight.setAttribute('max', Limit.MAX_PRICE);

  // Валидация соответствия типа жилья и цены за ночь
  priceNight.setAttribute('placeholder', priceMap[selectType]);

  var validateType = function () {
    typeOptions.forEach(function (option) {
      if (option.selected) {
        priceNight.placeholder = priceMap[option.value];
        priceNight.setAttribute('min', priceMap[option.value]);

      }
    });
  };

  type.addEventListener('input', function () {
    validateType();
  });

  // Валидация адреса
  window.util.inputAddress.setAttribute('readonly', true);

  // Валидация времени заезда и выезда
  timeIn.addEventListener('input', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('input', function () {
    timeIn.value = timeOut.value;
  });


  // Обработчик отправки формы на сервер
  window.util.formAd.addEventListener('submit', function (evt) {
    window.backend.post(new FormData(window.util.formAd), onSuccessPost, window.backend.onErrorShow); // Вызов функции отправки данных на сервер
    evt.preventDefault();
  });


  // Обработчик сброса формы
  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();

    resetFormAd(); // сброс формы объявления и перевода страницы в неактивное состояние
  });


  // Функция при успешной отрпавке данных на сервер
  var onSuccessPost = function () {

    resetFormAd(); // сброс формы объявления и перевода страницы в неактивное состояние

    window.backend.showSuccess(); // Отображение окна успешной отправки данных

  };


  // Функция сброса формы объявления и перевода страницы в неактивное состояние
  var resetFormAd = function () {

    window.util.map.classList.add('map--faded');
    window.util.formAd.classList.add('ad-form--disabled');

    // Удаление открытой карточки объявления
    window.util.removeCard();

    // Удаление всех меток
    window.util.removePin();

    window.util.mapFilter.reset(); // Сброс формы фильтров
    window.util.formAd.reset(); // Сброс формы объявления
    window.isInactive(); // Перевод страницы в неактивный режим

    // Перевод страницы в активный режим
    window.util.pinMainButton.addEventListener('mousedown', window.onMainPinPress);
    window.util.pinMainButton.addEventListener('keydown', window.onEnterPress);

    // Возвращает изначальные значения фильтров карты
    window.resetFilter();

    priceNight.setAttribute('placeholder', priceMap[selectType]);
    priceNight.setAttribute('min', priceMap[selectType]);

    // Сброс фото картинок
    window.resetImage();
  };

  // var features = window.util.formAd.querySelectorAll('.ad-form__element--wide.features input');
  // console.log(features);
  // features.forEach(function (elem) {
  //   elem.addEventListener('keydown', function (evt) {
  //     if (evt.keyCode === window.util.ENTER_KEYCODE) {
  //       if (!elem.checked) {
  //         elem.checked = false;
  //       } else {
  //         elem.checked = true;
  //       }
  //     }
  //   });
  // });
})();
