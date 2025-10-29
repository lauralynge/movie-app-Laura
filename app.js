"use strict";

// ========== DOM REFERENCE ==========
// Find movie list container (gør det én gang)
const movieListContainer = document.querySelector("#movie-list");

// ========== DISPLAY SINGLE MOVIE ========== (SLET????)
// Den SMARTE måde - funktion der både genererer HTML og tilføjer til DOM!
function displayMovie(movieObject) {
  // Konverter genre array til string
  const genreString = movieObject.genre.join(", ");
  const actorsString = movieObject.actors.join(", "); // Ny linje!

  const movieHTML = `
    <article class="movie-card" data-description="${movieObject.description}">
      <img src="${movieObject.image}" 
           alt="Poster of ${movieObject.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movieObject.title} <span class="movie-year">(${movieObject.year})</span></h3>
        <p class="movie-genre">${genreString}</p>
        <p class="movie-rating">⭐ ${movieObject.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${movieObject.director}</p>
        <p class="movie-actors"><strong>Stars:</strong> ${actorsString}</p>
      </div>
    </article>
  `;

  // Tilføj direkte til DOM
  movieListContainer.insertAdjacentHTML("beforeend", movieHTML);
  console.log(`${movieObject.title} tilføjet til DOM!`);
}

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
