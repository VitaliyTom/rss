replaceImg();

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

async function codeCountry() {
	const response = await fetch('https://ipinfo.io/json?token=a045dc5cfaf1fe');
	const parsed = await response.json();
	console.log(parsed);
	localStorage.setItem('country_code', parsed.country);
}
replaceImg();
codeCountry();
