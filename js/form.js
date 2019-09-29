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

    var selectedRoom = evt.target.value;
    var guests = roomsCapacityMap[selectedRoom];
    var guestsOption = document.querySelectorAll('#capacity option');

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
})();
