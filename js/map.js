//Получение случайного числа в диапазоне включая мин и макс

var getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Получение массива уникальных чисел в диапазоне

var getUniqIntArray = function (quantity) {
	var intArray = [];
	for (var i = 0; i < quantity; i++) {
		var currentInt = getRandomInt(1, quantity);
		if (currentInt != intArray[i - 1]) {
			intArray[i] = currentInt;
		} else {

		}
	}
};

// Массив похожих объявлений неподалёку

var simpleAds = [
	{
		"author": {
			"avatar": "img/avatars/user{{xx}}.png",
		},
		"offer": {
			"title": "Маленькая неуютная квартира",
			"address": "{{location.x}}, {{location.y}}",
			"price": "1000 - 1 000 000",
			"type": "palace",
			"rooms": "0",
			"guests": "0",
			"checkin": "",
			"checkout": "",
			"features": [],
			"description": "",
			"photos": []
		},
		"location": {
			"«x»": "случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка",
			"«y»": "случайное число, координата y метки на карте от 130 до 630"
		}
	}
];