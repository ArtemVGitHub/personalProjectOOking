//Получение случайного числа в диапазоне включая мин и макс
var getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Получение массива чисел
var getIntArray = function (quantity) {
	var intArray = [];
	for (var i = 0; i < quantity; i++) {
		intArray[i] = i + 1;
	}
	return intArray;
};
// Получение массива случайной длины из масива
var getRandomLengthArray = function (arr) {
	var newArr = [];
	var newArrLength = getRandomInt(1, arr.length);

	for (var i = 0; i < newArrLength; i++) {
		newArr[i] = arr[i];
	}
	return newArr;
};

var ADS_QUANTITY = 8;
var AVATARS = getIntArray(ADS_QUANTITY);
var OFFER_TITLES = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var OFFER_ADDRESSES = [];
var OFFER_CHECKIN_TIMES = ["12:00", "13:00", "14:00"];
var OFFER_CHECKOUT_TIMES = ["12:00", "13:00", "14:00"];
var OFFER_TYPES = ["palace", "flat", "house", "bungalo"];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var mapBlock = document.querySelector('.map');
var mapWidht = mapBlock.offsetWidth;
var PIN_MARKER_WIDTH = 10;
var PIN_MARKER_HEIGHT = 18;

var getOfferAddress = function (array, location) {
	return location.x + ", " + location.y;
};

// Массив похожих объявлений неподалёку
var simpleAds = [];

for (var i = 0; i < ADS_QUANTITY; i++) {
	simpleAds[i] = {
		"author": {
			"avatar": "img/avatars/user0" + AVATARS[i] + ".png",
		},
		"offer": {
			"title": OFFER_TITLES[getRandomInt(0, OFFER_TITLES.length)],
			"address": "",
			"price": getRandomInt(1000, 1000000),
			"type": OFFER_TYPES[getRandomInt(0, 3)],
			"rooms": getRandomInt(1, 5),
			"guests": getRandomInt(1, 10),
			"checkin": OFFER_CHECKIN_TIMES[getRandomInt(0, 2)],
			"checkout": OFFER_CHECKOUT_TIMES[getRandomInt(0, 2)],
			"features": getRandomLengthArray(OFFER_FEATURES),
			"description": "",
			"photos": OFFER_PHOTOS
		},
		"location": {
			"«x»": getRandomInt(0, mapWidht),
			"«y»": getRandomInt(130, 630)
		}
	};
	simpleAds[i].offer.address = simpleAds[i].location["«x»"] + ', ' + simpleAds[i].location["«y»"];
}

mapBlock.classList.remove('map--faded');

var getPinCoords = function (coords) {
	var mapPin = document.querySelector('.map__pin');
	var pinCoordX = (mapPin.offsetWidth + PIN_MARKER_WIDTH) / 2 + coords.location["«x»"];
	var pinCoordY = mapPin.offsetHeight + PIN_MARKER_HEIGHT + coords.location["«y»"];
	var pinCoords = [pinCoordX, pinCoordY];
	return pinCoords;
};

var mapPinTemplete = document.querySelector('template').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');

var createMapPin = function (mapPin) {
	var mapPinElement = mapPinTemplete.cloneNode(true);
	var mapPinCoordX = getPinCoords(simpleAds[i])[0];
	var mapPinCoordY = getPinCoords(simpleAds[i])[1];

	mapPinElement.style = "left: " + mapPinCoordX + "px; top: " + mapPinCoordY + "px;";
	mapPinElement.querySelector('img').src = simpleAds[i].author.avatar;
	mapPinElement.querySelector('img').alt = simpleAds[i].offer.title;

	return mapPinElement;
};

var pinFragment = document.createDocumentFragment();

for (var i = 0; i < simpleAds.length; i++) {
	pinFragment.appendChild(createMapPin(simpleAds[i]));
}

mapPinsContainer.appendChild(pinFragment);

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapFiltersConatainer = document.querySelector('.map__filters-container');

var createMapOffer = function (mapCard) {
	var mapOfferElement = mapCardTemplate.cloneNode(true);

	mapOfferElement.querySelector('h3').textContent = simpleAds[0].offer.title;
	mapOfferElement.querySelector('p small').textContent = simpleAds[0].offer.address;
	mapOfferElement.querySelector('.popup__price').textContent = simpleAds[0].offer.price + "₽/ночь";
	mapOfferElement.querySelector('h4').textContent = simpleAds[0].offer.type;
	mapOfferElement.querySelector('.popup__text--capacity').textContent = simpleAds[0].offer.rooms + " комнаты для " + simpleAds[0].offer.guests + " гостей.";
	mapOfferElement.querySelector('.popup__text--time').textContent = "Заезд после " + simpleAds[0].offer.checkin + ", выезд до " + simpleAds[0].offer.checkout;
	// mapOfferElement.querySelector('.popup__features').textContent = simpleAds[0].offer.features;
	mapOfferElement.querySelector('.popup__description').textContent = simpleAds[0].offer.description;
	mapOfferElement.querySelector('.popup__pictures li img').src = simpleAds[0].offer.photos[0];
	mapOfferElement.querySelector('.popup__avatar').src = simpleAds[0].author.avatar;

	return mapOfferElement;
};

var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(createMapOffer(simpleAds[0]))
mapFiltersConatainer.appendChild(cardFragment);