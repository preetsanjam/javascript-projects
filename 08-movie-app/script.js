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
    if(searchTerm.length > 0) {
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    } else {
        searchList.classList.add("hide-search-list")
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++) { // let idx = 0 → This creates the counter variable idx;  sets its starting value to 0        
                                                    // idx < movies.length → The loop will run as long as this condition is true
                                                    // idx++ → After each loop cycle, idx increases by 1
                                                    // Summary:
                                                    // Start at the first movie (index 0)
                                                    // Keep looping until the last movie
                                                    // Move forward one step at a time

        let movieListItem = document.createElement(`div`);
        movieListItem.dataset.id = movies[idx].imdbID;
    }
}
