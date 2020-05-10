function addElement(cards, remove) {
	const card = Array.from(document.querySelectorAll('.card'));
	const lineCards = document.querySelector('.line_cards');
	let result = '';
	cards?.forEach((el) => {
		result += `<div class="card">
            <div class="id" hidden="true">${el.id}</div>
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

	if (remove && card !== null) {
		card.forEach((element) => {
			element.remove();
		});
	}

	lineCards.insertAdjacentHTML('beforeend', result);
}

export default addElement;
