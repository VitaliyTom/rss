import Weather from './weatherObj.js';
import addElementWeather from './addElementWeather.js';
getWeather();
function url() {
	if (localStorage.hasOwnProperty('city') && localStorage.getItem('city').trim() !== '') {
		return `https://api.weatherapi.com/v1/forecast.json?key=363474e96d194f10ab9212718201105&q=${localStorage.getItem(
			'city'
		)}&days=3`;
	} else {
		localStorage.setItem('city', 'Minsk');
		return `https://api.weatherapi.com/v1/forecast.json?key=363474e96d194f10ab9212718201105&q=${localStorage.getItem(
			'city'
		)}&days=3`;
	}
}
// 'https://api.weatherapi.com/v1/forecast.json?key=363474e96d194f10ab9212718201105&q=Minsk&days=3'

async function getWeather() {
	const response = await fetch(url());
	const parsed = await response.json();
	console.log(parsed);
	const weatherObj = new Weather(
		parsed.location.country,
		parsed.location.name,
		parsed.current.temp_c,
		parsed.current.temp_f,
		parsed.current.feelslike_c,
		parsed.current.feelslike_f,
		parsed.current.humidity,
		parsed.current.wind_kph,
		parsed.current.wind_mph,
		parsed.location.localtime,
		parsed.current.condition,
		parsed.forecast.forecastday
	);

	// console.log(weatherObj);

	addElementWeather(weatherObj);
}

export default getWeather;
