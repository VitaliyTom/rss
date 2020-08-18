import getWeather from '../weather_today/weatherToDay.js';
import { geolocation } from '../geolocation/map.js';
import { nameRegion } from '../geolocation/map.js';
import { translateCommonWords } from '../general/translateCommonWords.js';
import { getLanguage } from '../general/lng.js';
import getThreeWeather from '../three_day_weather/threeDayWeather.js';
import addElementWeather from '../weather_today/addElementWeather.js';
import addElementThreeWeather from '../three_day_weather/addElementThreeWeather.js';


// const client_id = 'YcOZjTnZyaoo2rVD0K3ZYSlVYGwpyJxwhqZMzc-R5to';
const client_id = 'e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
const controlBlock = document.querySelector('.control_block');
const backGroundBar = document.querySelector('.wrapper_progress_bar');
const spinner = document.querySelector('.spinner');
const degreeCelsiusBtn = document.querySelector('.degree_сelsius_btn');
const degreeFahrenheitBtn = document.querySelector('.degree_fahrenheit_btn');
const languageLiAll = document.querySelectorAll('.language li');
const searchInput = document.querySelector('.search_input');
const wrapperLanguage = document.querySelector('.wrapper_language');

// -------------------------  theme  -------------------------
const themeDay = document.querySelector('.theme_day_btn');
const themeNight = document.querySelector('.theme_night_btn');
const weatherToday = document.querySelector('.weather_today');
const weatherThreeDay = document.querySelector('.weather_three_day');
const wrapperMap = document.querySelector('.wrapper_map');
const body = document.querySelector('body');
const mapElement = document.getElementById('map');
const wrapperProgressBar = document.querySelector('.wrapper_progress_bar');
const containerButton = document.querySelector('.container_button');
const burgerSwitch = document.querySelector('.burger_switch');
const containerSearch = document.querySelector('.container_search');

backGroundBar.classList.add('active');
searchInput.classList.remove('active');
searchInput.setAttribute('placeholder', translateCommonWords.search[getLanguage()]);

if (!localStorage.hasOwnProperty('theme')) {
	localStorage.setItem('theme', 'dark');
}

if (localStorage.getItem('theme') === 'lite') {
	liteTheme();
} else {
	darkTheme();
}

if (!localStorage.hasOwnProperty('lang')) {
	localStorage.setItem('lang', 'Eng');
} else {
	document.querySelector('.lang_0').firstElementChild.innerText = localStorage.getItem('lang');
}

if (!localStorage.hasOwnProperty('degree')) {
	localStorage.setItem('degree', 'C');
	degreeCelsiusBtn.classList.add('active');
} else {
	localStorage.getItem('degree') === 'C'
		? degreeCelsiusBtn.classList.add('active')
		: degreeFahrenheitBtn.classList.add('active');
}

function getMonth(numberMonth) {
	const timeOfYear = '';
	if (numberMonth === 0 || numberMonth === 1 || numberMonth === 11) {
		timeOfYear = 'winter';
	} else if (numberMonth === 2 || numberMonth === 3 || numberMonth === 4) {
		timeOfYear = 'spring';
	} else if (numberMonth === 5 || numberMonth === 6 || numberMonth === 7) {
		timeOfYear = 'summer';
	} else if (numberMonth === 8 || numberMonth === 9 || numberMonth === 10) {
		timeOfYear = 'autumn';
	}
	return timeOfYear;
}

function url() {
	const numberMonth = new Date().toLocaleString('en', {
		month: 'numeric'
	});

	const url = `https://api.unsplash.com/photos/random?orientation=squarish&per_page=1&query=${getMonth(
		numberMonth
	)}&client_id=${client_id}`;
	return url;
}

function replaceImg() {
	const img = fetch(url())
		.then((response) => {
			if (response.status >= 400) {
				console.log(response.status);
				// throw new Error(`Response api return: ${response.status}`);
				return Promise.reject(new Error(response.statusText));
				// throw new Error(response.statusText, response.status);
			}
			return Promise.resolve(response.json());
		})
		.then((parsed) => {
			const urlimg = parsed.urls.regular;
			return urlimg;
		})
		.catch((error) => {
			console.log(`Превышен лимит запросов на фоновую картинку, обновите страницу позже : `);
			const backGround = document.querySelector('body');
			backGround.style.background = `url('./src/img/city_street.jpg')`;
			backGround.style.backgroundSize = 'cover';
			backGround.style.backgroundRepeat = 'no-repeat';
			backGround.style.transition = '1s';
			backGround.style.transitionDelay = '1s';
			spinner.classList.remove('active');
		});
	return img;
}

function deleteActiveLi() {
	languageLiAll.forEach((el) => {
		el.classList.remove('active');
	});
}

async function getCoordinates(city) {
	const response = await fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=c6b6da0f80f24b299e08ee1075f81aa5`
	);

	const parsed = await response.json();
	const arrCountry = [];
	parsed.results.forEach((el, index) => {
		if (el.components['ISO_3166-1_alpha-2'] === `${localStorage.getItem('country_code')}`) {
			arrCountry.push(index);
		}
	});

	try {
		const coordinates = {
			lat: parsed.results[arrCountry.length > 0 ? arrCountry[0] : 0].geometry.lat,
			lon: parsed.results[arrCountry.length > 0 ? arrCountry[0] : 0].geometry.lng
		};
		localStorage.setItem('lat', coordinates.lat);
		localStorage.setItem('lon', coordinates.lon);

		geolocation(coordinates);
	} catch (error) {
		searchInput.setAttribute('placeholder', translateCommonWords.error[getLanguage()]);
		searchInput.classList.add('active');
		console.log('Такого города не существует, попробуйте еще раз, и без ошибок :)');
	}
}

// -------------------------  Listener  -------------------------
body.addEventListener('click', (event) => {

	if(!event.target.closest('.wrapper_language')){
		deleteActiveLi();
	}

});

//		button select lang
wrapperLanguage.addEventListener('click', (event) => {

if (event.target.closest('.language')) {
	languageLiAll.forEach((el) => {
		el.classList.toggle('active');
	});
}

if (event.target.closest('.lang_1') || event.target.closest('.lang_2') || event.target.closest('.lang_3') || event.target.closest('.lang_4')) {
	document.querySelector('.lang_0').firstElementChild.innerText = event.target.innerText;
	localStorage.setItem('lang', event.target.innerText);
	const coordinates = {
		lat: localStorage.getItem('lat'),
		lon: localStorage.getItem('lon')
	};
	Promise.all([
		nameRegion(coordinates),
		getWeather(),
		getThreeWeather()
	]).then(([ region, weatherObj, weatherObjArray ]) => {
		addElementWeather(weatherObj, region);
		addElementThreeWeather(weatherObjArray);
	});

	deleteActiveLi();
	delete_burger_open();
	
} else if (
	!event.target.closest('.lang_1') &&
	!event.target.closest('.lang_2') &&
	!event.target.closest('.lang_3') &&
	!event.target.closest('.lang_4') &&
	!event.target.closest('.lang_0')
) {
	deleteActiveLi();
	delete_burger_open();

}
});

// -------------------------  Listener control block -------------------------

controlBlock.addEventListener('click', (event) => {

	//		replace background
	if (event.target.closest('.wrapper_refresh_img')) {
		delete_burger_open();
		spinner.classList.add('active');
		const coordinates = {
			lat: localStorage.getItem('lat'),
			lon: localStorage.getItem('lon')
		};

		geolocation(coordinates);
	}

	//		search button
	if (event.target.closest('.search_btn')) {
		const searchInput = document.querySelector('.search_input');
		const city = searchInput.value.toString();

		document.querySelector('.form_search').reset();
		searchInput.classList.remove('active');

		getCoordinates(city);
	}

	//		change degree
	if (event.target.closest('.wrapper_change_degree')) {
		degreeFahrenheitBtn.classList.remove('active');
		degreeCelsiusBtn.classList.remove('active');
		localStorage.setItem('degree', event.target.value);
		event.target.classList.add('active');
		const region = {
			country: localStorage.getItem('country'),
			city: localStorage.getItem('regionCity'),
			residential: localStorage.getItem('residential')
		};
		Promise.all([ getWeather(), getThreeWeather() ]).then(([ weatherObj, weatherObjArray ]) => {
			addElementWeather(weatherObj, region);
			addElementThreeWeather(weatherObjArray);
		});
	}	

	if (event.target.closest('.theme_day_btn')) {
		liteTheme();
	} else if (event.target.closest('.theme_night_btn')) {
		darkTheme();
	}

	if(event.target.closest('.burger_switch') || event.target === controlBlock){	
		containerButton.classList.toggle('open');
		controlBlock.classList.toggle('open');
		burgerSwitch.classList.toggle('open');
		containerSearch.classList.toggle('open');
		body.classList.toggle('open');		
	};
});

//		delete burger open

function delete_burger_open(){

containerButton.classList.remove('open');
controlBlock.classList.remove('open');
burgerSwitch.classList.remove('open');
containerSearch.classList.remove('open');
body.classList.remove('open');

}

function liteTheme() {
	localStorage.setItem('theme', 'lite');
	themeDay.classList.add('active');
	themeNight.classList.remove('active');
	controlBlock.classList.add('active');
	weatherToday.classList.add('active');
	weatherThreeDay.classList.add('active');
	wrapperMap.classList.add('active');
	body.classList.add('active');
	mapElement.classList.add('active');
	wrapperProgressBar.classList.add('white');

}

function darkTheme() {
	localStorage.setItem('theme', 'dark');
	themeNight.classList.add('active');
	themeDay.classList.remove('active');
	controlBlock.classList.remove('active');
	weatherToday.classList.remove('active');
	weatherThreeDay.classList.remove('active');
	wrapperMap.classList.remove('active');
	body.classList.remove('active');
	mapElement.classList.remove('active');
	wrapperProgressBar.classList.remove('white');
}

export default replaceImg;
