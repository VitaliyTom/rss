import Weather from '../weather_today/weatherObj.js';
import addElementThreeWeather from '../three_day_weather/addElementThreeWeather.js';
const apikey = 'vuRjVVld9hdH7Zu2pJbcd5H0A9RVpd7O';
// const apikey = 'Kt54Fx3bkNTsFKsyh2GoZY8jwKfANf6e';


function url() {
	const lat = localStorage.hasOwnProperty('lat') ? localStorage.getItem('lat') : 53.902334;
	const lon = localStorage.hasOwnProperty('lon') ? localStorage.getItem('lon') : 27.5618791;

	return `https://api.climacell.co/v3/weather/forecast/daily?lat=${lat}&lon=${lon}&unit_system=${localStorage.getItem('degree') === 'C'
		? 'si'
		: 'us'}&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${apikey}`;
}

async function getThreeWeather() {
	const response = await fetch(url());
	const parsed = await response.json();	
	const weatherObjArray = [];
	
	parsed.slice(1, 4).forEach((element) => {
		const weatherObj = new Weather(
			element.lat,
			element.lon,
			element.temp,
			element.feels_like,
			element.humidity,
			element.wind_speed,
			element.observation_time.value,
			element.weather_code.value
		);
		weatherObjArray.push(weatherObj);
	});

	// console.log(weatherObjArray);
	addElementThreeWeather(weatherObjArray);
}

export default getThreeWeather;
