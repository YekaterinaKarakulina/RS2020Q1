import Cards from './js/Cards';
import cardsActionA from './js/cardsData/cardsActionA';
import cardsMainPage from './js/cardsData/cardsMainPage';

window.onload = function() {
  hamburgerHandler();

}


function hamburgerHandler() {
  const HAMBURGER = document.querySelector('.hamburger');

  HAMBURGER.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.remove('hidden');
  });
}

let mode = 'play';
const cardsWrapper = document.querySelector('.cards-wrapper');

//const cards = (new Cards('section-cards')).generateCards(cardsMainPage);
//cardsWrapper.append(cards);

if(mode === 'train') {
  const cards = (new Cards('train-cards')).generateTrainCards(cardsActionA);
  cardsWrapper.append(cards);
} else if(mode === 'play') {
  const cards = (new Cards('play-cards')).generatePlayCards(cardsActionA);
  cardsWrapper.append(cards);
}


/*
if (this.mode === 'train') {
    modeSwitch.classList.add('train');
  } else if (this.mode === 'play') {
    modeSwitch.classList.add('play');
  }*/