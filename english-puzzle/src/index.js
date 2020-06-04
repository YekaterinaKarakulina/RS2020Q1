import './sass/style.scss';
import 'babel-polyfill';

import Game from './js/Game';

localStorage.setItem('level', '1');
localStorage.setItem('round', '1');
localStorage.setItem('autoPronunciation', 'true');
localStorage.setItem('translation', 'true');
localStorage.setItem('sentencePronunciation', 'true');
localStorage.setItem('bckImage', 'false');

const game = new Game();
game.startGame(localStorage.getItem('level'), localStorage.getItem('round'));


// click events
document.addEventListener('click', (event) => {
  if (event.target.closest('.data__sentence')) {
    console.log('data__sentence click');
    document.querySelector('.result__sentence').append(event.target);
  } else if (event.target.classList.contains('dontKnow')) {
    console.log('I don`t know');
    game.buildCurrentSentence();
  } else if (event.target.classList.contains('check')) {
    console.log('Check');
    game.checkCurrentSentence();
  } else if (event.target.classList.contains('icon__sound')) {
    game.translateCurrentSentence();
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
  if (event.target.classList.contains('result__sentence')) {
    event.target.append(document.querySelector(`[data-word=${data}]`));
  } else if (event.target.classList.contains('word')) {
    document.querySelector('.result__sentence').insertBefore(document.querySelector(`[data-word=${data}]`), event.target);
  }
  event.target.classList.remove('dragOver');
  game.checkGameStatus();
};
