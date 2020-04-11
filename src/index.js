import Cards from './js/Cards';
import cardsActionA from './js/cardsData/cardsActionA';

const cardsWrapper = document.querySelector('.cardsWrapper');

const cards = (new Cards('sectionCards')).generateSectionCards(cardsActionA);
cardsWrapper.append(cards);

  //cardsWrapper.append((new Cards('categoryCards').generateCategoryCards(cardsMainPage)));


/*
if (this.mode === 'train') {
    modeSwitch.classList.add('train');
  } else if (this.mode === 'play') {
    modeSwitch.classList.add('play');
  }*/