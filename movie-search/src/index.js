import MovieCard from './js/MovieCard';
import swiper from './js/swiper';
import './sass/style.scss';
import '@babel/polyfill';

require('@babel/polyfill');

const apiKey = '5964eff4';

const searchResultsTitle = document.querySelector('.search__resultsTitle');
const searchResultsMessage = document.querySelector('.search__resultsMessage');
const searchInputField = document.querySelector('.search__inputField');
const searchErrorMessage = document.querySelector('.search__errorMessage');

let sMovieForSearch = 'Home alone';
let iPageNumber = 1;
let bIsLoadingPages = false;

function renderSearchResults(resultsTitle, movieTitle, errorMessage) {
  searchResultsTitle.textContent = resultsTitle;
  searchResultsMessage.textContent = movieTitle;
  searchErrorMessage.textContent = errorMessage;
}

function printSearchResults(movieTitle, data, errorMessage) {
  if (data.Response === 'True') {
    renderSearchResults('Showing results for: ', movieTitle, '');
  } else if (errorMessage) {
    renderSearchResults('', '', errorMessage);
  } else {
    switch (data.Error) {
      case 'Movie not found!':
        renderSearchResults('No results for: ', movieTitle, '');
        break;
      default:
        renderSearchResults('', '', data.Error);
        break;
    }
  }
}

async function translate(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
}

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
    console.log('typing error');
    printSearchResults('', '', 'Typing error!');
    inputValue = undefined;
  }
  return inputValue;
}

async function getMovieImdbRating(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getMovieInfo(title, page) {
  const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  printSearchResults(title, data);
  return data;
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
  document.querySelector('.spinner').classList.add('hidden');
  slides.forEach((slide) => {
    swiper.appendSlide(slide);
  });
}

async function loadNextPages() {
  bIsLoadingPages = true;
  const array = document.querySelector('.swiper-wrapper').children;
  console.log(array.length);
  let activeElementPosition;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].classList.contains('swiper-slide-active')) {
      activeElementPosition = i;
    }
  }
  if (activeElementPosition > array.length - 7) {
    console.log('need To load');
    iPageNumber += 1;
    console.log(`sMovieForSearch${sMovieForSearch}iPageNumber${iPageNumber}${bIsLoadingPages}`);
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
  bIsLoadingPages = false;
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
