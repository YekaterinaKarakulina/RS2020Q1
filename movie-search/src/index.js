
import MovieCard from './js/MovieCard';
import swiper from './js/swiper';

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

async function getMovieObject(title, i) {
    let data = await getMovieInfo(title);
    let movieObject = {
        title: data[i].Title,
        year: data[i].Year,
        poster: data[i].Poster,
        imdbID: data[i].imdbID,
       }
       movieObject.linkToVideoGallery = `https://www.imdb.com/title/${movieObject.imdbID}/videogallery/`;
    let data2 = await getMovieImdbRating(movieObject.imdbID);
    movieObject.imdbRating = data2.imdbRating;
    return movieObject;
}
    
function  createMovieCard(movieObject) {
    const card = new MovieCard(movieObject);
    let cardItem = card.createCardElement();
    return cardItem;
}

async function searchButtonHandler () {
    let movieForSearch = await readInputValue();
    let container = document.querySelector('.swiper-wrapper');
    for(let i=0; i<10; i++) {
        let movieObject = await getMovieObject(movieForSearch, i);
        swiper.appendSlide(createMovieCard(movieObject));
    }  
}

document.querySelector('.search__button').addEventListener('click', ()=> {   
   searchButtonHandler(); 
  
});







