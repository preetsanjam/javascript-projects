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
    if (data.Response === "True") displayMovieList(data.Search)
        else displayMovieList([]) 
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
    for(let idx = 0; idx < movies.length; idx++) { // let idx = 0 → This creates the counter variable idx; sets its starting value to 0        
                                                    // idx < movies.length → The loop will run as long as this condition is true
                                                    // idx++ → After each loop cycle, idx increases by 1
                                                    // Summary:
                                                    // Start at the first movie (index 0)
                                                    // Keep looping until the last movie
                                                    // Move forward one step at a time

        let movieListItem = document.createElement(`div`);
        movieListItem.dataset.id = movies[idx].imdbID; // Setting movie id in data-id
        movieListItem.classList.add("search-list-item");
        if(movies[idx].Poster !== "N/A")
            moviePoster = movies[idx].Poster; 
        else
            moviePoster = "image_not_found.png";
        
        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
             <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem); 
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie => {
        movie.addEventListener("click", async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add("hide-search-list");
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=50d32271`)
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${(details.Poster != "N/A" ? details.Poster : "image_not_found.png")}" alt="movie-poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Rating: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Actors: </b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `
}

window.addEventListener("click", (event) => {
    if(event.target.className != "form-control")
        searchList.classList.add("hide-search-list");
});