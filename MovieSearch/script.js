import Card from "./card.js";

const form = document.querySelector(".form");
const key = "2ca9f536";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fieldInput = document.querySelector(".field_input").value.toString();
  const url = `https://www.omdbapi.com/?s=${fieldInput}&apikey=${key}`;

  const cards = await searchFilm(url);
  console.log("+++", cards);

  addElement(cards);
  form.reset();
});

function addElement(cards) {
  const cardView = document.querySelector(".card_view");
  let result = "";
  console.log("-+", cards);

  cards.forEach((el) => {
    console.log(el);

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
                        <img src="img/star2.png" alt="icon">
                      </div>
                      <div class="rating_score">
                          <p>${el.rating.slice(0, 3)}</p>
                      </div>
                  </div>
               </div>           
      `;
  });
  console.log(result);
  cardView.innerHTML = result;
}

async function searchFilm(url) {
  const rating = [];
  const response = await fetch(url);
  const parsed = await response.json();
  console.log("parsed = ", parsed);
  parsed.Search.forEach((el) => {
    rating.push(el.imdbID);
  });
  console.log("rating", rating);

  const result = searchRating(rating);

  return result;
}

async function searchRating(rating) {
  const cards = [];

  const cardPromises = rating.map(async (el) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${el}&apikey=${key}`
    );

    const parsed = await response.json();

    cards.push(
      new Card(
        parsed.Poster,
        parsed.Title,
        parsed.Year,
        parsed.Ratings[0].Value
      )
    );
  });

  await Promise.all(cardPromises);
  console.log("----", cards);

  return cards;
}
