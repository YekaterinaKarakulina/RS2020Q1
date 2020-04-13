import Cards from './js/Cards';
import cardsActionA from './js/cardsData/cardsActionA';
import cardsMainPage from './js/cardsData/cardsMainPage';

localStorage.setItem('page', 'mainPage');
  localStorage.setItem('mode', 'play');

function hamburgerIconHandler() {
  const HAMBURGER = document.querySelector('.hamburger');
  HAMBURGER.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.remove('hidden');
    document.querySelector('.hamburger-container').classList.add(localStorage.getItem('mode'));
  });
}

function hamburgerCloseButtonHandler() {
  const CLOSEBUTTON = document.querySelector('.close-button');
  CLOSEBUTTON.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.add('hidden');
    console.log('close');
  });
}

function pagesHandler() {
  let mode = localStorage.getItem('mode');
  const cardsWrapper = document.querySelector('.cards-wrapper');
  const cards = (new Cards('section-cards')).generateCards(cardsMainPage);
  cardsWrapper.append(cards);
  const els = document.querySelectorAll('.section-cards > *');
  els.forEach(e => e.classList.add(mode));
     

}

/*
const mode = 'lay';
const cardsWrapper = document.querySelector('.cards-wrapper');
if (mode === 'train') {
  const cards = (new Cards('train-cards')).generateTrainCards(cardsActionA);
  cardsWrapper.append(cards);
} else if (mode === 'play') {
  const cards = (new Cards('play-cards')).generatePlayCards(cardsActionA);
  cardsWrapper.append(cards);
}
*/

/*
if (this.mode === 'train') {
    modeSwitch.classList.add('train');
  } else if (this.mode === 'play') {
    modeSwitch.classList.add('play');
  } */


  window.onload = function () {
    hamburgerIconHandler();
    hamburgerCloseButtonHandler();
    pagesHandler();


  };