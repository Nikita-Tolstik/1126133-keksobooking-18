'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var GET = 'GET';

  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var DATA_NULL = null;


  window.backend = {

    // Функция загрузки данных с сервера
    load: function (onLoad, onError) {

      checkStatus(DATA_NULL, onLoad, onError, URL_GET, GET);
    },

    // Функция обработки возможных ошибок при загрузке (отрисовка в DOM)
    errorHandler: function (errorMessage) {
      var templateError = document.querySelector('#error').content.querySelector('.error');
      var errorElement = templateError.cloneNode(true);
      var main = document.querySelector('main');

      errorElement.querySelector('.error__message').textContent = errorMessage;

      main.insertAdjacentElement('beforeend', errorElement);

      var closeError = errorElement.querySelector('.error__button');


      var onErrorEscPress = function (evtEsc) {
        if (evtEsc.keyCode === window.util.ESC_KEYCODE) {
          closePopupError();
        }
      };

      var onErrorClick = function (evtClick) {
        evtClick.preventDefault();
        closePopupError();
      };

      var closePopupError = function () {
        errorElement.remove();
        document.removeEventListener('keydown', onErrorEscPress);
        closeError.removeEventListener('click', onErrorClick);
        window.removeEventListener('click', onErrorClick);
      };

      document.addEventListener('keydown', onErrorEscPress);

      closeError.addEventListener('click', onErrorClick);

      window.addEventListener('click', onErrorClick);
    }

  };

  // Функция отправки данных и проверки запросов на ошибки
  var checkStatus = function (data, onLoad, onError, url, method) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

})();
