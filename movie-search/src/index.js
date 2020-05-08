import MovieCard from './js/MovieCard';
import swiper from './js/swiper';
import './sass/style.scss';
import '@babel/polyfill';

import { translate, getMovieImdbRating, getMovieInfo } from './js/client';
import printSearchResults from './js/searchResults';
import {
  searchResultsTitle, searchResultsMessage, searchErrorMessage, searchInputField,
} from './js/constants';

import Keyboard from './js/Keyboard';

const iRemainSlides = 7;
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
      // eslint-disable-next-line no-await-in-loop
      const movieObject = await createMovieObject(data, i);
      slides.push(createMovieCard(movieObject));
    }
  }
  document.querySelector('.spinner').classList.add('hidden');
  slides.forEach((slide) => {
    swiper.appendSlide(slide);
  });
}

async function loadNextPages() {
  const array = document.querySelector('.swiper-wrapper').children;
  let activeElementPosition;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].classList.contains('swiper-slide-active')) {
      activeElementPosition = i;
    }
  }
  if (activeElementPosition > array.length - iRemainSlides) {
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

firstRequest(sMovieForSearch);

document.querySelector('.search__button').addEventListener('click', () => {
  searchButtonHandler();
});

document.querySelector('.icon__delete').addEventListener('click', () => {
  clearInputValue();
});

document.querySelector('.swiper-button-next').addEventListener('click', () => {
  loadNextPages();
});

document.querySelector('.swiper-container').addEventListener('touchstart', () => {
  loadNextPages();
});

document.querySelector('.swiper-pagination').addEventListener('click', (event) => {
  if (event.target.classList.contains('swiper-pagination-bullet')) {
    loadNextPages();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    searchButtonHandler();
  }
});

///

sessionStorage.setItem('isLanguageEng', sessionStorage.getItem('isLanguageEng'));

 const keyboard = new Keyboard('keyboard');
// keyboard.generateKeyboardContainer();

const data = sessionStorage.getItem('isLanguageEng'); // if data == true - eng, else ru
keyboard.renderKeys(data, false); // isCapsLockOn - false
