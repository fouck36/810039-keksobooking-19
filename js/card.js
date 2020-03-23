'use strict';
(function () {

  var cardTemplate = document.querySelector('#card')
      .content.querySelector('.map__card');

  var houseTypeToName = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var createCard = function (adsArray) {
    var card = cardTemplate.cloneNode(true);
    var popupTitle = card.querySelector('.popup__title');
    var popupAddress = card.querySelector('.popup__text--address');
    var popupPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupCapacity = card.querySelector('.popup__text--capacity');
    var popupTime = card.querySelector('.popup__text--time');
    var popupDescription = card.querySelector('.popup__description');
    var popupAvatar = card.querySelector('.popup__avatar');
    var popupPhotoNode = card.querySelector('.popup__photos');
    var popupPhotoElem = card.querySelector('.popup__photo');

    var createCardElement = function (arrayElem, domElem, method, text) {
      if (arrayElem && text) {
        domElem[method] = arrayElem + text;
      } else if (arrayElem && !text) {
        domElem[method] = arrayElem;
      } else {
        domElem.hidden = true;
      }
      return domElem;
    };

    var translateHouseType = function (arrayElem) {
      var type;
      for (var key in houseTypeToName) {
        if (arrayElem === key) {
          type = houseTypeToName[key];
        }
      }
      return type;
    };

    var getRoomGuestText = function (roomsElem, guestsElem) {
      if (roomsElem && guestsElem) {
        var RoomGuestText = roomsElem + ' комнаты для ' + guestsElem + ' гостей';
      } else if (roomsElem && !guestsElem) {
        RoomGuestText = roomsElem + ' комнаты';
      } else if (!roomsElem && guestsElem) {
        RoomGuestText = guestsElem + ' гостей';
      }
      return RoomGuestText;
    };

    var getTimeText = function (checkinElem, checkoutElem) {
      if (checkinElem && checkoutElem) {
        var timeText = 'Заезд после ' + checkinElem + ', ' + 'выезд до ' + checkoutElem;
      } else if (checkinElem && !checkoutElem) {
        timeText = 'Заезд после ' + checkinElem;
      } else if (!checkinElem && checkoutElem) {
        timeText = 'выезд до ' + checkoutElem;
      }
      return timeText;
    };

    var cardFeatures = card.querySelector('.popup__features');
    cardFeatures.innerHTML = '';

    adsArray.offer.features.forEach(function (feature) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + feature);

      cardFeatures.appendChild(listItem);
    });

    var createCardImages = function (imgArray, domNode, domElem) {
      if (imgArray) {
        imgArray.forEach(function (img) {
          var cardImg = domElem.cloneNode(true);
          cardImg.src = img;
          domNode.appendChild(cardImg);
        });
      } else {
        domNode.hidden = true;
      }
      domNode.removeChild(domElem);
    };

    createCardElement(adsArray.offer.title, popupTitle, 'textContent');
    createCardElement(adsArray.offer.address, popupAddress, 'textContent');
    createCardElement(adsArray.offer.price, popupPrice, 'textContent', '₽/ночь');
    createCardElement(translateHouseType(adsArray.offer.type), popupType, 'textContent');
    createCardElement(getRoomGuestText(adsArray.offer.rooms, adsArray.offer.guests), popupCapacity, 'textContent');
    createCardElement(getTimeText(adsArray.offer.checkin, adsArray.offer.checkout), popupTime, 'textContent');
    createCardElement(adsArray.offer.description, popupDescription, 'textContent');
    createCardElement(adsArray.author.avatar, popupAvatar, 'src');
    createCardImages(adsArray.offer.photos, popupPhotoNode, popupPhotoElem);

    return card;
  };
  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      deleteCard();
    }
  };
  var addClose = function () {
    var cardClose = document.querySelector('.popup__close');
    document.addEventListener('keydown', onCardEscPress);
    cardClose.addEventListener('click', deleteCard);
  };
  var deleteCard = function () {
    if (document.querySelector('.map__pin--active')) {
      var activePin = document.querySelector('.map__pin--active');
      var cardClose = document.querySelector('.popup__close');
      var card = document.querySelector('.popup');
      activePin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onCardEscPress);
      cardClose.removeEventListener('click', deleteCard);
      card.remove();
    }
  };

  window.card = {
    create: createCard,
    delete: deleteCard,
    onCardEscPress: onCardEscPress,
    addClose: addClose

  };
})();
