'use strict';

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

var getRandomElements= function (array, amount) {
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

var renderPinElement = function (element, advert) {
  var pinImageElement = element.querySelector('img');

  pinImageElement.alt = advert.offer.title;
  pinImageElement.src = advert.author.avatar;

  element.style.left = (advert.location.x + (MAP_PIN_WIDTH / 2)) + 'px';
  element.style.top = (advert.location.y - MAP_PIN_HEIGHT) + 'px';
};

var createPinElement = function (advert) {
  var template = document.querySelector('#pin')
    .content
    .querySelector('.map__pin')
    .cloneNode(true);

  renderPinElement(template, advert);

  return template;
};

var renderAdvertFeatures = function (element, advert) {
  var featuresElement = element.querySelector('.popup__features');
  var featuresContent = '';
  advert.offer.features.forEach(function (feature) {
    featuresContent += '<li class="popup__feature popup__feature--' + feature + '"></li>';
  });
  featuresElement.innerHTML = featuresContent;
};


var renderAdvertPhotos = function (element, advert) {
  var photosElement = element.querySelector('.popup__photos');
  var photosContent = '';
  advert.offer.photos.forEach(function (photo) {
    photosContent += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="' + advert.offer.title + '"></li>';
  });
  photosElement.innerHTML = photosContent;
};

var renderPinDescriptionElement = function (element, advert) {
  element.querySelector('.popup__avatar').src = advert.author.avatar;
  element.querySelector('.popup__title').textContent = advert.offer.title;
  element.querySelector('.popup__text--address').textContent = advert.offer.address;
  element.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = DESCRIPTION_TYPES_OF_OFFER[advert.offer.type];
  element.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  element.querySelector('.popup__description ').textContent = advert.offer.description;

  renderAdvertFeatures(element, advert);
  renderAdvertPhotos(element, advert);
};

var createPinDescriptionElement = function (advert) {
  var template = document.querySelector('#card')
    .content
    .querySelector('article')
    .cloneNode(true);

  renderPinDescriptionElement(template, advert);

  return template;
};

var mapContainer = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map .map__filters-container');

var mapWidth = mapContainer.clientWidth;

var mapPinsContainer = document.querySelector('.map .map__pins');

mapContainer.classList.remove('map--faded');

var fragmentPins = document.createDocumentFragment();
var fragmentDescriptions = document.createDocumentFragment();

for (var i = 0; i < AUTORS_OF_OFFER; i++) {
  var advert = generateRandomAdvert(mapWidth);

  fragmentPins.appendChild(createPinElement(advert));

  fragmentDescriptions.appendChild(createPinDescriptionElement(advert));
}

mapPinsContainer.appendChild(fragmentPins);
mapFiltersContainer.before(fragmentDescriptions);
