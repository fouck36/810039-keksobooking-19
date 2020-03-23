'use strict';
(function () {
  var KEY_ENTER = 'Enter';
  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var filterCheckboxes = mapFilters.querySelectorAll('.map__checkbox');
  var filterSelects = mapFilters.querySelectorAll('.map__filter');
  var pinsData = [];

  var addOnPinClick = function (pin, adElem) {
    var openPin = function () {
      window.card.delete();
      document.removeEventListener('keydown', window.card.onCardEscPress);
      map.insertBefore(window.card.create(adElem), filtersContainer);
      pin.classList.add('map__pin--active');
      window.card.addClose();
    };
    var onPinEnterOpen = function (evt) {
      if (evt.key === KEY_ENTER) {
        openPin();
      }
    };
    pin.addEventListener('keydown', onPinEnterOpen);
    pin.addEventListener('click', openPin);
  };

  var onSuccessData = function () {
    pinsData = window.data.generateAdverts();
    window.pin.create(pinsData);
  };

  window.map = {
    mainBlock: map,
    addOnPinClick: addOnPinClick,
    mainPin: mainPin,
    filterCheckboxes: filterCheckboxes,
    filterSelects: filterSelects,
    onSuccessData: onSuccessData
  };
})();
