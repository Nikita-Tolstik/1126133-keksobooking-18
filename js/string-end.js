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
  var getStringEndOne = function (number) {
    var element = String(number);
    var lastNumber = Number(element[element.length - Numeral.ONE]);

    return lastNumber;
  };

  // Функция для определения двух последних цифр комнат/гостей
  var getStringEndTwo = function (number) {
    var element = String(number);
    var lastNumber = Number(element[element.length - Numeral.TWO] + element[element.length - Numeral.ONE]);

    return lastNumber;
  };


  // Определение окончания строки
  window.getStringEnd = function (numberRoom, numberGuest) {
    var guestStringEnd = 'ей';
    if (getStringEndOne(numberGuest) === Numeral.ONE) {
      guestStringEnd = 'я';
    }

    var roomStringEnd = '';
    if (getStringEndOne(numberRoom) === Numeral.ONE) {
      roomStringEnd = 'а';
    } else if (getStringEndTwo(numberRoom) >= Numeral.TWELVE && getStringEndTwo(numberRoom) <= Numeral.FOURTEEN) {
      roomStringEnd = '';
    } else if (getStringEndOne(numberRoom) >= Numeral.TWO && getStringEndOne(numberRoom) <= Numeral.FOUR) {
      roomStringEnd = 'ы';
    }

    return numberRoom + ' комнат' + roomStringEnd + ' для ' + numberGuest + ' гост' + guestStringEnd;
  };

})();
