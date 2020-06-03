import { createWordElement, getActualSentence, mixArrayElements } from './utils';

export default class Sentence {
  constructor({
    id, audioExample, textExample,
  }) {
    this.id = id;
    this.audioExample = audioExample;
    this.textExample = textExample;
    this.length = 0;
  }

  createDataSentence() {
    const sentenceElement = document.createElement('div');
    sentenceElement.className = 'sentence data__sentence';
    sentenceElement.dataset.audio = this.audioExample;
    sentenceElement.dataset.text = this.textExample;

    const sentenceArray = this.textExample.split(' ');
    this.length = sentenceArray.length;

    const sentenceArrayMixed = mixArrayElements(sentenceArray);

    const fragment = document.createDocumentFragment();
    sentenceArrayMixed.forEach((el) => {
      fragment.append(createWordElement(el));
    });

    sentenceElement.append(fragment);
    return sentenceElement;
  }

  playSentenceSound() {
    const sound = new Audio(`https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.audioExample}`);
    sound.play();
  }

  checkSentence() {
    const expectedSentence = this.textExample.split(' ');
    const actualSentence = getActualSentence();
    let errors = 0;
    actualSentence.forEach((el) => {
      el.classList.remove('true');
      el.classList.remove('false');
    });
    for (let i = 0; i < expectedSentence.length; i += 1) {
      if (expectedSentence[i] === actualSentence[i].textContent) {
        actualSentence[i].classList.add('true');
      } else {
        actualSentence[i].classList.add('false');
        errors += 1;
      }
    }
    return errors;
  }

  buildSentence() {
    const sentenceArray = this.textExample.split(' ');
    const fragment = document.createDocumentFragment();
    sentenceArray.forEach((el) => {
      fragment.append(createWordElement(el));
    });
    fragment.querySelectorAll('.data__word').forEach((el) => {
      document.querySelector('.result__sentence').append(el);
    });
    document.querySelectorAll('.data__sentence>.data__word').forEach((el) => el.remove());
  }
}
