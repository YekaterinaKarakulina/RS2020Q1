import Cards from './js/Cards';
import cardsMainPage from './js/cardsData/cardsMainPage';
import cardsActionA from './js/cardsData/cardsActionA';
import cardsActionB from './js/cardsData/cardsActionB';
import cardsAnimalA from './js/cardsData/cardsAnimalA';
import cardsAnimalB from './js/cardsData/cardsAnimalB';
import cardsClothes from './js/cardsData/cardsClothes';
import cardsEmotions from './js/cardsData/cardsEmotions';

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


function cardsHandler() {
  const cardsWrapper = document.querySelector('.cards-wrapper');
  
  document.querySelector('.cards-wrapper').addEventListener('click', (event) => {
    console.log(event.target);
    let title = '';
    if(event.target.classList.contains('card')) {
      console.log('yes, contain');
      console.log(event.target.children);
      for(let i=0; i<event.target.children.length; i++) {
        if(event.target.children[i].classList.contains('section-title')) {
          title = event.target.children[i].innerHTML;

        }
      }
      console.log(title);
      cardsWrapper.innerHTML = '';
      let cards = [];
      switch(title) {
        case 'Action (set A)':
          cards = (new Cards('train-cards')).generateTrainCards(cardsActionA);
          break;
        case 'Action (set B)':
          cards = (new Cards('train-cards')).generateTrainCards(cardsActionB);
          break;
        case 'Animal (set A)':
          cards = (new Cards('train-cards')).generateTrainCards(cardsAnimalA);
          break;
        case 'Animal (set B)':
          cards = (new Cards('train-cards')).generateTrainCards(cardsAnimalB);
          break;
        case 'Clothes':
          cards = (new Cards('train-cards')).generateTrainCards(cardsClothes);
          break;
        case 'Emotions':
          cards = (new Cards('train-cards')).generateTrainCards(cardsEmotions);
          break;
  
      }
      cardsWrapper.append(cards);

    }
    
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
    cardsHandler();
    

  };