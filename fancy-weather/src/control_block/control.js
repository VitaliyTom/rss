import getWeather from '../weather_today/weatherToDay.js';
import geolocation from '../geolocation/map.js';

// import RegionObj from '../geolocation/regionObj.js';
const controlBlock = document.querySelector('.control_block');
const client_id = 'YcOZjTnZyaoo2rVD0K3ZYSlVYGwpyJxwhqZMzc-R5to';
// const client_id = 'e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
const spinner = document.querySelector('.spinner');
const degreeCelsiusBtn = document.querySelector('.degree_сelsius_btn');
const degreeFahrenheitBtn = document.querySelector('.degree_fahrenheit_btn');
const languageLiAll = document.querySelectorAll('.language li');

localStorage.setItem('lang', 'Eng')

if (!localStorage.hasOwnProperty('degree')) {
	localStorage.setItem('degree', 'C');
	degreeCelsiusBtn.classList.add('active');
} else {
	localStorage.getItem('degree') === 'C'
		? degreeCelsiusBtn.classList.add('active')
		: degreeFahrenheitBtn.classList.add('active');
}

// replaceImg();

function url() {
	// const page = Math.round(Math.random() * 10);
	const url = `https://api.unsplash.com/photos/random?orientation=squarish&per_page=1&query=sea&client_id=${client_id}`;
	return url;
}

async function replaceImg() {
	const response = await fetch(url());
	const parsed = await response.json();
	const img = parsed.urls.regular;
	// console.log(parsed);
	const backGround = document.querySelector('.back_ground');
	backGround.setAttribute('src', img);
	backGround.style.width = '100%';
	backGround.style.height = '99.9%';
	spinner.classList.remove('active');
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
	//  https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=a44c8192d43e4d77a0f8297834df2a12&pretty=1&no_annotations=1
	const parsed = await response.json();
	console.log(parsed);	
	const arrCountry = [];
	parsed.results.forEach((el, index) => {
		if(el.components['ISO_3166-1_alpha-2'] === `${localStorage.getItem('country_code')}`){
			arrCountry.push(index);
		}
	});

	const coordinates = {
		lat: parsed.results[arrCountry.length > 0 ? arrCountry[0] : 0].geometry.lat,
		lon: parsed.results[arrCountry.length > 0 ? arrCountry[0] : 0].geometry.lng
		}
	localStorage.setItem('lat', coordinates.lat);
	localStorage.setItem('lon', coordinates.lon);
	geolocation(coordinates);	
}

controlBlock.addEventListener('click', (event) => {
	//		replace background
	if (event.target.closest('.wrapper_refresh_img')) {
		spinner.classList.add('active');
		replaceImg();
	}
	//		search button
	if (event.target.closest('.search_btn')) {
		const searchInput = document.querySelector('.search_input');
		const city = searchInput.value.toString();
		document.querySelector('.form_search').reset();
		// localStorage.setItem('regionCity', city);
		getCoordinates(city);
		// getWeather();
		// console.log(searchInput.value.toString());
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
		// localStorage.getItem('region');
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
		localStorage.setItem('lang', event.target.innerText)
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
