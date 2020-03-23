'use strict';
(function () {

  var TYPES_OF_OFFER = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var DESCRIPTION_TYPES_OF_OFFER = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var QUANTITY_OF_ROOMS = [1, 2, 3, 100];

  var CHECKIN_TIME = ['12:00', '13:00', '4:00'];

  var FEATURES_OF_OFFER = ['wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var AUTORS_OF_OFFER = 8;

  var MAP_LOCATION_Y_MIN = 130;

  var MAP_LOCATION_Y_MAX = 630;

  var MAP_PIN_WIDTH = 50;

  var MAP_PIN_HEIGHT = 70;

  var adverts = [];

  var mapContainer = document.querySelector('.map');
  var mapWidth = 1300;

  var getRandomNumber = function (min, max) {
    min = min ? min : 0;

    return Math.floor(Math.random() * Math.floor(max - min)) + min;
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  var shuffleArray = function (array) {
    return array.slice(0).sort(function () {
      return Math.random() - 0.5;
    });
  };

  var getRandomElements = function (array, amount) {
    return shuffleArray(array).slice(0, amount);
  };


  var generateRandomAdvert = function (maxLocationX) {
    var locationX = getRandomNumber(maxLocationX - 2 * MAP_PIN_WIDTH, MAP_PIN_WIDTH);
    var locationY = getRandomNumber(MAP_LOCATION_Y_MAX, MAP_LOCATION_Y_MIN);

    var avatarNumber = getRandomNumber(8, 1);

    return {
      'author': {
        'avatar': 'img/avatars/user0' + avatarNumber + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(5000, 1000),
        'type': getRandomElement(TYPES_OF_OFFER),
        'rooms': getRandomElement(QUANTITY_OF_ROOMS),
        'guests': getRandomNumber(8, 1),
        'checkin': getRandomElement(CHECKIN_TIME),
        'checkout': getRandomElement(CHECKIN_TIME),
        'features': getRandomElements(FEATURES_OF_OFFER, getRandomNumber(FEATURES_OF_OFFER.length, 1)),
        'description': 'строка с описанием',
        'photos': getRandomElements(OFFER_PHOTOS, getRandomNumber(OFFER_PHOTOS.length, 1)),
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };

  var generateAdverts = function () {
    var ad = [];
    for (var i = 0; i < AUTORS_OF_OFFER; i++) {
      var advert = generateRandomAdvert(mapWidth);

      var pushed = ad.push(advert);

    };
    console.log(ad);
    return ad;
  };

  window.data = {
    generateAdverts: generateAdverts,
    adverts: adverts
  };
})();
