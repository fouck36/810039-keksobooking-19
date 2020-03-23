'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getNumberWithZero = function (number) {
    return '0' + number;
  };

  var getRandomArray = function (arr, newArr) {
    for (var i = 0; i < getRandomInt(1, arr.length); i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  };

  var disableElem = function (elemArr) {
    elemArr.forEach(function (item) {
      item.disabled = true;
    });
  };

  var enableElem = function (elemArr) {
    elemArr.forEach(function (item) {
      item.disabled = false;
    });
  };


  var deleteClassHidden = function (elemArr) {
    elemArr.forEach(function (item) {
      item.classList.remove('hidden');
    });
  };

  var deletePins = function () {
    var pinCollection = document.querySelectorAll('.map__pin--main ~ .map__pin');
    pinCollection.forEach(function (item) {
      item.remove();
    });
  };


  var defaultSelect = function (elemArr, num, one) {
    if (!one) {
      elemArr.forEach(function (item) {
        item.options[num].selected = true;
      });
    } else {
      elemArr.options[num].selected = true;
    }
  };


  var defaultCheckbox = function (elemArr) {
    elemArr.forEach(function (item) {
      item.checked = false;
    });
  };

  var clearInput = function (elemArr) {
    elemArr.forEach(function (item) {
      item.value = '';
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.util = {
    getRandomInt: getRandomInt,
    getNumberWithZero: getNumberWithZero,
    getRandomArray: getRandomArray,
    disableElem: disableElem,
    enableElem: enableElem,
    deleteClassHidden: deleteClassHidden,
    deletePins: deletePins,
    defaultSelect: defaultSelect,
    defaultCheckbox: defaultCheckbox,
    clearInput: clearInput,
    debounce: debounce
  };
})();
