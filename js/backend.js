'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;
  var METHOD_POST = 'POST';
  var METHOD_GET = 'GET';

  window.backend = {};

  var getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
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
    return xhr;
  };

  window.backend.load = function (onSuccess, onError) {
    var xhr = getData(onSuccess, onError);
    xhr.open(METHOD_GET, URL_DOWNLOAD);
    xhr.send();
  };

  window.backend.upload = function (data, onSuccess, onError) {
    var xhr = getData(onSuccess, onError);
    xhr.open(METHOD_POST, URL_UPLOAD);
    xhr.send(data);
    console.log(data);
  };
})();
