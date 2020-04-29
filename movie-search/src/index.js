function readInputValue() {
    return document.querySelector('.search__inputField').value;
}

function getMovieImdbRating(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=9b67fc54`;
    return fetch(url).then(response => response.json());
   }

function getMovieInfo(title) {
    const url = `https://www.omdbapi.com/?s=${title}&apikey=9b67fc54`;
    return fetch(url).then(response => response.json());
}

function renderMovieCard(movie) {
    getMovieInfo(movie).then(data => {
        let movieCard = {
        title: data.Search[0].Title,
        year: data.Search[0].Year,
        poster: data.Search[0].Poster,
        imdbID: data.Search[0].imdbID,
       }
     
       getMovieImdbRating(movieCard.imdbID).then(data => {
        movieCard.linkToVideoGallery = `https://www.imdb.com/title/${movieCard.imdbID}/videogallery/`;
        movieCard.ratingImdb = data.imdbRating;
        
        console.log(movieCard);
        //let newEl = document.createElement('div');
        //newEl.className = movieCard.title;
        //document.querySelector('.search__results').append(newEl);
       });
    });

}

document.querySelector('.search__button').addEventListener('click', ()=> {
    let movieForSearch = readInputValue();
    renderMovieCard(movieForSearch);
});



