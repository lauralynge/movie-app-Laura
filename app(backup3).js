"use strict";

// I stedet for mange separate variabler, definer alt data direkte i arrayet!
const movies = [
  {
    id: 1,
    title: "Barbie",
    year: 2023,
    genre: ["Adventure", "Comedy", "Fantasy"],
    rating: 7.0,
    director: "Greta Gerwig",
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
    actors: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    description:
      "Barbie and Ken embark on a journey of self-discovery after leaving the utopian Barbie Land for the real world.",
  },
  {
    id: 2,
    title: "Dune",
    year: 2021,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.0,
    director: "Denis Villeneuve",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
    actors: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    description:
      "Paul Atreides leads nomadic tribes in a battle to control the desert planet Arrakis and its valuable spice.",
  },
  {
    id: 3,
    title: "Dune: Part Two",
    year: 2024,
    genre: ["Action", "Adventure", "Drama"],
    rating: 8.7,
    director: "Denis Villeneuve",
    image:
      "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
    actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: ["Animation", "Action", "Adventure"],
    rating: 8.7,
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjE1ODk2NDgtNTMxZC00ZWQ1LWFlZmItNjQ1ZWRhZTQ5NTliXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    actors: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
  },
  {
    id: 5,
    title: "Avatar: The Way of Water",
    year: 2022,
    genre: ["Action", "Adventure", "Fantasy"],
    rating: 7.6,
    director: "James Cameron",
    image:
      "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGc@._V1_.jpg",
    actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    description:
      "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.",
  },
  {
    id: 6,
    title: "Top Gun: Maverick",
    year: 2022,
    genre: ["Action", "Drama"],
    rating: 8.3,
    director: "Joseph Kosinski",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    actors: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
  },
  {
    id: 7,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.7,
    director: "Christopher Nolan",
    image:
      "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 8,
    title: "John Wick: Chapter 4",
    year: 2023,
    genre: ["Action", "Crime", "Thriller"],
    rating: 7.7,
    director: "Chad Stahelski",
    image:
      "https://m.media-amazon.com/images/M/MV5BNjRmMTk1ZjgtZTQ5ZS00NmM5LWJlNWYtY2M1NzI3NWU3ZmFjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    actors: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    description:
      "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
  },
];

// Find movie list container (gør det én gang)
const movieListContainer = document.querySelector("#movie-list");

// Den SMARTE måde - funktion der både genererer HTML og tilføjer til DOM!
function displayMovie(movieObject) {
  // Konverter genre array til string
  const genreString = movieObject.genre.join(", ");

  const movieHTML = `
    <article class="movie-card">
      <img src="${movieObject.image}" 
           alt="Poster of ${movieObject.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movieObject.title} <span class="movie-year">(${movieObject.year})</span></h3>
        <p class="movie-genre">${genreString}</p>
        <p class="movie-rating">⭐ ${movieObject.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${movieObject.director}</p>
      </div>
    </article>
  `;

  // Tilføj direkte til DOM
  movieListContainer.insertAdjacentHTML("beforeend", movieHTML);
  console.log(`${movieObject.title} tilføjet til DOM!`);
}

// Den ultimative funktion - vis alle movies i ét kald!
// function displayMovies(movieArray) {
// Ryd container først
//movieListContainer.innerHTML = "";

// Loop gennem alle movies og vis dem (bruger for-of loop!)
//for (const movie of movieArray) {
//  displayMovie(movie);
//  console.log(`${movie.title} displayed`);
//  }

//  console.log(`🎉 ${movieArray.length} movies displayed successfully!`);
//}

// Test den ultimative funktion
// displayMovies(movies);

// ========== TEST ASYNC FETCH ==========

// async function testFetchMovies() {
// console.log("🚀 Starter hentning af movie data...");

// Vent på at få response fra serveren
// const response = await fetch(
//   "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json"
// );

// console.log("📡 Response modtaget:", response);

// Vent på at konvertere response til JavaScript objekter
// const moviesFromJSON = await response.json();

// console.log("🎬 Movies fra JSON:", moviesFromJSON);
// console.log("📊 Antal movies:", moviesFromJSON.length);
// console.log("🎭 Første movie:", moviesFromJSON[0]);
// }

// Kald funktionen
// testFetchMovies();

// ========== TEST DISPLAY ONE MOVIE ==========

// async function testDisplayOneMovie() {
//  console.log("🧪 Tester at vise ÉN movie fra JSON...");

// Hent data
//  const response = await fetch(
//  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json"
//  );
// const moviesFromJSON = await response.json();

// Ryd container først
//  movieListContainer.innerHTML = "";

// Vis kun første movie som test
//  displayMovie(moviesFromJSON[0]);

//  console.log("✅ Test success - én movie fra JSON vist!");
//}

// Kør testen
// testDisplayOneMovie();

// ========== DISPLAY ALL MOVIES ==========

function displayMovies(movieArray) {
  // Ryd container først
  movieListContainer.innerHTML = "";

  console.log(`🎬 Viser ${movieArray.length} movies...`);

  // Loop gennem alle movies
  for (const movie of movieArray) {
    displayMovie(movie);
  }

  console.log(`🎉 ${movieArray.length} movies vist!`);
}

// ========== LOAD MOVIES FROM JSON ==========

async function loadMovies() {
  console.log("🌐 Henter alle movies fra JSON...");

  // Hent data fra JSON fil
  const response = await fetch(
    "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json"
  );
  const moviesFromJSON = await response.json();

  console.log("📊 JSON data modtaget:", moviesFromJSON.length, "movies");

  // Vis alle movies
  displayMovies(moviesFromJSON);
}
// ===== APP INITIALISERING =====
document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadMovies(); // Hent og vis movies fra JSON
}
