'use strict';
(function () {
  var FILTER_DEFAULT = 'any';
  var KEY_ENTER = 'Enter';
  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var filterCheckboxes = mapFilters.querySelectorAll('.map__checkbox');
  var filterSelects = mapFilters.querySelectorAll('.map__filter');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
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

  var onSuccessData = function (data) {
    pinsData = data.slice();
    console.log(pinsData);
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
