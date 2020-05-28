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
