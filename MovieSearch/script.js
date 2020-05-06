import Card from './card.js';

const form = document.querySelector('.form');
const key = '2ca9f536';
const slider = document.querySelector('.slider');
let lineCards = document.querySelector('.line_cards');
let position = 0;
// --------------------- временный велосипед--------
// FIXME - не подгружает 
async function bike() {
	const url = `https://www.omdbapi.com/?s=love&page=5&apikey=${key}`;
	const cards = await searchFilm(url);
	// console.log('+++', cards);
	addElement(cards);
}

bike();

// --------------------- конец временный велосипед --------

function addElement(cards) {
	const card = Array.from(document.querySelectorAll('.card'));
	const lineCards = document.querySelector('.line_cards');
	let result = '';
	// console.log('-+', cards);

	cards.forEach((el) => {
		// console.log(el);

		result += `<div class="card">
                  <div class="name_card">
                      <p>${el.title}</p>
                  </div>
                  <div class="poster">
                      <img src="${el.poster}" alt="poster">
                  </div>
                  <div class="release_year">
                      <p>${el.year}</p>
                  </div>
                  <div class="rating">
                      <div class="icon_rating">
                        <img src="img/star.png" alt="icon">
                      </div>
                      <div class="rating_score">
                          <p>${el.rating}</p>
                      </div>
                  </div>
               </div>           
      `;
	});
	// console.log(result);
	if (flag && card !== null) {
		card.forEach((element) => {
			element.remove();
		});
	}
	//
	lineCards.insertAdjacentHTML('beforeend', result);
	// lineCards.innerHTML = result;
}

async function searchFilm(url) {
	const rating = [];
	const response = await fetch(url);
	const parsed = await response.json();
	// console.log('parsed = ', parsed);
	parsed.Search.forEach((el) => {
		rating.push(el.imdbID);
	});
	// console.log('rating', rating);

	const result = searchRating(rating);

	return result;
}

async function searchRating(rating) {
	const cards = [];

	const cardPromises = rating.map(async (el) => {
		const response = await fetch(`https://www.omdbapi.com/?i=${el}&apikey=${key}`);

		const parsed = await response.json();

		cards.push(
			new Card(
				parsed.Poster === 'N/A' ? 'img/poster.png' : parsed.Poster,
				parsed.Title,
				parsed.Year,
				parsed.imdbRating === 'N/A' ? 'No rating' : parsed.imdbRating
			)
		);
	});

	await Promise.all(cardPromises);
	// console.log('----', cards);

	return cards;
}

let page = 1;
let url = '';
let flag = true;
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	flag = true;
	page = 1;
	const fieldInput = document.querySelector('.field_input').value.toString();
	if (localStorage.hasOwnProperty('nameFilm') && fieldInput !== '') {
		localStorage.setItem('nameFilm', fieldInput);
		url = `https://www.omdbapi.com/?s=${localStorage.getItem('nameFilm')}&page=${page}&apikey=${key}`;
		// localStorage.setItem('lang', 'Eng');
		// let lang = localStorage.getItem('lang');
	}
	url = `https://www.omdbapi.com/?s=${fieldInput}&page=${page}&apikey=${key}`;
	const cards = await searchFilm(url);
	console.log('+++', cards);
	addElement(cards);
	position = 0;
	if (lineCards.childElementCount === 3) {
		lineCards.style.left = '50%';
		// lineCards.style.marginLeft = '-50%';
		lineCards.style.transform = `translate(-50%, 0%)`;
		// lineCards.style.display = 'flex';
		// lineCards.style.justifyContent = 'center';
		// lineCards.style.margin = `0 auto`;
		// lineCards.style.width = 880 + 'px';
		// lineCards.style.marginLeft = 4 + '%';
		// left: 50%;
		// margin-right: -50%;
		// transform: translate(-50%, -50%)
	} else {
		lineCards.style.left = position + 'px';
		lineCards.style.transform = `translate(0)`;
	}
	form.reset();
});
// lineCards.scrollWidth
slider.addEventListener('click', async (e) => {
	// let lineCards = document.querySelector('.line_cards');
	if (lineCards.childElementCount === 3) {
		lineCards.style.position = 50 + '%';
	}

	// если карточки закончились - не листать
	if (e.target.closest('.arrow_right')) {
		if (position !== (lineCards.childElementCount - 4) * -224) {
			position += -224;
			lineCards.style.left = position + 'px';
		}
		// если первая карточка - не листать
	} else if (e.target.closest('.arrow_left')) {
		if (position < 0) {
			position += 224;
			lineCards.style.left = position + 'px';
		}
	}

	if (position === (lineCards.childElementCount - 5) * -224) {
		page++;
		flag = false;

		url = `https://www.omdbapi.com/?s=${localStorage.getItem('nameFilm')}&page=${page}&apikey=${key}`;
		const cards = await searchFilm(url);
		addElement(cards);
	}
});
