import './sass/style.scss';
import 'babel-polyfill';

import { createUser, loginUser } from './js/userAPI';
import Game from './js/Game';

const level = 0;
const round = 0;
const game = new Game(level, round);

const TOOLBARCONTAINER = document.querySelector('.toolbar-container');
const TOOLBARHAMBURGER = document.querySelector('.toolbar-hamburger');
const LOGINSECTION = document.querySelector('.login-page');
const STARTGAMESECTION = document.querySelector('.start-page');
const GAMESECTION = document.querySelector('.game-page');

if (localStorage.getItem('userAuthorized') === 'true') {
  LOGINSECTION.classList.add('hidden');
  STARTGAMESECTION.classList.remove('hidden');
}

TOOLBARHAMBURGER.addEventListener('click', () => {
  TOOLBARHAMBURGER.classList.toggle('open');
  TOOLBARCONTAINER.classList.toggle('hidden');
});

function getFormData() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  return { email, password };
}

async function signIn(userData) {
  const loginResult = await loginUser(userData);
  console.log(loginResult.message);
  if (loginResult.message === 'Authenticated') {
    console.log('userAuthorized');
    localStorage.setItem('userAuthorized', 'true');
    LOGINSECTION.classList.add('hidden');
    STARTGAMESECTION.classList.remove('hidden');
  }
}

document.addEventListener('click', (event) => {
  document.querySelector('.error-message').innerHTML = '';
  if (event.target.classList.contains('button__logOut')) {
    localStorage.setItem('userAuthorized', 'false');
    LOGINSECTION.classList.remove('hidden');
    STARTGAMESECTION.classList.add('hidden');
    GAMESECTION.classList.add('hidden');
    TOOLBARCONTAINER.classList.add('hidden');
    TOOLBARHAMBURGER.classList.remove('open');
  } else if (event.target.classList.contains('button__signUp')) {
    event.preventDefault();
    const userData = getFormData();
    createUser(userData);
  } else if (event.target.classList.contains('button__signIn')) {
    event.preventDefault();
    const userData = getFormData();
    signIn(userData);
  } else if (event.target.classList.contains('start__button')) {
    STARTGAMESECTION.classList.add('hidden');
    GAMESECTION.classList.remove('hidden');
    game.startGame();
  }
});


// click events
document.querySelector('.game-page').addEventListener('click', (event) => {
  if (event.target.closest('.data__sentence') && event.target.classList.contains('data__word')) {
    document.querySelector('.result__sentence>.word-container:empty').append(event.target);
  } else if (event.target.classList.contains('dontKnow')) {
    console.log('I don`t know');
    game.buildCurrentSentence();
  } else if (event.target.classList.contains('check')) {
    console.log('Check');
    game.checkCurrentSentence();
  } else if (event.target.classList.contains('continue')) {
    game.iCurrentSentenceNumber += 1;
    console.log(game.iCurrentSentenceNumber);
    if (game.iCurrentSentenceNumber <= 9) {
      console.log('Next sentence');
      game.next();
    } else {
      console.log('next round');
      game.iPage += 1;
      console.log(game);
      game.startGame();
    }
  } else if (event.target.closest('.menu__button.auto-pronunciation')) {
    if (localStorage.getItem('autoPronunciation') === 'true') {
      localStorage.setItem('autoPronunciation', 'false');
    } else {
      localStorage.setItem('autoPronunciation', 'true');
    }
  } else if (event.target.closest('.menu__button.translation')) {
    if (localStorage.getItem('translation') === 'true') {
      localStorage.setItem('translation', 'false');
    } else {
      localStorage.setItem('translation', 'true');
    }
  } else if (event.target.closest('.menu__button.sentence-pronunciation')) {
    if (localStorage.getItem('sentencePronunciation') === 'true') {
      localStorage.setItem('sentencePronunciation', 'false');
    } else {
      localStorage.setItem('sentencePronunciation', 'true');
    }
  } else if (event.target.closest('.menu__button.bck-image')) {
    if (localStorage.getItem('bckImage') === 'true') {
      localStorage.setItem('bckImage', 'false');
    } else {
      localStorage.setItem('bckImage', 'true');
    }
  } else if (event.target.classList.contains('icon__sound')) {
    if (document.querySelector('.menu__button.sentence-pronunciation').classList.contains('active')) {
      game.pronounceCurrentSentence();
    }
  }
  game.checkGameStatus();
});

// drag events
document.ondragstart = function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.word);
};

document.ondragover = function onDragOver(event) {
  event.preventDefault();
  const elements = document.querySelectorAll('.result__sentence.current>.word-container');
  elements.forEach((el) => el.classList.remove('dragOver'));
  if (event.target.classList.contains('word-container') && event.target.closest('.result__sentence.current')) {
    event.target.classList.add('dragOver');
  } else if (event.target.classList.contains('data__word') && event.target.closest('.result__sentence.current')) {
    event.target.parentElement.classList.add('dragOver');
  }
};

document.ondrop = function onDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const dropStartElement = document.querySelector(`[data-word=${data}]`);
  const dropStartContainer = dropStartElement.parentElement;
  const dropEndElement = event.target;
  if (event.target.classList.contains('word-container')) {
    dropEndElement.append(dropStartElement);
    dropEndElement.classList.remove('dragOver');
  } else if (event.target.classList.contains('data__word')) {
    const dropEndContainer = dropEndElement.parentElement;
    dropEndContainer.append(dropStartElement);
    dropStartContainer.append(dropEndElement);
    dropEndContainer.classList.remove('dragOver');
  }
  game.checkGameStatus();
};
