import Cards from './js/Cards';

import cardsMainPage from './js/cardsData/cardsMainPage';
import cardsActionA from './js/cardsData/cardsActionA';
import cardsActionB from './js/cardsData/cardsActionB';
import cardsAnimalA from './js/cardsData/cardsAnimalA';
import cardsAnimalB from './js/cardsData/cardsAnimalB';
import cardsClothes from './js/cardsData/cardsClothes';
import cardsEmotions from './js/cardsData/cardsEmotions';
import cardsVegetables from './js/cardsData/cardsVegetables';
import cardsWeather from './js/cardsData/cardsWeather';

// elements
const HAMBURGER = document.querySelector('.hamburger');

// local storage - page, mode items init
localStorage.setItem('mode', 'train');
localStorage.setItem('page', 'main');
localStorage.setItem('isGameStarted', false);

// variables
let cardsCollection;
const array = [];
let randomNumber;
let randomCard;
let points;
let errors;

// get title from card
function getSectionTitle(elem) {
  let title;
  for (let i = 0; i < elem.children.length; i += 1) {
    if (elem.children[i].classList.contains('section-title')) {
      title = elem.children[i].innerHTML;
    }
  }
  return title;
}

// mix cards when game starts (playMode)
function mixCards() {
  cardsCollection = document.querySelectorAll('.play-card');
  const cardsMixed = [];
  for (let i = 0; i < cardsCollection.length; i += 1) {
    cardsMixed.push(cardsCollection[i]);
  }
  document.querySelector('.play-cards').innerHTML = '';
  for (let i = 0; i < cardsCollection.length; i += 1) {
    randomNumber = Math.floor(Math.random() * cardsMixed.length);
    randomCard = cardsMixed[randomNumber];
    cardsMixed.splice(randomNumber, 1);
    document.querySelector('.play-cards').append(randomCard);
  }
}

// choose random card while game in progress
function chooseRandomCard(cards, randomNumb) {
  randomCard = cards[randomNumb];
  randomCard.classList.add(randomNumb);
  return randomCard;
}

// get random number from array
function getRandom(arr) {
  return arr[Math.floor((Math.random() * arr.length))];
}

// render 'start game' button
function renderStartGameButton() {
  if (document.querySelector('.start-game-button') === null) {
    const startGameButton = document.createElement('button');
    startGameButton.className = 'start-game-button';
    startGameButton.setAttribute('type', 'button');
    startGameButton.innerHTML = 'start game';
    document.querySelector('.wrapper').append(startGameButton);
  }
}

// remove 'start-game' button
function removeStartGameButton() {
  if (document.querySelector('.start-game-button') != null) {
    document.querySelector('.start-game-button').remove();
  }
}

// render 'repeat sound' button
function renderRepeatButton() {
  const repeatButton = document.createElement('a');
  repeatButton.className = 'icon-repeat-container';
  const repeatIcon = document.createElement('object');
  repeatIcon.className = 'icon-repeat';
  repeatIcon.setAttribute('type', 'image/svg+xml');
  repeatIcon.setAttribute('data', './src/assets/images/repeat.svg');
  repeatButton.append(repeatIcon);
  document.querySelector('.wrapper').append(repeatButton);
}

// remove 'repeat sound' button
function removeRepeatButton() {
  if (document.querySelector('.icon-repeat-container') != null) {
    document.querySelector('.icon-repeat-container').remove();
  }
}

// render container for stars while game in progress
function renderStarsContainer() {
  if (document.querySelector('.stars-container') === null) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.querySelector('.header').append(starsContainer);
  }
}

// render container for stars when game ends
function removeStarsContainer() {
  if (document.querySelector('.stars-container') != null) {
    document.querySelector('.stars-container').remove();
  }
}

// render star
function renderStar(starType) {
  const star = document.createElement('object');
  star.className = 'star';
  star.setAttribute('type', 'image/svg+xml');
  star.setAttribute('data', `./src/assets/images/${starType}.svg`);
  document.querySelector('.stars-container').append(star);
}

// play sound
function playSound(audioSrc) {
  const soundElement = document.createElement('audio');
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('src', audioSrc);
  sourceElement.setAttribute('type', 'audio/mpeg');
  soundElement.append(sourceElement);
  soundElement.play();
}

// repeat sound button handler
function repeatSound() {
  document.querySelector('.icon-repeat-container').addEventListener('click', () => {
    if (localStorage.getItem('isGameStarted') === 'true') {
      randomCard.querySelector('.card-sound').play();
    }
  });
}

// change section cards mode train/play
function changeSectionCardsMode() {
  const els = document.querySelectorAll('.section-cards > *');
  els.forEach((e) => e.classList.add(localStorage.getItem('mode')));
  switch (localStorage.getItem('mode')) {
    case 'train':
      els.forEach((e) => e.classList.replace('play', 'train'));
      break;
    case 'play':
      els.forEach((e) => e.classList.replace('train', 'play'));
      break;
    default:
      break;
  }
}

// change category cards mode train/play
function changeTrainPlayCardsMode() {
  const cardsContainer = document.querySelector('.cards-wrapper').firstElementChild;
  const cardDescription = document.querySelectorAll('.card-description');
  let els = [];
  switch (localStorage.getItem('mode')) {
    case 'train':
      cardsContainer.classList.replace('play-cards', 'train-cards');
      els = document.querySelectorAll('.train-cards > *');
      els.forEach((e) => e.classList.remove('not-active'));//
      els.forEach((e) => e.classList.replace('play-card', 'train-card'));
      cardDescription.forEach((e) => e.classList.remove('hidden'));
      break;
    case 'play':
      cardsContainer.classList.replace('train-cards', 'play-cards');
      els = document.querySelectorAll('.play-cards > *');
      els.forEach((e) => e.classList.remove('not-active'));
      els.forEach((e) => e.classList.replace('train-card', 'play-card'));
      cardDescription.forEach((e) => e.classList.add('hidden'));
      break;
    default:
      break;
  }
}

// renderCards
function renderCards(mode, page, categoryTitle) {
  const cardsWrapper = document.querySelector('.cards-wrapper');
  if (localStorage.getItem('isGameStarted') === 'true') {
    removeStarsContainer();
    removeRepeatButton();
  }
  if (page === 'main') {
    const cards = (new Cards('section-cards')).generateCards(cardsMainPage);
    cardsWrapper.innerHTML = '';
    cardsWrapper.append(cards);
    const els = document.querySelectorAll('.section-cards > *');
    els.forEach((e) => e.classList.add(mode));
    removeStartGameButton();
  } else if (page === 'category') {
    cardsWrapper.innerHTML = '';
    let cards = [];
    let cardsContainerName;
    if (localStorage.getItem('mode') === 'train') {
      cardsContainerName = 'train-cards';
    } else if (localStorage.getItem('mode') === 'play') {
      cardsContainerName = 'play-cards';
      renderStartGameButton();
    }
    switch (categoryTitle) {
      case 'action (set a)':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsActionA);
        break;
      case 'action (set b)':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsActionB);
        break;
      case 'animal (set a)':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsAnimalA);
        break;
      case 'animal (set b)':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsAnimalB);
        break;
      case 'clothes':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsClothes);
        break;
      case 'emotions':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsEmotions);
        break;
      case 'vegetables':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsVegetables);
        break;
      case 'weather':
        cards = (new Cards(cardsContainerName)).generateTrainPlayCards(cardsWeather);
        break;
      default:
        break;
    }
    cardsWrapper.append(cards);
    changeTrainPlayCardsMode();
  }
}

// hamburger icon handler
function hamburgerIconHandler() {
  HAMBURGER.addEventListener('click', () => {
    HAMBURGER.classList.toggle('open');
    document.querySelector('.hamburger-container').classList.toggle('hidden');
    const hamburgerContainer = document.querySelector('.hamburger-container');
    hamburgerContainer.classList.add(localStorage.getItem('mode'));
    const navItems = document.querySelectorAll('.nav-item > a');
    navItems.forEach((e) => e.classList.remove('active'));
    if (localStorage.getItem('page') === 'main') {
      for (let i = 0; i < navItems.length; i += 1) {
        if (navItems[i].innerHTML.toLowerCase() === 'main page') {
          navItems[i].classList.add('active');
        }
      }
    } else if (localStorage.getItem('page') === 'category') {
     
      for (let i = 0; i < navItems.length; i += 1) {
        if (navItems[i].innerHTML.toLowerCase() === localStorage.getItem('category')) {
          navItems[i].classList.add('active');
        }
      }
    }
    switch (localStorage.getItem('mode')) {
      case 'train':
        hamburgerContainer.classList.replace('play', 'train');
        break;
      case 'play':
        hamburgerContainer.classList.replace('train', 'play');
        break;
      default:
        break;
    }
  });
}

// hamburger menu handler
function hamburgerMenuHandler() {
  const hamburgerContainer = document.querySelector('.hamburger-menu');
  hamburgerContainer.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('nav-item')) {
      const navItems = document.querySelectorAll('.nav-item > a');
      navItems.forEach((e) => e.classList.remove('active'));
      event.target.classList.add('active');
      let activeLinkElem;
      for (let i = 0; i < navItems.length; i += 1) {
        if (navItems[i].classList.contains('active')) {
          activeLinkElem = navItems[i].innerHTML.toLowerCase();
        }
      }
      document.querySelector('.hamburger-container').classList.add('hidden');
      if (HAMBURGER.classList.contains('open')) {
        HAMBURGER.classList.remove('open');
      }
      if (activeLinkElem === 'main page') {
        localStorage.setItem('page', 'main');
        renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
      } else {
        localStorage.setItem('category', activeLinkElem);
        localStorage.setItem('page', 'category');
        renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
        localStorage.setItem('isGameStarted', false);
      }
    }
  });
}

// cards handler
function cardsHandler() {
  document.querySelector('.cards-wrapper').addEventListener('click', (event) => {
    if (localStorage.getItem('page') === 'main') {
      let clickedElem;
      if (event.target.classList.contains('card')) {
        clickedElem = event.target;
      } else if (event.target.parentNode.classList.contains('card')) {
        clickedElem = event.target.parentNode;
      }
      if (clickedElem !== undefined) {
        const title = getSectionTitle(clickedElem).toLowerCase();
        localStorage.setItem('page', 'category');
        localStorage.setItem('category', title);
        renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
      }
    } else if (localStorage.getItem('page') === 'category' && localStorage.getItem('mode') === 'train') {
      if(event.target.classList.contains('card-icon')) {
        const card = event.target.parentNode.parentNode.parentNode;
        let cardFrontSide;
        let cardBackSide;
        let sides = card.childNodes;
        for(let i=0; i<sides.length; i++) {
          if(sides[i].classList.contains('card-face-front')) {
            cardFrontSide = sides[i];
          }
          if(sides[i].classList.contains('card-face-back')) {
            cardBackSide = sides[i];
          }
        }
        if(event.target.classList.contains('card-icon-front')) {
          cardFrontSide.classList.add('hidden');
          cardBackSide.classList.remove('hidden');
          card.classList.add('is-flipped');

        } else if(event.target.classList.contains('card-icon-back')) {
          cardFrontSide.classList.remove('hidden');
          cardBackSide.classList.add('hidden');
          card.classList.remove('is-flipped');
        }
        card.addEventListener('mouseleave', () => {
          cardBackSide.classList.add('hidden');
          card.classList.remove('is-flipped');
          cardFrontSide.classList.remove('hidden');
        });
      }
       else if (event.target.classList.contains('card-image')) {
        event.target.nextSibling.play();
      }
    }
  });
}

// render game results
function renderResults(imgSrc, className, soundSrc) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const imageElement = document.createElement('div');
  imageElement.className = 'modalImg';
  imageElement.classList.add(className);
  imageElement.setAttribute('style', imgSrc);
  const errorsElement = document.createElement('div');
  errorsElement.className = 'errors-element';
  errorsElement.innerHTML = `Errors: ${errors}`;
  modal.append(errorsElement);
  modal.append(imageElement);
  document.querySelector('.wrapper').append(modal);
  playSound(soundSrc);
  setTimeout(() => {
    modal.remove();
  }, 5000);
}

// show results of game
function showResults() {
  const successImgSrc = 'background-image: url(./src/assets/images/success.jpg)';
  const failureImgSrc = 'background-image: url(./src/assets/images/failure.jpg)';
  const successSoundSrc = './src/assets/sounds/success.mp3';
  const failureSoundSrc = './src/assets/sounds/failure.mp3';
  if (errors === 0) {
    renderResults(successImgSrc, 'success', successSoundSrc);
  } else {
    renderResults(failureImgSrc, 'failure', failureSoundSrc);
  }
}

// game in progress
function gameInProgress() {
  if (points < 8) {
    randomNumber = getRandom(array);
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === randomNumber) {
        array.splice(i, 1);
      }
    }
    randomCard = chooseRandomCard(cardsCollection, randomNumber);
    setTimeout(()=> {
      randomCard.querySelector('.card-sound').play();
    }, 1000);
    repeatSound();
  } else {
    setTimeout(()=> {
      showResults();
      errors = 0;
      points = 0;
      localStorage.setItem('isGameStarted', false);
      localStorage.setItem('mode', 'train');
      localStorage.setItem('page', 'main');
      document.querySelector('.onoffswitch-inner').click();
      renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
      removeStarsContainer();
      removeRepeatButton();
    }, 1000);
    
  }
}

// game handler
function cardsGameHandler() {
  const correctSound = './src/assets/sounds/correct.mp3';
  const errorSound = './src/assets/sounds/error.mp3';
  document.querySelector('.cards-wrapper').addEventListener('mouseup', (event) => {
    if (localStorage.getItem('page') === 'category' && localStorage.getItem('mode') === 'play' && localStorage.getItem('isGameStarted') === 'true') {
      let clickedCard;
      if (event.target.classList.contains('card-face')) {
        clickedCard = event.target.parentNode;
      } else if (event.target.classList.contains('card-image')) {
        clickedCard = event.target.parentNode.parentNode;
      }
      if (clickedCard.classList.contains(randomNumber)) {
        clickedCard.classList.add('not-active');
        playSound(correctSound);
        localStorage.setItem('isGuessed', true);
        points += 1;
        renderStar('starGold');
        gameInProgress();
      } else if(!clickedCard.classList.contains('not-active')){
        errors += 1;
        localStorage.setItem('isGuessed', false);
        playSound(errorSound);
        renderStar('starEmpty');
      }
    }
  });
}

// switch handler
function switchHandler() {
  const modeSwitch = document.querySelector('.modeSwitch');
  modeSwitch.addEventListener('mouseup', () => {
    switch (localStorage.getItem('mode')) {
      case 'train':
        localStorage.setItem('mode', 'play');
        break;
      case 'play':
        localStorage.setItem('mode', 'train');
        localStorage.setItem('isGameStarted', false);
        removeStarsContainer();
        removeRepeatButton();
        break;
      default:
        break;
    }
    if (localStorage.getItem('page') === 'main') {
      changeSectionCardsMode();
    } else if (localStorage.getItem('page') === 'category') {
      changeTrainPlayCardsMode();
      switch (localStorage.getItem('mode')) {
        case 'train':
          removeStartGameButton();
          break;
        case 'play':
          renderStartGameButton();
          break;
        default:
          break;
      }
    }
  });
}

// game handler
function gameHandler() {
  document.querySelector('.wrapper').addEventListener('click', (event) => {
    localStorage.setItem('isGuessed', false);
    if (event.target.className === 'start-game-button') {
      localStorage.setItem('isGameStarted', true);
      points = 0;
      errors = 0;
      mixCards();
      removeStartGameButton();
      renderRepeatButton();
      renderStarsContainer();
      cardsCollection = document.querySelectorAll('.play-card');
      for (let i = 0; i < cardsCollection.length; i += 1) {
        array.push(i);
      }
      gameInProgress();
    }
  });
}

window.onload = function contentLoaded() {
  renderCards(localStorage.getItem('mode'), localStorage.getItem('page'));
  hamburgerIconHandler();
  hamburgerMenuHandler();
  switchHandler();
  cardsHandler();
  gameHandler();
  cardsGameHandler();
};
