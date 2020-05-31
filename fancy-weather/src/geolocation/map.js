import RegionObj from './regionObj.js';
import getWeather from '../weather_today/weatherToDay.js';

function geolocation(coordinates) {

    if(coordinates !== undefined){
        map(coordinates);
        nameRegion(coordinates);
        return;
    }
	// geolocation
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;

		console.log('Ваше текущее метоположение:');
		console.log(`Широта: ${crd.latitude}`);
		console.log(`Долгота: ${crd.longitude}`);
		console.log(`Плюс-минус ${crd.accuracy} метров.`);

		const coordinates = {
			lat: crd.latitude,
			lon: crd.longitude,
		};
        localStorage.setItem('lat', coordinates.lat);
        localStorage.setItem('lon', coordinates.lon);
        map(coordinates);
        nameRegion(coordinates);
	}

	function error(err) {
        console.warn(`Доступ к автоопределению местоположения заблокирован! ERROR(${err.code}): ${err.message}`);
        const coordinates = {
			lat: 53.902334,
            lon: 27.5618791,
		};

        map(coordinates);
        nameRegion(coordinates);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

function map(coordinates) {
	mapboxgl.accessToken = 'pk.eyJ1IjoibGluLTIwMjAiLCJhIjoiY2thczhsejFvMHFoYzJ6cHIyajNvbjRpOCJ9.mBTGilwu0MZbcP1hyQ1dJA';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [coordinates.lon, coordinates.lat ],// starting position [lng, lat]
		zoom: 13 // starting zoom
	});

	var marker = new mapboxgl.Marker({
	    // draggable: true
	})
	    .setLngLat([coordinates.lon, coordinates.lat])
	    .addTo(map);
	}

async function nameRegion(coordinates){

    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coordinates.lat}+${coordinates.lon}&key=a44c8192d43e4d77a0f8297834df2a12`);
    const parsed = await response.json();
    const parsedResult = parsed.results[0].components;
    
    console.log(parsed); 
    
    const region = new RegionObj(
        parsedResult['ISO_3166-1_alpha-3'],
        parsedResult.city,
        parsedResult.city_district,
        parsedResult.continent,
        parsedResult.country,
        parsedResult['ISO_3166-1_alpha-2'],
        parsedResult.postcode,
        parsedResult.residential,
        parsedResult.suburb
    )
    // console.log(region);
    localStorage.setItem('DMS_lat', parsed.results[0].annotations.DMS.lat);
    localStorage.setItem('DMS_lon', parsed.results[0].annotations.DMS.lng);
    localStorage.setItem('country', region.country);
    // localStorage.setItem('ISOCountry', parsed['ISO_3166-1_alpha-3']);
    localStorage.setItem('regionCity', region.city);
    localStorage.setItem('residential', region.residential);
    // ${regionCity.country}, ${regionCity.city}/${regionCity.residential}
    getWeather(region);

    
};

geolocation();

export default geolocation;