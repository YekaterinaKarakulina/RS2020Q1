import './sass/style.scss';
import 'babel-polyfill';

import { createUser, loginUser } from './js/userAPI';
import Game from './js/Game';
import { getFormData } from './js/utils';


// const game = new Game(level, page);
const game = new Game(0, 0);

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

async function signIn(userData) {
  const loginResult = await loginUser(userData);
  console.log(`signIn ${loginResult.message}`);
  if (loginResult.message === 'Authenticated') {
    console.log('userAuthorized set true');
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
    game.startNewLevelRound();
  }
});


// click events
document.querySelector('.game-page').addEventListener('click', (event) => {
  if (event.target.closest('.data__sentence') && event.target.classList.contains('data__word')) {
    document.querySelector('.result__sentence>.word-container:empty').append(event.target);
  } else if (event.target.classList.contains('dontKnow')) {
    game.buildCurrentSentence();
  } else if (event.target.classList.contains('check')) {
    game.checkCurrentSentence();
  } else if (event.target.classList.contains('continue')) {
    if (!game.isFinished) {
      game.iCurrentSentenceNumber += 1;
      console.log(`level ${game.iLevel}, page ${game.iPage}, currentSentenceNumb ${game.iCurrentSentenceNumber}`);
      if (game.iCurrentSentenceNumber < 10) {
        game.startSentence();
      } else {
        game.iPage += 1;
        console.log(`before comparicon ${game.iPage} ${game.pagesAmountInLevel}`);
        if (game.iPage < game.pagesAmountInLevel) {
          document.querySelector('.select__page>#slct').value = game.iPage + 1;
          game.startCurrentLevelRound();
        } else {
          game.iLevel += 1;
          game.iPage = 0;
          if (game.iLevel <= 5) {
            document.querySelector('.select__level>#slct').value = game.iLevel + 1;
            document.querySelector('.select__page>#slct').value = game.iPage + 1;
            game.startNewLevelRound();
          } else {
            game.isFinished = true;
          }
        }
      }
    }
  }


  if (game.isSentenceCompleted) {
    if (event.target.closest('.menu__button.auto-pronunciation')) {
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
    }
  } 
  
  if (event.target.classList.contains('icon__sound')) {
    if (document.querySelector('.menu__button.sentence-pronunciation').classList.contains('active')) {
      game.pronounceCurrentSentence();
    }
  }
  
  if (event.target.parentElement.classList.contains('select__page')) {
    console.log('select page click');
    game.iPage = document.querySelector('.select__page>#slct').value - 1;
    game.startCurrentLevelRound();
  }

  if (event.target.parentElement.classList.contains('select__level')) {
    console.log('select level click');
    game.iLevel = document.querySelector('.select__level>#slct').value - 1;
    game.iPage = 0;
    game.startNewLevelRound();
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
