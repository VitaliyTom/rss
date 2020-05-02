import Card from "./card.js";

const form = document.querySelector(".form");
const key = "2ca9f536";

form.addEventListener("submit", (e) => {
  const fieldInput = document.querySelector(".field_input").value.toString();
  let url = `https://www.omdbapi.com/?s=${fieldInput}&apikey=${key}`;
  let cards = [];
  let rating = [];
  e.preventDefault();
  searchFilm(rating, cards, url);
  
});

async function searchFilm(rating, cards, url) {
  let response = await fetch(url);
  let parsed = await response.json();
  console.log(parsed);
  parsed.Search.forEach((el) => {
    rating.push(el.imdbID);
  });

  searchRating(rating, cards);
}

function searchRating(rating, cards) {
  rating.forEach(async (el) => {
    let response = await fetch(
      `https://www.omdbapi.com/?i=${el}&apikey=${key}`
    );

    let parsed = await response.json();

    cards.push(
      new Card(
        parsed.Poster,
        parsed.Title,
        parsed.Year,
        parsed.Ratings[0].Value
      )
    );
  });
  console.log(cards);
  form.reset();
}
