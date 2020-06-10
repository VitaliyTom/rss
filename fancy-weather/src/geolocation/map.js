import RegionObj from './regionObj.js';
import getWeather from '../weather_today/weatherToDay.js';
import replaceImg from '../control_block/control.js';
import getThreeWeather from '../three_day_weather/threeDayWeather.js';
import addElementWeather from '../weather_today/addElementWeather.js';
import addElementThreeWeather from '../three_day_weather/addElementThreeWeather.js';

export function geolocation(coordinates) {
	if (coordinates !== undefined) {
		allRequest(coordinates);
	} else {
		// geolocation
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		function success(pos) {
			var crd = pos.coords;
			const coordinates = {
				lat: crd.latitude,
				lon: crd.longitude
			};

			localStorage.setItem('lat', coordinates.lat);
			localStorage.setItem('lon', coordinates.lon);

			allRequest(coordinates);
		}

		function error(err) {
			console.warn(`Доступ к автоопределению местоположения заблокирован! ERROR(${err.code}): ${err.message}`);
			const coordinates = {
				lat: 53.902334,
				lon: 27.5618791
			};

			allRequest(coordinates);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
	}
}

export function map(coordinates) {
	mapboxgl.accessToken = 'pk.eyJ1IjoibGluLTIwMjAiLCJhIjoiY2thczhsejFvMHFoYzJ6cHIyajNvbjRpOCJ9.mBTGilwu0MZbcP1hyQ1dJA';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [ coordinates.lon, coordinates.lat ], // starting position [lng, lat]
		zoom: 13 // starting zoom
	});

	var marker = new mapboxgl.Marker({
		draggable: true
	})
		.setLngLat([ coordinates.lon, coordinates.lat ])
		.addTo(map);
}

export async function nameRegion(coordinates) {
	try {
		const response = await fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${coordinates.lat}+${coordinates.lon}&key=c6b6da0f80f24b299e08ee1075f81aa5`
		); //a44c8192d43e4d77a0f8297834df2a12
		const parsed = await response.json();
		const parsedResult = parsed.results[0].components;
		const nameCity = parsed.results[0].formatted;

		const region = new RegionObj(
			parsedResult['ISO_3166-1_alpha-3'],
			parsedResult.city === undefined
				? parsedResult.town === undefined ? nameCity.slice(0, nameCity.indexOf(',')) : parsedResult.town
				: parsedResult.city,
			parsedResult.city_district,
			parsedResult.continent,
			parsedResult.country,
			parsedResult['ISO_3166-1_alpha-2'],
			parsedResult.postcode,
			parsedResult.residential,
			parsedResult.suburb,
			parsed.results[0].annotations.timezone.offset_sec
		);

		localStorage.setItem('regionCity', region.city);
		localStorage.setItem('country', region.country);
		localStorage.setItem('residential', region.residential);
		localStorage.setItem('DMS_lat', parsed.results[0].annotations.DMS.lat);
		localStorage.setItem('DMS_lon', parsed.results[0].annotations.DMS.lng);
		localStorage.setItem('timezone', region.timezone);
		return region;
	} catch (error) {
		console.log('Превышен лимит запросов на поиск города, обновите страницу позже');
	}
}

function allRequest(coordinates) {
	const backGroundBar = document.querySelector('.back_ground');
	backGroundBar.classList.add('active');
	Promise.all([
		replaceImg(),
		nameRegion(coordinates),
		getWeather(),
		getThreeWeather()
		// map(coordinates)
	])
		.then(([ img, region, weatherObj, weatherObjArray ]) => {
			const backGround = document.querySelector('body');
			const spinner = document.querySelector('.spinner');
			backGround.style.backgroundImage = `url(${img})`;
			backGround.style.backgroundSize = 'cover';
			backGround.style.backgroundRepeat = 'no-repeat';
			backGround.style.transition = '1s';
			backGround.style.transitionDelay = '1s';
			spinner.classList.remove('active');
			setTimeout(addElement, 1000, weatherObj, region, weatherObjArray);
		})
		.catch((error) => console.error(`Response api return: ${error}`));
}

function addElement(weatherObj, region, weatherObjArray) {
	addElementWeather(weatherObj, region);
	addElementThreeWeather(weatherObjArray);
	const coordinates = {
		lat: localStorage.getItem('lat'),
		lon: localStorage.getItem('lon')
	};
	map(coordinates);
}

geolocation();
