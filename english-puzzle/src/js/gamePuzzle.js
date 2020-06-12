import Game from './Game';
import { getGameProgressFromUserSetting } from './userAPI';
import { SELECTPAGEOPTION, SELECTLEVELOPTION } from './constants';

let game;

async function createGameInstance() {
  const userObj = {
    userId: localStorage.getItem('userId'),
    userToken: localStorage.getItem('userToken'),
  };
  const gameProgress = await getGameProgressFromUserSetting(userObj);
  console.log(gameProgress);
  const object = new Game(gameProgress);

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
          if (game.iPage <= game.pagesAmountInLevel) {
            SELECTPAGEOPTION.value = game.iPage;
            game.startCurrentLevelRound();
          } else {
            game.iLevel += 1;
            game.iPage = 1;
            if (game.iLevel <= 6) {
              SELECTLEVELOPTION.value = game.iLevel;
              SELECTPAGEOPTION.value = game.iPage;
              game.startNewLevelRound();
            } else {
              console.log('GAME FINISHED!');
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
      game.iPage = SELECTPAGEOPTION.value;
      game.startCurrentLevelRound();
    }

    if (event.target.parentElement.classList.contains('select__level')) {
      game.iLevel = SELECTLEVELOPTION.value;
      game.iPage = 1;
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
  return object;
}

export default async function initGame() {
  if (!game) {
    game = await createGameInstance();
  }
  game.startNewLevelRound();
}
