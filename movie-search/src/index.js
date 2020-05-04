
import MovieCard from './js/MovieCard';
import swiper from './js/swiper';
import './sass/style.scss';
import '@babel/polyfill';

require('@babel/polyfill');

const apiKey = '5964eff4';

const searchResultsTitle = document.querySelector('.search__resultsTitle');
const searchResultsMessage = document.querySelector('.search__resultsMessage');

function setFocus() {
  document.querySelector('.search__inputField').focus();
}

function printSearchResults(movieForSearch) {
  if (document.querySelector('.search__inputField').getAttribute('bla') === 'true') {
    searchResultsTitle.textContent = 'Search results for: ';
    searchResultsMessage.textContent = movieForSearch;
  } else {
    searchResultsTitle.textContent = 'No results for: ';
    searchResultsMessage.textContent = movieForSearch;
  }
}

async function translate(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
}

function clearInputValue() {
  document.querySelector('.search__inputField').value = '';
  searchResultsTitle.textContent = '';
  searchResultsMessage.textContent = '';
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
  const data = await res.json();
  console.log(data);
  if (data.Response === 'False') {
    console.log(data.Error);
    document.querySelector('.search__inputField').setAttribute('bla', 'false');
  } else {
    document.querySelector('.search__inputField').setAttribute('bla', 'true');
    return data.Search;
  }
}

async function createMovieObject(data, i) {
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

async function renderRequestResults(data) {
  const slides = [];
  if (data) {
    for (let i = 0; i < data.length; i += 1) {
      const movieObject = await createMovieObject(data, i);
      slides.push(createMovieCard(movieObject));
    }
  }
  slides.forEach((slide) => {
    swiper.appendSlide(slide);
  });
}

async function firstRequest(movieForSearch) {
  document.querySelector('.search__inputField').setAttribute('bla', 'true');
  printSearchResults(movieForSearch);
  const data = await getMovieInfo(movieForSearch);
  await renderRequestResults(data);
}

async function searchButtonHandler() {
  const movieForSearch = await readInputValue();
  const data = await getMovieInfo(movieForSearch);
  printSearchResults(movieForSearch);
  if (document.querySelector('.search__inputField').getAttribute('bla') === 'true') {
    swiper.removeAllSlides();
    renderRequestResults(data);
  }
}

const firstRequestValue = 'Home alone';
setFocus();
firstRequest(firstRequestValue);

document.querySelector('.search__button').addEventListener('click', () => {
  searchButtonHandler();
});

document.querySelector('.icon__delete').addEventListener('click', () => {
  console.log('del');
  clearInputValue();
});
