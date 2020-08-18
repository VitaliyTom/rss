async function codeCountry() {
	const response = await fetch('https://ipinfo.io/json?token=a045dc5cfaf1fe');
	const parsed = await response.json();
	localStorage.setItem('country_code', parsed.country);
}

// codeCountry();
