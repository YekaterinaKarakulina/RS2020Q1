import Cards from './js/Cards';
import cardsMainPage from './js/cardsData/cardsMainPage';
import cardsActionA from './js/cardsData/cardsActionA';
import cardsActionB from './js/cardsData/cardsActionB';
import cardsAnimalA from './js/cardsData/cardsAnimalA';
import cardsAnimalB from './js/cardsData/cardsAnimalB';
import cardsClothes from './js/cardsData/cardsClothes';
import cardsEmotions from './js/cardsData/cardsEmotions';


//local storage - page, mode items init

localStorage.setItem('mode', 'train');
localStorage.setItem('page', 'main');   


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
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.add('hidden');
    console.log('close');
  });
}

//renderCards
function renderCards(mode, page, categoryTitle) {
  console.log('render cards, mode = ' + mode + ' page = ' + page + ' categoryTitle = ' + categoryTitle);
  const cardsWrapper = document.querySelector('.cards-wrapper');
  
  if(page === 'main') {
    const cards = (new Cards('section-cards')).generateCards(cardsMainPage);
    cardsWrapper.innerHTML = '';
    cardsWrapper.append(cards);
    let els = document.querySelectorAll('.section-cards > *');
    els.forEach(e => e.classList.add(mode));
  }

  else  if(page === 'category') {
    cardsWrapper.innerHTML = '';
    let cards = [];
    if(localStorage.getItem('mode') === 'train') {
      switch(categoryTitle) {
        case 'Action (set A)':
            cards = (new Cards('train-cards')).generateTrainCards(cardsActionA);
            break;
        case 'Action (set B)':
          cards = (new Cards('train-cards')).generateTrainCards(cardsActionB);
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

    } else if(localStorage.getItem('mode') === 'play') {
      switch(categoryTitle) {
        case 'Action (set A)':
          cards = (new Cards('play-cards')).generatePlayCards(cardsActionA);
          break;
        case 'Action (set B)':
          cards = (new Cards('play-cards')).generatePlayCards(cardsActionB);
          break;
        case 'Action (set B)':
          cards = (new Cards('play-cards')).generatePlayCards(cardsActionB);
          break;
        case 'Animal (set A)':
          cards = (new Cards('play-cards')).generatePlayCards(cardsAnimalA);
          break;
        case 'Animal (set B)':
          cards = (new Cards('play-cards')).generatePlayCards(cardsAnimalB);
          break;
        case 'Clothes':
          cards = (new Cards('play-cards')).generatePlayCards(cardsClothes);
          break;
        case 'Emotions':
          cards = (new Cards('play-cards')).generatePlayCards(cardsEmotions);
          break;
      }
    }
    cardsWrapper.append(cards);
  }
}



function changeSectionCardsMode() {
  console.log('just change section cards');
  let els = document.querySelectorAll('.section-cards > *');
    els.forEach(e => e.classList.add(localStorage.getItem('mode')));
    switch(localStorage.getItem('mode')) {
      case 'train':
        els.forEach(e => e.classList.replace('play', 'train'));
        break;
      case 'play':
        els.forEach(e => e.classList.replace('train', 'play'));
        break;
    }
}

function changeTrainPlayCardsMode() {
  console.log('just change train cards');
  const cardsContainer = document.querySelector('.cards-wrapper').firstElementChild;
  let cardDescription = document.querySelectorAll('.card-description');
  let els = [];
  switch(localStorage.getItem('mode')) {
    case 'train':
      cardsContainer.classList.replace('play-cards', 'train-cards');
      els = document.querySelectorAll('.train-cards > *');
      els.forEach(e => e.classList.replace('play-card', 'train-card'));
      cardDescription.forEach(e => e.classList.remove('hidden'));
      break;
    case 'play':
      cardsContainer.classList.replace('train-cards', 'play-cards');
      els = document.querySelectorAll('.play-cards > *');
      els.forEach(e => e.classList.replace('train-card', 'play-card'));
      cardDescription.forEach(e => e.classList.add('hidden'));
      break;
  }
}


function cardsHandler() {
  document.querySelector('.cards-wrapper').addEventListener('click', (event) => {
    let title = '';
    //console.log('localStorage.getItem(page) ' + localStorage.getItem('page'));
    if(localStorage.getItem('page') === 'main') {
      localStorage.setItem('page' , 'category');
      if(event.target.classList.contains('card')) { 
        for(let i=0; i<event.target.children.length; i++) {
          if(event.target.children[i].classList.contains('section-title')) {
            title = event.target.children[i].innerHTML;
          }
        }
      } else if(event.target.parentNode.classList.contains('card')) { 
        for(let i=0; i<event.target.parentNode.children.length; i++) {
          if(event.target.parentNode.children[i].classList.contains('section-title')) {
            title = event.target.parentNode.children[i].innerHTML;
          }
        }
      }
      console.log('title ' + title);
      localStorage.setItem('category', title); 
      renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
    } 
    else if(localStorage.getItem('page') === 'category') {
      if(event.target.classList.contains('card-image')) {
        event.target.nextSibling.play();
        console.log('sound');
      }
    }
  });
}




function switchHandler() {
  const modeSwitch = document.querySelector('.modeSwitch');
  modeSwitch.addEventListener('mouseup', (event) => {
  switch(localStorage.getItem('mode')) {
    case 'train':
      localStorage.setItem('mode', 'play');
      break;
    case 'play':
      localStorage.setItem('mode', 'train');
      break;
    }
    console.log('localStorage.getItem(mode)' + localStorage.getItem('mode'));
    if(localStorage.getItem('page') === 'main') {
      changeSectionCardsMode();
    }  else if(localStorage.getItem('page') === 'category') {
      changeTrainPlayCardsMode();
    }
  });
}





window.onload = function () {
  renderCards(localStorage.getItem('mode'), localStorage.getItem('page'));
  hamburgerIconHandler();
  hamburgerCloseButtonHandler();
  switchHandler();
  cardsHandler();
 

};