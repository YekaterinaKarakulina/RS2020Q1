
import MovieCard from './js/MovieCard';
import swiper from './js/swiper';
import './sass/style.scss';
import '@babel/polyfill';

require('@babel/polyfill');

const apiKey = '5964eff4';

async function translate(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
}

async function readInputValue() {
  const inputValue = (document.querySelector('.search__inputField').value).toLowerCase();
  if (inputValue.match(/[а-яА-ЯёЁ]/g)) {
    const translation = await translate(inputValue);
    console.log(`translation ${translation}`);
    return translation;
  }
  return inputValue;
}

async function getMovieImdbRating(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getMovieInfo(title) {
  const url = `https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`;
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  console.log(`data.totalResults: ${data.totalResults}`);
  console.log(data);
  console.log(data.Search);
  return data.Search;
}

async function getMovieObject(data, i) {
  const movieObject = {
    title: data[i].Title,
    year: data[i].Year,
    poster: data[i].Poster,
    imdbID: data[i].imdbID,
  };
  movieObject.linkToVideoGallery = `https://www.imdb.com/title/${movieObject.imdbID}/videogallery/`;
  const data2 = await getMovieImdbRating(movieObject.imdbID);
  movieObject.imdbRating = data2.imdbRating;
  return movieObject;
}

function createMovieCard(movieObject) {
  const card = new MovieCard(movieObject);
  const cardItem = card.createCardElement();
  return cardItem;
}

async function renderRequestResults(movieForSearch) {
  const data = await getMovieInfo(movieForSearch);
  // console.log(data.length);
  for (let i = 0; i < data.length; i += 1) {
    const movieObject = await getMovieObject(data, i);
    swiper.appendSlide(createMovieCard(movieObject));
  }
}

async function searchButtonHandler() {
  const movieForSearch = await readInputValue();
  swiper.removeAllSlides();
  await renderRequestResults(movieForSearch);
}

async function firstRequest(movieForSearch) {
  await renderRequestResults(movieForSearch);
}

function setFocus() {
  document.querySelector('.search__inputField').focus();
}

setFocus();
firstRequest('home alone');

document.querySelector('.search__button').addEventListener('click', () => {
  searchButtonHandler();
});
