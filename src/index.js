import Cards from './js/Cards';
import cardsActionA from './js/cardsData/cardsActionA';
import cardsMainPage from './js/cardsData/cardsMainPage';

//local storage - page, mode items init
localStorage.setItem('page', 'mainPage');
localStorage.setItem('mode', 'train');

//hamburgerIconHandler
function hamburgerIconHandler() {
  const HAMBURGER = document.querySelector('.hamburger');
  HAMBURGER.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.remove('hidden');
    let hamburgerContainer = document.querySelector('.hamburger-container');
    hamburgerContainer.classList.add(localStorage.getItem('mode'));
    
    switch(localStorage.getItem('mode')) {
      case 'train':
        hamburgerContainer.classList.replace('play', 'train');
        break;
      case 'play':
        hamburgerContainer.classList.replace('train', 'play');
        break;
    }
  });
}

//hamburgerCloseButtonHandler
function hamburgerCloseButtonHandler() {
  const CLOSEBUTTON = document.querySelector('.close-button');
  CLOSEBUTTON.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.add('hidden');
    console.log('close');
  });
}

//renderCards
function renderCards(mode) {
  const cardsWrapper = document.querySelector('.cards-wrapper');
  const cards = (new Cards('section-cards')).generateCards(cardsMainPage);
  cardsWrapper.append(cards);
  let els = document.querySelectorAll('.section-cards > *');
  els.forEach(e => e.classList.add(mode));
  switch(localStorage.getItem('mode')) {
    case 'train':
      els.forEach(e => e.classList.replace('play', 'train'));
      break;
    case 'play':
      els.forEach(e => e.classList.replace('train', 'play'));
      break;
  }
}

function switchHandler() {
  const MODESWITCH = document.querySelector('.modeSwitch');
  MODESWITCH.addEventListener('mouseup', (event) => {
  switch(localStorage.getItem('mode')) {
    case 'train':
      localStorage.setItem('mode', 'play');
      break;
    case 'play':
      localStorage.setItem('mode', 'train');
      break;
  }
  console.log('mode ' + localStorage.getItem('mode'));
  renderCards(localStorage.getItem('mode'));
  });
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



  window.onload = function () {
    renderCards(localStorage.getItem('mode'));
    hamburgerIconHandler();
    hamburgerCloseButtonHandler();
    switchHandler();

    

  };