'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';

  var POST = 'POST';
  var GET = 'GET';

  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var DATA_NULL = null;

  window.backend = {

    // Функция отправки данных игрока на сервер
    save: function (data, onLoad, onError) {

      checkStatus(data, onLoad, onError, URL_POST, POST);
    },

    // Функция загрузки данных с сервера
    load: function (onLoad, onError) {

      checkStatus(DATA_NULL, onLoad, onError, URL_GET, GET);
    },

    // Функция обработки возможных ошибок при загрузке (отрисовка в DOM)
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
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
