function addElementWeather(weatherObj) {
    const weatherToday = document.querySelector('.weather_today');
    const region = document.querySelector('.region');

	// let now = '';
	// now += ' ' + new Date().getDay();
	// now += ' ' + new Date().getDate();
	// now += ' ' + new Date().getFullYear();
	// now += ' ' + new Date().getMonth();
	// now += ' ' + new Date().getUTCHours();
	// now += ' ' + new Date().getMinutes();
	// now += ' ' + new Date().getSeconds();

	let now2 = new Date().toDateString();

	let result = '';
	const degreeLocal = localStorage.getItem('degree');
	result = `
    <div class="region">
        <p>${weatherObj.name}, ${weatherObj.country}</p>
        <p>${now2} </p>
    </div>
    <div class="container_weather">

        <div class="weather_temperature">
            <div class="temperature">
                <p>${degreeLocal === 'C' ? Math.round(weatherObj.temp_c) : Math.round(weatherObj.temp_f)}°</p>
            </div>
            
        </div>
        <div class="info">
            <div class="temperature_img">
                <img src="src/weather_today/img/weather_sun.png" alt="${weatherObj.condition.text}">
            </div>
            <ul>
                <li>${weatherObj.condition.text}</li>
                <li>feelslike: ${degreeLocal === 'C'
					? Math.round(weatherObj.feelslike_c)
					: Math.round(weatherObj.feelslike_f)}°</li>
                <li>wind: ${weatherObj.wind_kph} kph</li>
                <li>humidity: ${weatherObj.humidity}%</li>
            </ul>
        </div>
    </div>`;

	if (region) {
		Array.from(weatherToday.children).forEach((element) => {
			element.remove();
		});
	}
	weatherToday.insertAdjacentHTML('beforeend', result);
}

export default addElementWeather;
