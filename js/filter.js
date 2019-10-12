'use strict';

(function () {
  var houseFilter = window.util.mapFilter.querySelector('#housing-type');

  // Обработчик на форму фильтрации

  var typeValue = houseFilter.value; // Исходное значение поля 'any'
  houseFilter.addEventListener('change', function (evt) {
    typeValue = evt.target.value; // Новое выбранное значение
    window.updatePins();
  });


  // Слушатель события отправки формы на сервер, восстанавливает исходное значение
  document.addEventListener('submit', function (evt) {
    evt.preventDefault();
    typeValue = 'any';
    window.updatePins();
  });


  var filteredPins;
  // Функция фильтрации объявления

  window.updatePins = function () {
    if (typeValue === 'any') {
      filteredPins = window.ads.slice().filter(function (elem) {
        return elem.offer.type !== typeValue;
      });
    } else {
      filteredPins = window.ads.slice().filter(function (elem) {
        return elem.offer.type === typeValue;
      });
    }

    window.appendPin(filteredPins);
  };

})();
