import MovieCard from './js/MovieCard';
import swiper from './js/swiper';
import './sass/style.scss';
import '@babel/polyfill';

import { translate, getMovieImdbRating, getMovieInfo } from './js/client';
import printSearchResults from './js/searchResults';
import {
  searchResultsTitle, searchResultsMessage, searchErrorMessage, searchInputField, keyboardKeys,
} from './js/constants';

import Keyboard from './js/Keyboard';
import { clearKeyboardContainer, keyboardHandler, mouseHandler } from './js/virtualKeyboard';

const iRemainSlides = 8;
let sMovieForSearch = 'Home alone';
let iPageNumber = 1;

function clearInputValue() {
  searchInputField.value = '';
  searchResultsTitle.textContent = '';
  searchResultsMessage.textContent = '';
  searchErrorMessage.textContent = '';
  iPageNumber = 1;
}

async function readInputValue() {
  let inputValue = (searchInputField.value).toLowerCase();
  if (inputValue.match(/^[а-яА-ЯёЁ]/g)) {
    inputValue = await translate(inputValue);
  } else if (inputValue.match(/[!@#$%^&*()_+=]/g)) {
    printSearchResults('', '', 'Typing error!');
    inputValue = undefined;
  }
  return inputValue;
}

async function createMovieObject(data, i) {
  const movieObject = {
    title: data[i].Title,
    year: data[i].Year,
    poster: data[i].Poster,
    imdbID: data[i].imdbID,
  };
  movieObject.linkToVideoGallery = `https://www.imdb.com/title/${movieObject.imdbID}/videogallery/`;
  const movieRating = await getMovieImdbRating(movieObject.imdbID);
  movieObject.imdbRating = movieRating.imdbRating;
  return movieObject;
}

function createMovieCard(movieObject) {
  const card = new MovieCard(movieObject);
  const cardItem = card.createCardElement();
  return cardItem;
}

async function renderRequestResults(data) {
  const slides = [];
  const promises = [];
  if (data) {
    data.forEach((value, index) => {
      promises.push(createMovieObject(data, index));
    });
    const movieObjects = await Promise.all(promises);
    if (movieObjects) {
      movieObjects.forEach((movie) => {
        slides.push(createMovieCard(movie));
      });
    }
  }
  document.querySelector('.spinner').classList.add('hidden');
  slides.forEach((slide) => {
    swiper.appendSlide(slide);
  });
}

async function loadNextPages() {
  if (swiper.activeIndex > swiper.slides.length - iRemainSlides) {
    document.querySelector('.spinner').classList.remove('hidden');
    iPageNumber += 1;
    if (sMovieForSearch) {
      try {
        const data = await getMovieInfo(sMovieForSearch, iPageNumber);
        if (data.Response === 'True') {
          renderRequestResults(data.Search);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

async function firstRequest(movieForSearch) {
  searchInputField.focus();
  const data = await getMovieInfo(movieForSearch, iPageNumber);
  await renderRequestResults(data.Search);
}

async function searchButtonHandler() {
  iPageNumber = 1;
  sMovieForSearch = await readInputValue();
  if (sMovieForSearch) {
    try {
      const data = await getMovieInfo(sMovieForSearch, iPageNumber);
      if (data.Response === 'True') {
        document.querySelector('.spinner').classList.remove('hidden');
        swiper.removeAllSlides();
        renderRequestResults(data.Search);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const keyboard = new Keyboard('keyboard');
document.querySelector('.icon__keyboard').addEventListener('click', () => {
  keyboardKeys.classList.toggle('hidden');
  searchInputField.focus();
  clearKeyboardContainer();
  keyboard.renderKeys(sessionStorage.getItem('isLanguageEng'), false); // isCapsLockOn - false
});

firstRequest(sMovieForSearch);
keyboardHandler(keyboard);
mouseHandler(keyboard);

document.addEventListener('click', (event) => {
  const { classList } = event.target;
  if (classList.contains('search__button')) {
    searchButtonHandler();
    keyboardKeys.classList.add('hidden');
  } else if (classList.contains('icon__delete')) {
    clearInputValue();
  } else if (classList.contains('swiper-button-next')) {
    loadNextPages();
  } else if (classList.contains('swiper-pagination-bullet')) {
    loadNextPages();
  } else if (classList.contains('Enter')) {
    searchButtonHandler();
    keyboardKeys.classList.add('hidden');
  }
});

document.querySelector('.swiper-container').addEventListener('touchstart', () => {
  loadNextPages();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    keyboardKeys.classList.add('hidden');
    searchButtonHandler();
  }
});
