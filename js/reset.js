'use strict';
(function () {

  var resetButton = document.querySelector('.ad-form__reset');
  var onButtonReset = function (evt) {
    evt.preventDefault();
    window.disablePage.on();
  };

  resetButton.addEventListener('click', onButtonReset);
})();
