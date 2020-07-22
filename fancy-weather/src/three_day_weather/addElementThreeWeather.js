import { dayName } from '../general/day.js';
import { getLanguage } from '../general/lng.js';

function addElementThreeWeather(weatherObj) {
	const weatherThreeDay = document.querySelector('.weather_three_day');

	let result = '';
	let dayThree = 1;
	const dayNumber = new Date().getDay();

	weatherObj.forEach((el) => {
		result += `
        <div class="wrapper_weather_three">
            <div class="day_name">
                <p>${getNameDay(dayNumber + dayThree > 6 ? dayNumber - 7 + dayThree : dayNumber + dayThree)}</p>
            </div>
            <div class="degree_img">
                <div class="degree_three_day">
                    <p>${Math.round(el.temp[1].max.value)}°</p>
                </div>
                <div class="img_three_day">
                    <img src="src/img/${el.weather_code}.svg" alt="${el.weather_code}">
                </div>
            </div>
        </div>`;
		dayThree++;
	});

	if (weatherThreeDay.children.length > 0) {
		Array.from(weatherThreeDay.children).forEach((el) => {
			el.remove();
		});
	}
	weatherThreeDay.insertAdjacentHTML('afterbegin', result);
}

function getNameDay(params) {
	return dayName[params][getLanguage()];
}

export default addElementThreeWeather;
