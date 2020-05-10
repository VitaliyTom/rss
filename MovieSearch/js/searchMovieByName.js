async function searchMovieByName(url) {
	try {
		const rating = [];
		const response = await fetch(url);
		const parsed = await response.json();

		parsed.Search?.forEach((el) => {
			rating.push(el.imdbID);
		});

		if (parsed.totalResults) {
			localStorage.setItem('totalResult', parsed.totalResults);
			document.querySelector('.res').innerText = `Showing results for "${localStorage.getItem(
				'nameFilm'
			)}": ${localStorage.getItem('totalResult')}`;
			return rating;
		}
	} catch (error) {
		console.log('ошибка = ' + error);
	}
}

export default searchMovieByName;
