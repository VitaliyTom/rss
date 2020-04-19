import cards from './cards.js';

const burgerMenu = document.querySelector('.burger_menu');
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const switchMenu = document.querySelector('.switch');
const toggleSwitch = document.querySelector('.toggle_switch');
const spanSwitch = document.querySelector('.span_switch');
const body = document.querySelector('body');
const main = document.querySelector('main');
const main_container = document.createElement('div');
const mainPage = document.createElement('div');

containerRender();

function containerRender() {
	main_container.className = 'main_container';
	main.prepend(main_container);
	mainPage.className = 'main_page';
	main_container.prepend(mainPage);
}

mainPageRender();

const cardUp = Array.from(document.querySelectorAll('.card-up'));

function mainPageRender() {
	cards.reverse().forEach((element) => {
		let createCardElement = ` 		 
		 <div class="card ${element.class}">
		 <div class="card-up"></div>
		 <div class="image">
		 <div  class="rounded-circle" style="background:url(${element.card[7].image})center; background-size: cover }"></div>
		 </div>
		 <div class="card-body">
		 <h4 class="card-title">${element.category}</h4>
		 </div> 
		 </div>`;
		mainPage.insertAdjacentHTML('afterbegin', createCardElement);
	});
}

mainPage.addEventListener('click', (event) => {
	if (event.target.classList.value !== 'main_page') {
		renderCategory();
	}
});

function renderCategory() {
	let arrCardClass = Array.from(event.target.closest('.card').classList);
	if (event.target.closest('.card')) {
		cards.forEach((element) => {
			if (arrCardClass.includes(element.class)) {
				mainPage.remove(mainPage);
				render(element, categoryPageCreate());
				checkPlay();
			}
		});
	}
}

burgerMenu.addEventListener('click', (event) => {
	burgerActiveToggle();
});

switchMenu.addEventListener('click', () => {
	toggleSwitch.classList.toggle('active');
	spanSwitch.classList.toggle('active');
	navigation.classList.toggle('play');
	switchMenu.classList.toggle('play');

	const cardCategoryArray = Array.from(document.querySelectorAll('.card_category'));

	cardUp.forEach((el) => {
		el.classList.toggle('play');
	});

	play(cardCategoryArray);
	if (document.querySelector('.category_page')) {
		button();
	}
});

body.addEventListener('click', (event) => {
	if (event.target.closest('.translate')) {
		cardFlip();
	}

	if (
		event.target.closest('.card_face') ||
		(event.target.closest('.card_body_category') && !event.target.closest('.card_body_category.back'))
	) {
		if (!document.querySelector('.switch.play')) {
			let audioElement = new Audio(event.target.closest('.card_category').firstElementChild.src);
			audioElement.play();
		}
	}

	if (event.target.closest('.navigation')) {
		if (event.target.childNodes[0].data === 'Main page') {
			checkForNull();
			containerRender();
			burgerActiveToggle();
			document.querySelector('.button').classList.remove('play');
		}

		cards.forEach((element) => {
			if (element.category === event.target.childNodes[0].data) {
				checkForNull();
				render(element, categoryPageCreate());
				burgerActiveToggle();
				checkPlay();
				document.querySelector('.button').classList.add('play');
			}
		});
	}
});

function render(cards, categoryPage) {
	cards.card.forEach((element) => {
		let createCardElement = ` 
		<div class="flip">
		 <div class="card_category ${cards.class}">
		 <audio class = "audio" src="${element.audioSrc}"></audio>
		 <div class="image_rectangular">
		 <div  class="card_face" style="background:url(${element.image})center; background-size: cover "></div>
		 <div  class="card_face_back" style="background:url(${element.image})center; background-size: cover "></div>
		 </div>
		 <div class="card_body_category">
		 <h4 class="card_title_category_translate">${element.translation}</h4>
    	 <h4 class="card_title_category">${element.word}</h4>
		 </div> 
		 <div class="translate">
		 <div class="translate_word" style="background:url(img/repeat.png) center; background-size: cover;"></div> 
		 </div>
         </div>        
         </div>`;
		categoryPage.insertAdjacentHTML('afterbegin', createCardElement);
	});
	let button = `<button class="button">Start game</button>`;
	if (!document.querySelector('.button')) {
		document.querySelector('.category_page').insertAdjacentHTML('afterend', button);
	}
}

function cardFlip() {
	let card = event.target.closest('.card_category');
	card.classList.add('back');
	card.querySelector('.card_body_category').classList.add('back');
	card.addEventListener('mouseleave', (event) => {
		if (event.target.closest('.flip')) {
			let card = event.target.closest('.card_category');
			card.classList.remove('back');
			card.querySelector('.card_body_category').classList.remove('back');
		}
	});
}

function button() {
	document.querySelector('.button').classList.toggle('play');
}

function play(cardCategoryArray) {
	cardCategoryArray.forEach((el) => {
		Array.from(el.children).forEach((item) => {
			if (Array.from(item.classList).includes('image_rectangular')) {
				item.children[0].classList.toggle('play');
			} else {
				item.classList.toggle('play');
			}
		});
	});
}

function burgerActiveToggle() {
	burger.classList.toggle('burger_active');
	navigation.classList.toggle('active');
}

function categoryPageCreate() {
	const categoryPage = document.createElement('div');
	categoryPage.className = 'category_page';
	main_container.prepend(categoryPage);
	return categoryPage;
}

function checkForNull() {
	let mp = document.querySelector('.main_page');
	let cp = document.querySelector('.category_page');

	if (mp !== null) {
		mp.remove();
	}
	if (cp !== null) {
		cp.remove();
	}
}

function checkPlay() {
	if (document.querySelector('.switch.play')) {
		const cardCategoryArray = Array.from(document.querySelectorAll('.card_category'));
		play(cardCategoryArray);
		document.querySelector('.button').classList.toggle('play');
	}
}