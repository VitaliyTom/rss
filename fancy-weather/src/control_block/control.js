import getWeather from '../weather_today/weatherToDay.js';
import { geolocation } from '../geolocation/map.js';
import { map } from '../geolocation/map.js';
import { nameRegion } from '../geolocation/map.js';
import { translateCommonWords } from '../general/translateCommonWords.js';
import { getLanguage } from '../general/lng.js';

const controlBlock = document.querySelector('.control_block');
const client_id = 'YcOZjTnZyaoo2rVD0K3ZYSlVYGwpyJxwhqZMzc-R5to';
const spinner = document.querySelector('.spinner');
const degreeCelsiusBtn = document.querySelector('.degree_сelsius_btn');
const degreeFahrenheitBtn = document.querySelector('.degree_fahrenheit_btn');
const languageLiAll = document.querySelectorAll('.language li');
const searchInput = document.querySelector('.search_input');

localStorage.setItem('lang', 'Eng');

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

async function replaceImg() {
	try {
		const response = await fetch(url());
		const parsed = await response.json();

		const img = parsed.urls.regular;
		const backGround = document.querySelector('body');
		backGround.style.backgroundImage = `url(${img})`;
		backGround.style.backgroundSize = 'cover';
		backGround.style.backgroundRepeat = 'no-repeat';
		spinner.classList.remove('active');
	} catch (error) {
		console.log('Превышен лимит запросов на фоновую картинку, обновите страницу позже');
	}
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

controlBlock.addEventListener('click', (event) => {
	//		replace background
	if (event.target.closest('.wrapper_refresh_img')) {
		spinner.classList.add('active');
		const coordinates = {
			lat: localStorage.getItem('lat'),
			lon: localStorage.getItem('lon')
		};
		replaceImg();
		map(coordinates);
		nameRegion(coordinates);
	}
	//		search button
	if (event.target.closest('.search_btn')) {
		const searchInput = document.querySelector('.search_input');
		const city = searchInput.value.toString();
		document.querySelector('.form_search').reset();
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
		getWeather(region);
	}

	//		button select lang
	if (event.target.closest('.language')) {
		languageLiAll.forEach((el) => {
			el.classList.add('active');
		});
	}

	if (event.target.closest('.b') || event.target.closest('.c') || event.target.closest('.d')) {
		document.querySelector('.a').firstElementChild.innerText = event.target.innerText;
		localStorage.setItem('lang', event.target.innerText);
		const coordinates = {
			lat: localStorage.getItem('lat'),
			lon: localStorage.getItem('lon')
		};
		map(coordinates);
		nameRegion(coordinates);
		deleteActiveLi();
	} else if (
		!event.target.closest('.b') &&
		!event.target.closest('.c') &&
		!event.target.closest('.d') &&
		!event.target.closest('.a')
	) {
		deleteActiveLi();
	}
});

export default replaceImg;
