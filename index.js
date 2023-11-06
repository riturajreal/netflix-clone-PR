//Constants
const apiKey = '74f2221fa8a1453febeaf5c95366b395';
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
    fetchAllCategories : `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
}


// Boots up the app
function init(){
    fetchAndBuildAllSections();

}

//category banaega
function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=> res.json())
    .then(res=> {
        const categories = res.genres;
        if(Array.isArray(categories) && categories.length){
            categories.forEach(category => {
                fetchAndBuildMovieSection(apiPaths.fetchMoviesList(category.id),category);
            });
        }

        // console.table(movies);
    })
    .catch(err => console.log(err));

}


//
function fetchAndBuildMovieSection(fetchUrl, category){
    console.log(fetchUrl,category);

    fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        // console.table(res.results);
        const movies = res.results;

        if(Array.isArray(movies)&& movies.length) {
            buildMoviesSection(movies, category.name);
        }
    })
    .catch(err=>console.log(err));
}

function buildMoviesSection(list, categoryName){
        console.log(list, categoryName);

        const moviesCont = document.getElementById('movies-cont');

       const moviesListHTML =  list.map(item=> {
            return `
            <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
            `;
        }).join('');

        console.log(moviesListHTML);

        const moviesSectionHTML = `
                <h2 class="movie-section-heading">${categoryName} <span class=explore-nudge>Explore now </span></h2>
                <div class="movies-row">
                    ${moviesListHTML}
                </div>
            `

        console.log(moviesSectionHTML);

        const div = document.createElement('div');
        div.className = "movies-section";
        div.innerHTML = moviesSectionHTML;

        //append
        moviesCont.append(div);

}

window.addEventListener('load', function(){
    init();
});