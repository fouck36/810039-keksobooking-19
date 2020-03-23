'use strict';
(function () {
  var RIGHT_BUTTON = 0;
  var addressInput = document.querySelector('#address');

  var enablePage = function () {

    window.map.onSuccessData();
    window.map.mainBlock.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.util.enableElem(window.disablePage.disableElements);
    window.form.addressInputFill(window.map.mainPin.style.left, window.map.mainPin.style.top);
    addressInput.readOnly = true;
  };

  var onBigPinClick = function (evt) {
    if (evt.button === RIGHT_BUTTON || evt.key === 'Enter') {
      enablePage();
      window.map.mainPin.removeEventListener('mousedown', onBigPinClick);
      window.map.mainPin.removeEventListener('keydown', onBigPinClick);
    }
  };

  window.map.mainPin.addEventListener('mousedown', onBigPinClick);
  window.map.mainPin.addEventListener('keydown', onBigPinClick);

  window.activatepage = {
    onBigPinClick: onBigPinClick,
  };
})();
