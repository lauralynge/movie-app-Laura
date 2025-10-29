"use strict";

// #0: Listen for page load
window.addEventListener("load", initApp);

let allMovies = []; // Global array to hold all movies

// #1: Initialize the app
function initApp() {
  console.log("initApp: app.js is running 🎉");
  getMovies();
  document
    .querySelector("#search-input")
    .addEventListener("input", filterMovies); // ← Ændret!
  document
    .querySelector("#genre-select")
    .addEventListener("change", filterMovies); // ← Ny!
  document
    .querySelector("#sort-select")
    .addEventListener("change", filterMovies);

  // NYE: Kun år felter
  document.querySelector("#year-from").addEventListener("input", filterMovies);
  document.querySelector("#year-to").addEventListener("input", filterMovies);

  // Rating field event listeners // Tilføj EFTER år listeners
  document
    .querySelector("#rating-from")
    .addEventListener("input", filterMovies);
  document.querySelector("#rating-to").addEventListener("input", filterMovies);

  // Clear filters knap - TILFØJ TIL SIDST
  document
    .querySelector("#clear-filters")
    .addEventListener("click", clearAllFilters);
}

// #2: Fetch movies from JSON and display them
async function getMovies() {
  console.log("🌐 Henter alle movies fra JSON...");
  const response = await fetch(
    "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json"
  );
  allMovies = await response.json();
  console.log(`📊 JSON data modtaget: ${allMovies.length} movies`);
  populateGenreDropdown(); // Udfyld dropdown med genres <-----
  displayMovies(allMovies);
}

// #3: Render all movies in the grid
function displayMovies(movies) {
  console.log(`🎬 Viser ${movies.length} movies`);
  // Nulstil #movie-list HTML'en
  document.querySelector("#movie-list").innerHTML = "";
  // Gennemløb alle movies og kør displayMovie-funktionen for hver movie
  for (const movie of movies) {
    displayMovie(movie);
  }
}

// #4: Render a single movie card // ========== OPDATERER displayMovie MED CLICK EVENTS ==========
function displayMovie(movie) {
  const movieList = document.querySelector("#movie-list");

  const movieHTML = `
    <article class="movie-card">
      <img src="${movie.image}" 
           alt="Poster of ${movie.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movie.title} <span class="movie-year">(${movie.year})</span></h3>
        <p class="movie-genre">${movie.genre.join(", ")}</p>
        <p class="movie-rating">⭐ ${movie.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${
          movie.director
        }</p>
      </div>
    </article>
  `;

  movieList.insertAdjacentHTML("beforeend", movieHTML);

  // Tilføj click event til den nye card
  const newCard = movieList.lastElementChild;
  newCard.addEventListener("click", function () {
    console.log(`🎬 Klik på: "${movie.title}"`);
    showMovieModal(movie); // ÆNDRET: Fra showMovieDetails til showMovieModal
  });

  // Tilføj keyboard support
  newCard.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showMovieModal(movie); // ÆNDRET: Fra showMovieDetails til showMovieModal
    }
  });
}

// #5: Kombineret søgning, genre og sortering
function filterMovies() {
  const searchValue = document
    .querySelector("#search-input")
    .value.toLowerCase();
  const genreValue = document.querySelector("#genre-select").value;
  const sortValue = document.querySelector("#sort-select").value; // ← NY linje!

  // NYE år variable - TILFØJ KUN DISSE TO LINJER
  const yearFrom = Number(document.querySelector("#year-from").value) || 0;
  const yearTo = Number(document.querySelector("#year-to").value) || 9999;

  // NYE rating variable - TILFØJ EFTER år variablerne
  const ratingFrom = Number(document.querySelector("#rating-from").value) || 0;
  const ratingTo = Number(document.querySelector("#rating-to").value) || 10;

  console.log("Rating filter:", ratingFrom, "til", ratingTo);

  // Start med alle movies - vi vil altid gerne begynde med hele datasættet
  let filteredMovies = allMovies;

  // TRIN 1: Filtrer på søgetekst (fra input-felt)
  if (searchValue) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchValue);
    });
  }

  // TRIN 2: Filter på genre (fra dropdown)
  if (genreValue !== "all") {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.genre.includes(genreValue);
    });
  }

  // ÅR RANGE FILTER // Tilføj EFTER genre filter, FØR sortering
  if (yearFrom > 0 || yearTo < 9999) {
    console.log("Anvender år filter:", yearFrom, "-", yearTo);
    const before = filteredMovies.length;

    filteredMovies = filteredMovies.filter((movie) => {
      return movie.year >= yearFrom && movie.year <= yearTo;
    });

    console.log("År filter:", before, "→", filteredMovies.length, "film");
  } else {
    console.log("Ingen år filter (alle år)");
  }

  // RATING RANGE FILTER - TILFØJ EFTER år filter
  if (ratingFrom > 0 || ratingTo < 10) {
    console.log("Anvender rating filter:", ratingFrom, "-", ratingTo);
    const before = filteredMovies.length;

    filteredMovies = filteredMovies.filter((movie) => {
      return movie.rating >= ratingFrom && movie.rating <= ratingTo;
    });

    console.log("Rating filter:", before, "→", filteredMovies.length, "film");
  } else {
    console.log("Ingen rating filter (alle ratings)");
  }
  // TRIN 3 (SORTERING): Sorter resultater (fra dropdown)   (altid til sidst)
  if (sortValue === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title)); // A-Å
  } else if (sortValue === "year") {
    filteredMovies.sort((a, b) => b.year - a.year); // Nyeste først
  } else if (sortValue === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating); // Højeste først
  }

  console.log(`✅ FINAL RESULTAT: ${filteredMovies.length} movies`);
  console.log("🔄 ===== FILTRERING FÆRDIG =====\n");

  displayMovies(filteredMovies); // Vis de filtrerede og sorterede movies
}

// #6: Udfyld genre-dropdown med alle unikke genrer
function populateGenreDropdown() {
  const genreSelect = document.querySelector("#genre-select");
  const genres = new Set();

  for (const movie of allMovies) {
    for (const genre of movie.genre) {
      genres.add(genre);
    }
  }

  // Fjern gamle options undtagen 'Alle genrer'
  genreSelect.innerHTML = '<option value="all">Alle genrer</option>';

  const sortedGenres = Array.from(genres).sort();
  for (const genre of sortedGenres) {
    genreSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${genre}</option>`
    );
  }
}

// NEDENSTÅENDE ÆNDRET FRA ALERT TIL MODAL DIALOG
// #7: Vis movie detaljer (midlertidig løsning med alert)
// function showMovieDetails(movie) {
//  console.log("📊 Viser detaljer for:", movie.title);

// Vis i alert (midlertidig løsning)
//  const movieInfo = `🎬 ${movie.title} (${movie.year})
// 🎭 ${movie.genre.join(", ")}
// ⭐ Rating: ${movie.rating}
// 🎯 Instruktør: ${movie.director}
// 👥 Skuespillere: ${movie.actors.join(", ")}

// 📝 ${movie.description}`;

// alert(movieInfo);
//}

// #8: Vis movie i modal dialog
function showMovieModal(movie) {
  console.log("🎭 Åbner modal for:", movie.title);

  // Byg HTML struktur dynamisk
  const dialogContent = document.querySelector("#dialog-content");
  dialogContent.innerHTML = `
    <img src="${movie.image}" alt="Poster af ${
    movie.title
  }" class="movie-poster">
    <div class="dialog-details">
      <h2>${movie.title} <span class="movie-year">(${movie.year})</span></h2>
      <p class="movie-genre">${movie.genre.join(", ")}</p>
      <p class="movie-rating">⭐ ${movie.rating}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Actors:</strong> ${movie.actors.join(", ")}</p>
      <p class="movie-description">${movie.description}</p>
    </div>
  `;

  // Åbn modalen
  document.querySelector("#movie-dialog").showModal();
}

// Ny funktion: Ryd alle filtre
function clearAllFilters() {
  console.log("🗑️ Rydder alle filtre");

  // Ryd søgning og dropdown felter
  document.querySelector("#search-input").value = "";
  document.querySelector("#genre-select").value = "all";
  document.querySelector("#sort-select").value = "none";

  // Ryd de nye range felter
  document.querySelector("#year-from").value = "";
  document.querySelector("#year-to").value = "";
  document.querySelector("#rating-from").value = "";
  document.querySelector("#rating-to").value = "";

  // Kør filtrering igen (viser alle film)
  filterMovies();
}
