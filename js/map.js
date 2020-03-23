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
    window.pin.create(pinsData);
  };

  var filterData = function () {
    var typeValue = housingType.value;
    var priceValue = housingPrice.value;
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuests.value;

    var priceToLevel = {
      '+50000': 'high',
      '+10000': 'middle',
      '+0': 'low'
    };

    var getPriceLevel = function (price) {
      for (var key in priceToLevel) {
        if (+key < price) {
          return priceToLevel[key];
        }
      }
      return null;
    };

    var checkedFeatures = Array
      .from(housingFeatures.querySelectorAll('input:checked'))
      .map(function (feature) {
        return feature.value;
      });

    var arrayEquals = function (firstArr, secondArr) {
      return firstArr.every(function (val) {
        return secondArr.includes(val);
      });
    };

    var data = pinsData.filter(function (card) {
      var isTypeMatched = typeValue === FILTER_DEFAULT ? true : card.offer.type === typeValue;
      var isRoomsMatched = roomsValue === FILTER_DEFAULT ? true : card.offer.rooms === +roomsValue;
      var isGuestsMatched = guestsValue === FILTER_DEFAULT ? true : card.offer.guests === +guestsValue;
      var isPricesMatched = priceValue === FILTER_DEFAULT ? true : getPriceLevel(card.offer.price) === priceValue;
      var isFeaturesMatched = arrayEquals(checkedFeatures, card.offer.features);
      return isTypeMatched && isRoomsMatched && isGuestsMatched && isPricesMatched && isFeaturesMatched;
    });
    return data;
  };

  var updateMapOnFilter = function () {
    window.card.delete();
    window.util.deletePins();
    window.pin.create(filterData());
  };

  var onFilterChange = window.util.debounce(updateMapOnFilter);
  mapFilters.addEventListener('change', onFilterChange);

  window.map = {
    mainBlock: map,
    addOnPinClick: addOnPinClick,
    mainPin: mainPin,
    filterCheckboxes: filterCheckboxes,
    filterSelects: filterSelects,
    onSuccessData: onSuccessData
  };
})();
