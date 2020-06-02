import './sass/style.scss';
import 'babel-polyfill';

import getWords from './js/wordsAPI';
import Sentence from './js/Sentence';

localStorage.setItem('level', '1');
localStorage.setItem('page', '1');
localStorage.setItem('autoPronunciation', 'true');
localStorage.setItem('translation', 'true');
localStorage.setItem('sentencePronunciation', 'true');
localStorage.setItem('bckImage', 'false');

async function game() {
  const data = await getWords(0, 0);
  console.log(data);
  console.log(data[0]);

  const sentenceObj = {
    id: data[0].id,
    audioExample: data[0].audioExample,
    textExample: data[0].textExample.replace(/<b>/, '').replace(/<\/b>/, ''),
  };

  const sentence = new Sentence(sentenceObj);

  document.querySelector('.data-container').append(sentence.createSentence());


  document.querySelector('.footer__buttons').addEventListener('click', (event) => {
    console.log(event.target);
    if (event.target.classList.contains('dontKnow')) {
      console.log('I don`t know');
    }
    if (event.target.classList.contains('check')) {
      console.log('Check');
      sentence.checkSentence();
    }
  });
}

game();


// click events
document.addEventListener('click', (event) => {
  if (event.target.closest('.data__sentence')) {
    console.log('data__sentence click');
    document.querySelector('.results__sentence').append(event.target);
  } else if (event.target.closest('.results__sentence')) {
    console.log('results__sentence click');
    document.querySelector('.data__sentence').append(event.target);
  }
});

// drag events
document.ondragstart = function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.word);
};

document.ondragover = function onDragOver(event) {
  event.preventDefault();
  const elements = document.querySelectorAll('.results__sentence>.data__word');
  elements.forEach((el) => el.classList.remove('dragOver'));
  if (event.target.classList.contains('word') && event.target.closest('.results__sentence')) {
    event.target.classList.add('dragOver');
  }
};

document.ondrop = function onDrop(event) {
  event.preventDefault();
  console.log(event.target);
  const data = event.dataTransfer.getData('text/plain');
  if (event.target.classList.contains('results__sentence')) {
    console.log('append to end');
    event.target.append(document.querySelector(`[data-word=${data}]`));
  } else if (event.target.classList.contains('word')) {
    console.log('append between');
    document.querySelector('.results__sentence').insertBefore(document.querySelector(`[data-word=${data}]`), event.target);
  }
  event.target.classList.remove('dragOver');
};
