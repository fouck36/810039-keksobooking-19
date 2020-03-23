'use strict';
(function () {
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;
  var disableElements = document.querySelectorAll('input, select, textarea, .ad-form__submit, .ad-form__reset');
  var inputsForReset = [window.form.timeout, window.form.timein, window.form.roomNumberSelect];
  var fieldsForClear = [window.form.priceInput, window.form.title, window.form.description];
  var disable = function () {
    window.util.disableElem(disableElements);
    if (!document.querySelector('.map--faded')) {
      window.card.delete();
      window.map.mainBlock.classList.add('map--faded');
      window.map.mainPin.style = 'left: ' + MAIN_PIN_LEFT + 'px; top: ' + MAIN_PIN_TOP + 'px;';
      window.map.mainPin.addEventListener('mousedown', window.activatepage.onBigPinClick);
      window.map.mainPin.addEventListener('keydown', window.activatepage.onBigPinClick);
      window.util.deletePins();
      window.form.ad.classList.add('ad-form--disabled');
      window.form.addressInputFill(window.map.mainPin.style.left, window.map.mainPin.style.top);
      window.util.defaultSelect(window.map.filterSelects, 0);
      window.util.defaultCheckbox(window.map.filterCheckboxes);
      window.util.clearInput(fieldsForClear);
      window.util.defaultCheckbox(window.form.featureCheckboxes);
      window.util.defaultSelect(inputsForReset, 0);
      window.form.setDefaultCapacity();
      window.util.defaultSelect(window.form.houseType, 1, 'one');
      window.form.setPriceDefault();
      window.form.resetPreview(window.avatar.previews);
    }
  };
  disable();
  window.disablePage = {
    disableElements: disableElements,
    on: disable
  };
})();
