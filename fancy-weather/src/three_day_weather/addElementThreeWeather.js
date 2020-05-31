import dayName from '../general/day.js';

function addElementThreeWeather(weatherObj) {
	const weather = document.querySelector('.weather');
	// const region = document.querySelector('.region');

	let result = '';
    let dayThree = 1;
    const dayNumber = new Date().getDay();    
    // console.log(weatherObj);
	weatherObj.forEach((el) => {
		result += `
        <div class="wrapper_weather">
            <div class="day_name">
                <p>${getNameDay(dayNumber + dayThree > 6 ? dayNumber - 7 + dayThree : dayNumber + dayThree)}</p>
            </div>
            <div class="degree_img">
                <div class="degree_three_day">
                    <p>${Math.round(el.temp[1].max.value) }°</p>
                </div>
                <div class="img_three_day">
                    <img src="src/img/${el.weather_code}.svg" alt="${el.weather_code}">
                </div>
            </div>
        </div>`;
		dayThree++;
    });
    
	result = `<div class="weather_three_day"> ${result} </div>`;	
	weather.insertAdjacentHTML('afterend', result);
}

function getNameDay(params) {
	return dayName[params];
}

export default addElementThreeWeather;