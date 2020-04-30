
import MovieCard from './js/MovieCard';

async function translate(word) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text[0];
}

async function readInputValue() {
    let inputValue = (document.querySelector('.search__inputField').value).toLowerCase();
    if(inputValue.match(/[а-яА-ЯёЁ]/g)) {
         let translation = await translate(inputValue);
         return translation;  
    } else {
        return inputValue;  
    }     
}

async function getMovieImdbRating(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=9b67fc54`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function getMovieInfo(title) {
    const url = `https://www.omdbapi.com/?s=${title}&apikey=9b67fc54`;
    const res = await fetch(url);
    const data = await res.json();
    return data.Search;
}

async function getMovieObject(title) {
    let data = await getMovieInfo(title);
    let movieObject = {
        title: data[0].Title,
        year: data[0].Year,
        poster: data[0].Poster,
        imdbID: data[0].imdbID,
       }
       movieObject.linkToVideoGallery = `https://www.imdb.com/title/${movieObject.imdbID}/videogallery/`;
    let data2 = await getMovieImdbRating(movieObject.imdbID);
    movieObject.ratingImdb = data2.imdbRating;
    return movieObject;
}
    
function  renderMovieCard(movieObject) {
    let container = document.querySelector('.search__results');
    const card = new MovieCard(movieObject);
    let cardItem = card.createCardElement();
    console.log(cardItem);
   // container.append(renderMovieCard(movieForSearch));  
}

async function searchButtonHandler () {
    let movieForSearch = await readInputValue();
    console.log(movieForSearch);
    let movieObject = await getMovieObject(movieForSearch);
    renderMovieCard(movieObject);
}

document.querySelector('.search__button').addEventListener('click', ()=> {   
   searchButtonHandler(); 
  
});







