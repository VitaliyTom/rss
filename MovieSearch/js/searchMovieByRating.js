import Card from './card.js';
const key = '103bee69';
// const key = '2ca9f536';
// const key = '9b67fc54';
const progressBar = document.querySelector('.progress_bar');
async function searchMovieByRating(rating) {
	try {
		const cards = [];
		const cardPromises = rating?.map(async (el) => {
			const response = await fetch(`https://www.omdbapi.com/?i=${el}&apikey=${key}`);
			const parsed = await response.json();
			cards.push(
				new Card(
					parsed.Poster === 'N/A' ? 'img/poster.png' : parsed.Poster,
					parsed.Title,
					parsed.Year,
					parsed.imdbRating === 'N/A' ? 'No rating' : parsed.imdbRating,
					el
				)
			);
		});

		await Promise.all(cardPromises);
		progressBar.classList.remove('active');

		return cards;
	} catch (error) {
		console.log('ошибка = ' + error);
		progressBar.classList.remove('active');
	}
}

export default searchMovieByRating;
