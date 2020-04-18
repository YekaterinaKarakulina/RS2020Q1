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


function getSectionTitle(elem) {
  let title;
  for(let i=0; i<elem.children.length; i++) {
    if(elem.children[i].classList.contains('section-title')) {
      title = elem.children[i].innerHTML;
    }
  }
  return title;
}

function renderStartGameButton() {
  const startGameButton = document.createElement('button');
  startGameButton.className = 'start-game-button';
  startGameButton.setAttribute('type', 'button');
  startGameButton.innerHTML = 'start game';
  document.querySelector('.wrapper').append(startGameButton);
}

function removeStartGameButton() {
  document.querySelector('.start-game-button').remove();
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
    let cardsContainerName;
    
    
    if(localStorage.getItem('mode') === 'train') {
      cardsContainerName = 'train-cards';
    } else if(localStorage.getItem('mode') === 'play') {
    cardsContainerName = 'play-cards';
    }
    switch(categoryTitle) {
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
  }
    cardsWrapper.append(cards);
    changeTrainPlayCardsMode();
  }
}





//hamburgerIconHandler
function hamburgerIconHandler() {
  const HAMBURGER = document.querySelector('.hamburger');
  HAMBURGER.addEventListener('click', (event) => {
    document.querySelector('.hamburger-container').classList.remove('hidden');
    let hamburgerContainer = document.querySelector('.hamburger-container');
    hamburgerContainer.classList.add(localStorage.getItem('mode'));
    let navItems = document.querySelectorAll('.nav-item > a');
    navItems.forEach(e => e.classList.remove('active'));
    if(localStorage.getItem('page') == 'main') {
      for(let i=0; i< navItems.length; i++) {
        if(navItems[i].innerHTML.toLowerCase() === 'main page') {
          navItems[i].classList.add('active');
        }
      }
    } else if(localStorage.getItem('page') === 'category') {
      for(let i=0; i< navItems.length; i++) {
        if (navItems[i].innerHTML.toLowerCase() === localStorage.getItem('category')){
          navItems[i].classList.add('active');
        }
      } 
    }
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



function hamburgerMenuHandler() {
  const hamburgerContainer = document.querySelector('.hamburger-menu');
  hamburgerContainer.addEventListener('click', (event) => {
    console.log(event.target);
    if(event.target.parentNode.classList.contains('nav-item')) {
      console.log('yep');
      let navItems = document.querySelectorAll('.nav-item > a');
      navItems.forEach(e => e.classList.remove('active'));
      event.target.classList.add('active');
      let allLinkElements = document.querySelectorAll('.nav-item > a');
      let activeLinkElem;
      for(let i=0; i<allLinkElements.length; i++) {
        if(allLinkElements[i].classList.contains('active')) {
          activeLinkElem = allLinkElements[i].innerHTML.toLowerCase();
        }
      }
      document.querySelector('.hamburger-container').classList.add('hidden');
      if(activeLinkElem === 'main page') {
        localStorage.setItem('page', 'main');
        renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
      } else {
        localStorage.setItem('category', activeLinkElem);
        localStorage.setItem('page', 'category');
        renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
      }
    }
  })
}




function cardsHandler() {
  document.querySelector('.cards-wrapper').addEventListener('click', (event) => {
    if(localStorage.getItem('page') === 'main') {
      let clickedElem;
      if(event.target.classList.contains('card')) {
        clickedElem = event.target; 
      } else if(event.target.parentNode.classList.contains('card')) {
        clickedElem = event.target.parentNode;
      }
      console.log(clickedElem);
      if(clickedElem != undefined) {
        let title = getSectionTitle(clickedElem).toLowerCase();
        console.log('title ' + title);
        localStorage.setItem('page' , 'category');
        localStorage.setItem('category', title); 
        renderCards(localStorage.getItem('mode'), localStorage.getItem('page'), localStorage.getItem('category'));
      }
    } 
    else if(localStorage.getItem('page') === 'category' && localStorage.getItem('mode') === 'train') {
      if(event.target.classList.contains('card-icon')) {
        const card = event.target.parentNode.parentNode.parentNode;
        card.classList.add('is-flipped');
        card.addEventListener( 'mouseleave', function() {
          card.classList.remove('is-flipped');
        });
      } else if(event.target.classList.contains('card-image')) {
        event.target.nextSibling.play();
        console.log('sound');
      }
    }
  });
}

function showPicture(imgSrc) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const imageElement = document.createElement('div');
  imageElement.className = 'modalImg';
  imageElement.setAttribute('style', imgSrc);
  modal.append(imageElement);
  document.querySelector('.wrapper').append(modal);
  setTimeout(function hideModal() {
    modal.remove();
  }, 500);
}

function playSound(audioSrc) {

  const soundElement = document.createElement('audio');
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', audioSrc);
    sourceElement.setAttribute('type', "audio/mpeg");
    soundElement.append(sourceElement);
    soundElement.play();

  
}


function cardsGameHandler(cardsCollection, array, cardNumber) {
  const successImgSrc = 'background-image: url(./src/assets/images/success.jpg)';
  const failureImgSrc = 'background-image: url(./src/assets/images/failure.jpg)';
  const correctSound ='./src/assets/sounds/correct.mp3';
  const errorSound = './src/assets/sounds/error.mp3';
  document.querySelector('.cards-wrapper').addEventListener('click', (event) => {
    if(localStorage.getItem('page') === 'category' && localStorage.getItem('mode') === 'play' && localStorage.getItem('isGameStarted')==='true') {
      let clickedCard;
      if(event.target.classList.contains('card-face')){
        clickedCard = event.target.parentNode;
      } else if(event.target.classList.contains('card-image')) {
        clickedCard = event.target.parentNode.parentNode;
      }
      if (clickedCard.classList.contains(cardNumber)) {
        console.log('yes');
        playSound(correctSound);
        localStorage.setItem('isGuessed', true);
        clickedCard = '';
        gameInProgress(cardsCollection, array);
        
       // showPicture(successImgSrc);
      } else {
        console.log('no');
        localStorage.setItem('isGuessed', false);
        playSound(errorSound);
        //showPicture(failureImgSrc);
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
  if(localStorage.getItem('page') === 'main') {
    changeSectionCardsMode();
  } else if (localStorage.getItem('page') === 'category') {
    switch(localStorage.getItem('mode')) {
      case 'train':
        removeStartGameButton();
        break;
      case 'play':
        renderStartGameButton();
        break;
      }
      changeTrainPlayCardsMode();
    }
  });
}

function mixCards() {
  const cards_collection = document.querySelectorAll('.play-card');
	var cards_mixed = [];
	for(let i=0; i < cards_collection.length; i++) {
		cards_mixed.push(cards_collection[i]); 
	}
	document.querySelector('.play-cards').innerHTML = '';
	for(let i=0; i< cards_collection.length; i++) {
		let randomNumber = Math.floor(Math.random() * cards_mixed.length);
		let randomCard = cards_mixed[randomNumber];
		cards_mixed.splice(randomNumber,1);
		document.querySelector('.play-cards').append(randomCard);
  }
}


function chooseRandomCard(cards, randomNumber) {
    let randomCard = cards[randomNumber];
    randomCard.classList.add(randomNumber);
    return randomCard;
}

function get_random(array) {
  return array[Math.floor((Math.random()*array.length))];
} 

function gameInProgress(cardsCollection, array) {
  if(localStorage.getItem('isGameStarted') === 'true') {
    let randomNumber = get_random(array);
    for(let i=0; i< array.length; i++) {
      if(array[i] === randomNumber) {
        array.splice(i,1);
      }
    }
    let randomCard = chooseRandomCard(cardsCollection, randomNumber);
    let currentSound = randomCard.querySelector('.card-sound');
    currentSound.play();
    cardsGameHandler(cardsCollection, array, randomNumber);
  }
}

function gameHandler() {
  document.querySelector('.wrapper').addEventListener('click', (event) => {
    if(event.target.className === 'start-game-button') {
      localStorage.setItem('isGameStarted', true);
      document.querySelector('.start-game-button').classList.add('hidden');
      mixCards();
      let cardsCollection = document.querySelectorAll('.play-card');
      let array = [];
      for(let i=0; i<cardsCollection.length; i++) {
        array.push(i);
      }
      console.log('array ' + array );
      gameInProgress(cardsCollection, array);
    }   
  });
}

window.onload = function () {
  renderCards(localStorage.getItem('mode'), localStorage.getItem('page'));
  hamburgerIconHandler();
  hamburgerCloseButtonHandler();
  hamburgerMenuHandler();
  switchHandler();
  cardsHandler();
  
  gameHandler();

  


  
  
 


 

};