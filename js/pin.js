'use strict';
(function () {
  var PINS_LIMIT = 5;
  var PIN_WIDTH = 40;
  var MAX_TOP = 130;
  var MAX_BOTTOM = 620;
  var MAX_RIGHT = 1160;
  var MAX_LEFT = -30;
  var MOVE_FROM_MAX = 10;
  var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var createPin = function (arr) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style = 'left:' + (arr.location.x - PIN_WIDTH) + 'px; top:' + arr.location.y + 'px;';
    var pinImg = mapPin.querySelector('img');
    pinImg.src = arr.author.avatar;
    pinImg.alt = arr.offer.title;
    window.map.addOnPinClick(mapPin, arr);
    return mapPin;
  };

  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > PINS_LIMIT ? PINS_LIMIT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      if (!data[i].offer) {
        takeNumber++;
        continue;
      }
      fragment.appendChild(createPin(data[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.mainPin.style.zIndex = 10;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';

      if (window.map.mainPin.offsetTop < MAX_TOP) {
        window.map.mainPin.style.top = MAX_TOP + MOVE_FROM_MAX + 'px';
      }
      if (window.map.mainPin.offsetTop > MAX_BOTTOM) {
        window.map.mainPin.style.top = MAX_BOTTOM - MOVE_FROM_MAX + 'px';
      }
      if (window.map.mainPin.offsetLeft > MAX_RIGHT) {
        window.map.mainPin.style.left = MAX_RIGHT - MOVE_FROM_MAX + 'px';
      }
      if (window.map.mainPin.offsetLeft < MAX_LEFT) {
        window.map.mainPin.style.left = MAX_LEFT + MOVE_FROM_MAX + 'px';
      }

      window.form.addressInputFill(window.map.mainPin.style.left, window.map.mainPin.style.top);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.mainPin.style.zIndex = 0;
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    create: createPins
  };
})();
