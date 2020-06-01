import 'babel-polyfill';

import getWords from './js/wordsAPI';
import Sentence from './js/Sentence';


async function myF() {
  const data = await getWords(0, 0);
  console.log(data);
  console.log(data[0]);

  const sentenceObj = {
    id: data[0].id,
    audioExample: data[0].audioExample,
    textExample: data[0].textExample.replace(/<b>/, '').replace(/<\/b>/, ''),
  };

  const sentenceElem = new Sentence(sentenceObj);

  const sentenceContainer = document.createElement('div');
  sentenceContainer.className = 'sentence-container';

  const sentenceNumber = document.createElement('span');
  sentenceNumber.className = 'sentence-number';
  sentenceNumber.textContent = 1;

  sentenceContainer.append(sentenceNumber);
  sentenceContainer.append(sentenceElem.createSentenceElement());
  document.querySelector('.results-container').append(sentenceContainer);
  sentenceElem.playSound();
}

myF();
