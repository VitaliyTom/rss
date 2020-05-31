function localDate() {
	const locDate = document.querySelector('.date');
	setInterval(() => {
		const date = new Date();
		const options = {
			month: 'long',
			weekday: 'short',
			day: 'numeric',
			timezone: 'UTC',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};

		let setHtmlDate = date.toLocaleString('ru', options);
		localStorage.getItem('lang') === 'Eng' && (setHtmlDate = date.toLocaleString('en-US', options));
		locDate.innerText = `${setHtmlDate}`;
	}, 1000);
}

function addElementWeather(weatherObj, regionCity) {
	const weatherToday = document.querySelector('.weather_today');
	const region = document.querySelector('.region');

	let result = '';
	result = `
    <div class="region">
        <p>${regionCity.country}, ${regionCity.city} ${regionCity.residential === undefined || 'undefined'
		? ''
		: regionCity.residential === undefined || 'undefined' ? '' : regionCity.residential}</p>
        <p class="date"></p>
    </div>
    <div class="container_weather">
        <div class="weather_temperature">
            <div class="temperature">
                <p>${Math.round(weatherObj.temp.value)}°</p>
            </div>            
        </div>
        <div class="info">
            <div class="temperature_img">
                <img src="src/img/${weatherObj.weather_code}.svg" alt="${weatherObj.weather_code}">
            </div>
            <ul>
                <li>${weatherObj.weather_code.replace('_', ' ')}</li>
                <li>feelslike: ${weatherObj.feelslike.value}°</li>
                <li>wind: ${weatherObj.wind.value} ${weatherObj.wind.units}</li>
                <li>humidity: ${weatherObj.humidity.value}%</li>
            </ul>
        </div>
    </div>`;

	if (region) {
		Array.from(weatherToday.children).forEach((element) => {
			element.remove();
		});

		document.querySelector('.weather_three_day').remove();
	}

	weatherToday.insertAdjacentHTML('afterbegin', result);

	const wrapperMap = document.querySelector('.wrapper_map');
	const coordinates = document.querySelector('.coordinates');

	if (coordinates) {
		coordinates.remove();
	}

	wrapperMap.insertAdjacentHTML(
		'beforeEnd',
		`<div class="coordinates"><div class="lat">Latitude: ${localStorage.getItem('DMS_lat')}</div>
	<div class="lon">Longitude: ${localStorage.getItem('DMS_lon')}</div> </div>`
	);
	localDate();
}

export default addElementWeather;
