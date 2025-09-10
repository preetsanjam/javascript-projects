// Titles: https://www.omdbapi.com/?s=thor&page=1&apikey=50d32271
// Details: http://www.omdbapi.com/?i=tt3896198&apikey=50d32271

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// Load movie titles from API
async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=50d32271`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if (data.Response === "True") displayMovieList(data.Search); 
}

function findMovies() {
    // trim() removes whitespace (spaces, tabs, line breaks) from the beginning and end of a string
    let searchTerm = (movieSearchBox.value).trim(); 
    console.log(searchTerm);
}
