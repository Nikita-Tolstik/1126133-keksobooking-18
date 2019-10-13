'use strict';

(function () {
  var houseFilter = window.util.mapFilter.querySelector('#housing-type');

  // Обработчик на форму фильтрации

  // По типу жилья
  var typeValue = houseFilter.value; // Исходное значение поля 'any'
  houseFilter.addEventListener('input', function (evt) {
    typeValue = evt.target.value; // Новое выбранное значение
    window.updatePins();
  });

  // По цене
  var priceFilter = window.util.mapFilter.querySelector('#housing-price');
  var priceValue = priceFilter.value; // Исходное значение поля 'any'
  priceFilter.addEventListener('input', function (evt) {
    priceValue = evt.target.value; // Новое выбранное значение
    window.updatePins();
  });


  // По кол-ву комнат
  var roomFilter = window.util.mapFilter.querySelector('#housing-rooms');
  var roomValue = roomFilter.value; // Исходное значение поля 'any'
  roomFilter.addEventListener('input', function (evt) {
    roomValue = evt.target.value; // Новое выбранное значение
    window.updatePins();
  });


  // По кол-ву гостей
  var guestFilter = window.util.mapFilter.querySelector('#housing-guests');
  var guestValue = guestFilter.value; // Исходное значение поля 'any'
  guestFilter.addEventListener('input', function (evt) {
    guestValue = evt.target.value; // Новое выбранное значение
    window.updatePins();
  });


  var features = window.util.mapFilter.querySelectorAll('fieldset input');

  var featureValue = [];
  var featureChecked;
  features.forEach(function (elem) {
    elem.addEventListener('change', function (evt) {

      var target = evt.target.value;


      featureChecked = evt.target.checked;
      if (!featureChecked) {

        console.log(featureValue.indexOf(target));
        featureValue.splice(featureValue.indexOf(target), 1);
      } else {
        featureValue.push(target);
      }
      window.updatePins();
    });
  });


  // Функция фильтрации объявления
  var filteredPins;

  window.updatePins = function () {
    filteredPins = window.ads.slice();


    filteredPins = filteredPins.filter(function (elem) {
      return elem !== undefined;
    });


    if (typeValue !== 'any') {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.type === typeValue;
      });
    }

    if (priceValue !== 'any') {
      filteredPins = filteredPins.filter(function (elem) {

        if (priceValue === 'low') {
          return elem.offer.price >= 0 && elem.offer.price < 10000;
        } else if (priceValue === 'middle') {
          return elem.offer.price >= 10000 && elem.offer.price < 50000;
        }
        return elem.offer.price >= 50000 && elem.offer.price < 1000000;
      });
    }


    if (roomValue !== 'any') {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.rooms === parseInt(roomValue, 10);
      });
    }

    if (guestValue !== 'any') {
      filteredPins = filteredPins.filter(function (elem) {
        return elem.offer.guests === parseInt(guestValue, 10);
      });
    }

    console.log(featureValue);
    if (featureChecked || !featureChecked) {
      filteredPins = filteredPins.filter(function (elem) {
        var ffffffff = false;
        if (elem.offer.features !== []) {

          ffffffff = featureValue.every(function (element) {

            return elem.offer.features.includes(element);
          });
        }
        console.log(ffffffff);
        return ffffffff;
      });
    }

    window.appendPin(filteredPins);
  };


  // Слушатель события отправки формы на сервер, восстанавливает исходное значение
  // document.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //   typeValue = 'any';
  //   window.updatePins();
  // });

})();
