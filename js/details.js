const API_KEY = "8f7e3c01";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const movieDetails = document.getElementById("movie-details");
const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieOverview = document.getElementById("movie-overview");
const movieRating = document.getElementById("movie-rating");
const movieActors = document.getElementById("movie-actors");

async function searchMovie() {
  try {
    const response = await fetch(`${API_URL}&i=${movieId}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovieDetails(data);
    }
  } catch (error) {
    movieDetails.innerHTML = `<p>Error fetching movies. Please ry again.${error}</p>`;
  }
}

function displayMovieDetails(movie) {
  moviePoster.src =
    movie.Poster !== "N/A" ? movie.Poster : "assets/no-image.png";
  movieTitle.textContent = movie.Title;
  movieOverview.textContent = movie.Plot || "No overview available.";
  movieRating.textContent =
    movie.imdbRating !== "N/A" ? `${movie.imdbRating}/10` : "N/A";
  movieActors.textContent = movie.Actors || "No actors listed.";
}

if (movieId) searchMovie();
