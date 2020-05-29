import dayName from '../general/day.js';
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
                <img src="${weatherObj.condition.icon}" alt="${weatherObj.condition.text}">
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
		document.querySelector('.weather_three_day').remove();
	}

	let result2 = '';
    let item = 1;
    const dayNumber = new Date().getDay();
    // const dayNumber = 3;
	weatherObj.nextThreeDay.forEach((el) => {
		result2 += `
        <div class="wrapper_weather">
            <div class="day_name">
                <p>${getNameDay(dayNumber + item > 6 ? dayNumber - 7 + item : dayNumber + item)}</p>
            </div>
            <div class="degree_img">
                <div class="degree_three_day">
                    <p>${degreeLocal === 'C' ? Math.round(el.day.avgtemp_c) : Math.round(el.day.avgtemp_f)}°</p>
                </div>
                <div class="img_three_day">
                    <img src="${el.day.condition.icon}" alt="">
                </div>
            </div>
        </div>`;
		item++;
	});
	result2 = `<div class="weather_three_day"> ${result2} </div>`;
	weatherToday.insertAdjacentHTML('beforeend', result);
	weatherToday.insertAdjacentHTML('afterend', result2);
}

function getNameDay(params) {
	return dayName[params];
}

export default addElementWeather;
