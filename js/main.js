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

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var PIN_BIG_SIZE = 156;
var PIN_SMALL_SIZE = 65;
var BUNGALO_PRICE = 0;
var FLAT_PRICE = 1000;
var HOUSE_PRICE = 5000;
var PALACE_PRICE = 10000;

var mapContainer = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map .map__filters-container');

var mapWidth = mapContainer.clientWidth;

var mapPinsContainer = document.querySelector('.map .map__pins');

var mainPin = mapContainer.querySelector('.map__pin--main');

var mapFilters = mapContainer.querySelectorAll('.map__filter');

var adForm = document.querySelector('.ad-form');

var AdFormElements = document.querySelectorAll('.ad-form__element');

var AdFormHeader = document.querySelectorAll('.ad-form-header');

var pinAddressField = document.querySelector('#address');

var pin = document.querySelectorAll('map__pin');

var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');

var roomNumberSelect = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
var priceInput = document.querySelector('#price');
var houseType = document.querySelector('#type');

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

var setDisabled = function (array, isDisabled) {
  for (var i = 0; i < array.length; i++) {
    if (isDisabled) {
      array[i].setAttribute('disabled', '');
    } else {
      array[i].removeAttribute('disabled', '');
    }
  }

  return array;
};

var onActivatePage = function () {
  mapContainer.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setDisabled(mapFilters, false);
  setDisabled(AdFormElements, false);
  setDisabled(AdFormHeader, false);
  mapPinsContainer.appendChild(fragmentPins);
  setPinAddressValue(MAP_PIN_WIDTH, MAP_PIN_HEIGHT);
};

var setPinAddressValue = function (width, height) {
  var topMainPin = parseInt(mainPin.style.top, 10) + height;
  var leftMainPin = parseInt(mainPin.style.left, 10) + width;

  pinAddressField.value = leftMainPin + ', ' + topMainPin;
};

var timeIn = function () {
  timeout.value = timein.value;
};
var timeOut = function () {
  timein.value = timeout.value;
};

var setPriceDefault = function () {
  priceInput.placeholder = FLAT_PRICE;
  priceInput.min = FLAT_PRICE;
};
setPriceDefault();

var houseTypeToPrice = {
  bungalo: BUNGALO_PRICE,
  flat: FLAT_PRICE,
  house: HOUSE_PRICE,
  palace: PALACE_PRICE
};

var houseTypeChange = function () {
  priceInput.placeholder = houseTypeToPrice[houseType.value];
  priceInput.min = houseTypeToPrice[houseType.value];
};
houseType.addEventListener('change', houseTypeChange);

var roomsNumbers = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  ONE_HUNDRED: '100'
};
var capacitySelected = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  NONE: '0'
};
var capacityOption = {
  THREE: capacityOptions[0],
  TWO: capacityOptions[1],
  ONE: capacityOptions[2],
  NONE: capacityOptions[3]
};

var roomChange = function () {
  switch (roomNumberSelect.value) {
    case roomsNumbers.ONE:
      capacity.value = capacitySelected.ONE;
      capacityOption.THREE.disabled = true;
      capacityOption.TWO.disabled = true;
      capacityOption.ONE.disabled = false;
      capacityOption.NONE.disabled = true;
      break;
    case roomsNumbers.TWO:
      capacity.value = capacitySelected.TWO;
      capacityOption.THREE.disabled = true;
      capacityOption.TWO.disabled = false;
      capacityOption.ONE.disabled = false;
      capacityOption.NONE.disabled = true;
      break;
    case roomsNumbers.THREE:
      capacity.value = capacitySelected.THREE;
      capacityOption.THREE.disabled = false;
      capacityOption.TWO.disabled = false;
      capacityOption.ONE.disabled = false;
      capacityOption.NONE.disabled = true;
      break;
    case roomsNumbers.ONE_HUNDRED:
      capacity.value = capacitySelected.NONE;
      capacityOption.THREE.disabled = true;
      capacityOption.TWO.disabled = true;
      capacityOption.ONE.disabled = true;
      capacityOption.NONE.disabled = false;
      break;
    default:
      capacityOption.THREE.disabled = false;
      capacityOption.TWO.disabled = false;
      capacityOption.ONE.disabled = false;
      capacityOption.NONE.disabled = true;
  }
};

roomNumberSelect.addEventListener('change', roomChange);


//mapContainer.classList.remove('map--faded');

var fragmentPins = document.createDocumentFragment();
var fragmentDescriptions = document.createDocumentFragment();

for (var i = 0; i < AUTORS_OF_OFFER; i++) {
  var advert = generateRandomAdvert(mapWidth);

  fragmentPins.appendChild(createPinElement(advert));

  fragmentDescriptions.appendChild(createPinDescriptionElement(advert));
}

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  if (mapContainer.classList.contains('map--faded')) {
    onActivatePage();
  }

});

mainPin.addEventListener('keydown', function (evt) {
  evt.preventDefault();

  if (mapContainer.classList.contains('map--faded') && evt.key === ENTER_KEY) {
    onActivatePage();
  }

});

timein.addEventListener('change', timeIn);
timeout.addEventListener('change', timeOut);

//mapPinsContainer.addEventListener('click', function () {


//var pinImage = pin.querySelectorAll('img')
//mapPinsContainer.appendChild(fragmentPins);
//mapFiltersContainer.before(fragmentDescriptions);

//Блокировка поля формы
setDisabled(mapFilters, true);
setDisabled(AdFormElements, true);
setDisabled(AdFormHeader, true);
