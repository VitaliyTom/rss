import getWeather from '../weather_today/weatherToDay.js';
const controlBlock = document.querySelector('.control_block');
// const client_id = 'YcOZjTnZyaoo2rVD0K3ZYSlVYGwpyJxwhqZMzc-R5to';
const client_id = 'e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
const spinner = document.querySelector('.spinner');
const degreeCelsiusBtn = document.querySelector('.degree_сelsius_btn');
const degreeFahrenheitBtn = document.querySelector('.degree_fahrenheit_btn');

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
		localStorage.setItem('city', city);
		getWeather();
		// console.log(searchInput.value.toString());
	}

	//		change degree
	if (event.target.closest('.wrapper_change_degree')) {
		degreeFahrenheitBtn.classList.remove('active');
		degreeCelsiusBtn.classList.remove('active');
		localStorage.setItem('degree', event.target.value);
		event.target.classList.add('active');
		getWeather();
	}
});
