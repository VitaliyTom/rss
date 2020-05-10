import addElement from './js/addElement.js';
import searchMovieByName from './js/searchMovieByName.js';
import searchMovieByRating from './js/searchMovieByRating.js';
import check from './js/check.js';

const key = '103bee69';
// const key = '2ca9f536';
// const key = '9b67fc54';
let position = 0;
let page = 1;
let url = '';
let remove = true;
const widthCard = 224;
const form = document.querySelector('.form');
const slider = document.querySelector('.slider');
let lineCards = document.querySelector('.line_cards');
const input = document.querySelector('.delete');
const progressBar = document.querySelector('.progress_bar');
localStorage.setItem('nameFilm', 'love');

function setFocus() {
	document.getElementById('field_input').focus();
}

function getUrl() {
	return (url = `https://www.omdbapi.com/?s=${localStorage.getItem('nameFilm')}&page=${page}&apikey=${key}`);
}

async function firstDownload() {
	url = getUrl();
	searchMovie(url);
}

async function searchMovie(url) {
	const rating = await searchMovieByName(url);
	const cards = await searchMovieByRating(rating);
	addElement(cards, remove);
}

function preload() {
	if (position === (lineCards.childElementCount - 5) * -widthCard) {
		progressBar.classList.add('active');
		page++;
		remove = false;

		url = getUrl();
		searchMovie(url);
	}
}

setFocus();
progressBar.classList.add('active');
firstDownload();

form.addEventListener('submit', async (e) => {
	progressBar.classList.add('active');

	const fieldInput = document.querySelector('.field_input').value.toString();
	localStorage.setItem('nameFilm', fieldInput);
	remove = true;
	page = 1;
	url = getUrl();
	e.preventDefault();
	searchMovie(url);
	position = 0;
	check(position, lineCards);
});

slider.addEventListener('click', async (e) => {
	if (e.target.closest('.card')) {
		const id = document.querySelector('.id').textContent;
		url = `https://www.imdb.com/title/${id}/videogallery/`;
		window.location.href = url;
	}

	// если карточки закончились - не листать
	if (e.target.closest('.arrow_right')) {
		if (position !== (lineCards.childElementCount - 4) * -widthCard) {
			position += -widthCard;
			lineCards.style.left = position + 'px';
		}

		preload();

		// если первая карточка - не листать
	} else if (e.target.closest('.arrow_left')) {
		if (position < 0) {
			position += widthCard;
			lineCards.style.left = position + 'px';
		}
	}
});

input.addEventListener('click', (e) => {
	form.reset();
});
