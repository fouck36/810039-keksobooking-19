'use strict';
(function () {
  var RIGHT_BUTTON = 0;
  var addressInput = document.querySelector('#address');

  var enablePage = function (data) {
    window.map.onSuccessData(data);
    window.map.mainBlock.classList.remove('map--faded');

    window.avatar.makePreviewer(window.avatar.bookingChooser, window.avatar.makeNewImg());
    window.form.ad.classList.remove('ad-form--disabled');
    window.util.enableElem(window.disablePage.disableElements);
    window.form.addressInputFill(window.map.mainPin.style.left, window.map.mainPin.style.top);
    addressInput.readOnly = true;
  };

  var onBigPinClick = function (evt) {
    if (evt.button === RIGHT_BUTTON || evt.key === 'Enter') {
      window.backend.load(enablePage, window.onError);
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
