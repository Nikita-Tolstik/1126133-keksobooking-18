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
})();
