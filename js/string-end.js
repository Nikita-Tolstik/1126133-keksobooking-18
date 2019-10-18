'use strict';

(function () {

  var Numeral = {
    'ONE': 1,
    'TWO': 2,
    'FOUR': 4,
    'TWELVE': 12,
    'FOURTEEN': 14
  };

  // Функция для определения одной последней цифры комнат/гостей
  var getStringNumberOne = function (number) {
    var element = String(number);
    var lastNumber = Number(element[element.length - Numeral.ONE]);

    return lastNumber;
  };

  // Функция для определения двух последних цифр комнат/гостей
  var getStringNumberTwo = function (number) {
    var element = String(number);
    var lastNumber = Number(element[element.length - Numeral.TWO] + element[element.length - Numeral.ONE]);

    return lastNumber;
  };


  // Определение окончания строки
  window.getStringEnd = function (numberRoom, numberGuest) {
    var guestStringEnd = 'ей';
    if (getStringNumberOne(numberGuest) === Numeral.ONE) {
      guestStringEnd = 'я';
    }

    var roomStringEnd = '';
    if (getStringNumberOne(numberRoom) === Numeral.ONE) {
      roomStringEnd = 'а';
    } else if (getStringNumberTwo(numberRoom) >= Numeral.TWELVE && getStringNumberTwo(numberRoom) <= Numeral.FOURTEEN) {
      roomStringEnd = '';
    } else if (getStringNumberOne(numberRoom) >= Numeral.TWO && getStringNumberOne(numberRoom) <= Numeral.FOUR) {
      roomStringEnd = 'ы';
    }

    return numberRoom + ' комнат' + roomStringEnd + ' для ' + numberGuest + ' гост' + guestStringEnd;
  };

})();
