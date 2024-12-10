import { API_URL } from "./config.js";

const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");
const favoritesContainer = document.getElementById("favorites-container");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function searchMovies(query) {
  try {
    const response = await fetch(`${API_URL}&s=${query}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else moviesContainer.innerHTML = `<p>${data.Error}</p>`;
  } catch (error) {
    moviesContainer.innerHTML = `<p>Error fetching movies. Please try again.${error}</p>`;
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((element) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.id = element.imdbID;
    movieCard.innerHTML = `
    <img class="icon" src=${
      favorites.includes(element.imdbID)
        ? "assets/star-full.png"
        : "assets/star.png"
    } />
    <img class="movie-poster" src=${element.Poster} alt=${element.Title} />
    <h3>${element.Title}</h3>
    `;
    movieCard.addEventListener("click", (e) => {
      if (e.target.classList.contains("icon")) {
        // faborite
        toggleFavorite(element.imdbID);
      } else {
        // Go to datails
        window.location.href = `details.html?id=${element.imdbID}`;
      }
    });
    moviesContainer.appendChild(movieCard);
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) favorites = favorites.filter((v) => v !== id);
  else favorites.push(id);

  updateFavorites();

  // Icon Update
  document.querySelectorAll(".movie-card").forEach((card) => {
    const icon = card.querySelector(".icon");
    const imdbID = card.id;

    if (icon && imdbID) {
      icon.src = favorites.includes(imdbID)
        ? "assets/star-full.png"
        : "assets/star.png";
    }
  });
}

async function updateFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  favoritesContainer.innerHTML = "";

  for (const id of favorites) {
    await fetchMovieById(id);
  }
}

async function fetchMovieById(id) {
  try {
    const response = await fetch(`${API_URL}&i=${id}`);
    const data = await response.json();

    if (data.Response === "True") {
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.id = data.imdbID;
      movieCard.innerHTML = `
      <img class="icon" src=${
        favorites.includes(data.imdbID)
          ? "assets/star-full.png"
          : "assets/star.png"
      } />
      <img class="movie-poster" src=${
        data.Poster !== "N/A" ? data.Poster : "assets/no-image.png"
      } alt=${data.Title} />
      <h3>${data.Title}</h3>
      `;
      movieCard.addEventListener("click", (e) => {
        if (e.target.classList.contains("icon")) {
          // faborite
          toggleFavorite(data.imdbID);
        } else {
          // Go to datails
          window.location.href = `details.html?id=${data.imdbID}`;
        }
      });
      favoritesContainer.appendChild(movieCard);
    } else favoritesContainer.innerHTML = `<p>${data.Error}</p>`;
  } catch (error) {
    favoritesContainer.innerHTML = `<p>Error fetching movies. Please try again.${error}</p>`;
  }
}

document.getElementById("search-btn").addEventListener("click", () => {
  const query = searchInput.value.trim();
  searchMovies(query);
});

updateFavorites();
