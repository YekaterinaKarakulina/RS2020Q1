import './sass/style.scss';
import 'babel-polyfill';

import Game from './js/Game';

const level = 1;
const round = 1;
const game = new Game(level, round);
game.startGame();


// click events
document.addEventListener('click', (event) => {
  if (event.target.closest('.data__sentence')) {
    console.log('data__sentence click');
    document.querySelector('.result__sentence.current').append(event.target);
  } else if (event.target.classList.contains('dontKnow')) {
    console.log('I don`t know');
    game.buildCurrentSentence();
  } else if (event.target.classList.contains('check')) {
    console.log('Check');
    game.checkCurrentSentence();
  } else if (event.target.classList.contains('continue')) {
    if (game.iCurrentSentenceNumber < 1) {
      console.log('Next sentence');
      game.showHintsAtEnd();
      game.next();
    } else {
      console.log('next round');
      game.iRound += 1;
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
      game.autoPronounceCurrentSentence();
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
  const elements = document.querySelectorAll('.result__sentence>.data__word');
  elements.forEach((el) => el.classList.remove('dragOver'));
  if (event.target.classList.contains('word') && event.target.closest('.result__sentence')) {
    event.target.classList.add('dragOver');
  }
};

document.ondrop = function onDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  if (event.target.classList.contains('result__sentence.current')) {
    event.target.append(document.querySelector(`[data-word=${data}]`));
  } else if (event.target.classList.contains('word')) {
    document.querySelector('.result__sentence.current').insertBefore(document.querySelector(`[data-word=${data}]`), event.target);
  }
  event.target.classList.remove('dragOver');
  game.checkGameStatus();
};
