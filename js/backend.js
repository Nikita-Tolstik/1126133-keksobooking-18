'use strict';

(function () {

  var URL_REQUEST = 'https://js.dump.academy/keksobooking/data';
  var DATA_REQUEST = 'GET';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var POST_REQUEST = 'POST';
  var TIMEOUT = 1000000;
  var STATUS_OK = 200;
  var DATA_NULL = null;

  window.backend = {
    // Функция отправки данных на сервер
    post: function (data, onLoad, onError) {

      postRequest(data, onLoad, onError, URL_POST, POST_REQUEST);
    },

    // Функция загрузки данных с сервера
    load: function (onLoad, onError) {

      postRequest(DATA_NULL, onLoad, onError, URL_REQUEST, DATA_REQUEST);
    },

    // Функция отображения ошибок при загрузке данных, тайм-ауты (отрисовка элемента error в DOM)
    onErrorLoad: function (errorMessage) {
      var templateError = document.querySelector('#error').content.querySelector('.error');
      var errorPopup = templateError.cloneNode(true);
      var closeError = errorPopup.querySelector('.error__button');

      errorPopup.querySelector('.error__message').textContent = errorMessage;
      window.util.main.insertAdjacentElement('beforeend', errorPopup);


      var onErrorEscPress = function (evtEsc) {
        isEscPress(evtEsc, onClosePopupError);
      };

      var onErrorClick = function (evtClick) {
        isClick(evtClick, onClosePopupError);
      };

      var onClosePopupError = function () {
        errorPopup.remove();

        document.removeEventListener('keydown', onErrorEscPress);
        closeError.removeEventListener('click', onErrorClick);
        window.removeEventListener('click', onErrorClick);
      };

      document.addEventListener('keydown', onErrorEscPress);
      closeError.addEventListener('click', onErrorClick);
      window.addEventListener('click', onErrorClick);
    },


    // Функция отображения успешного результата при отправке данных формы
    showSuccess: function () {
      var templateSuccess = document.querySelector('#success').content.querySelector('.success');
      var successPopup = templateSuccess.cloneNode(true);
      window.util.main.insertAdjacentElement('beforeend', successPopup);


      var onSuccessEscPress = function (evtEsc) {
        isEscPress(evtEsc, onClosePopupSuccess);
      };

      var onSuccessClick = function (evtClick) {
        isClick(evtClick, onClosePopupSuccess);
      };

      var onClosePopupSuccess = function () {
        successPopup.remove();

        document.removeEventListener('keydown', onSuccessEscPress);
        window.removeEventListener('click', onSuccessClick);
      };

      document.addEventListener('keydown', onSuccessEscPress);
      window.addEventListener('click', onSuccessClick);
    }


  };

  // Функция отправки запросов на сервер
  var postRequest = function (data, onLoad, onError, url, method) {
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

  var isEscPress = function (evtEsc, onClosePopup) {
    if (evtEsc.keyCode === window.util.ESC_KEYCODE) {
      onClosePopup();
    }
  };

  var isClick = function (evtClick, onClosePopup) {
    evtClick.preventDefault();
    onClosePopup();
  };

})();
