import { createWordElement, getActualSentence, mixArrayElements } from './utils';

export default class Sentence {
  constructor({
    id, audioExample, textExample,
  }) {
    this.id = id;
    this.audioExample = audioExample;
    this.textExample = textExample;
  }

  createSentence() {
    const sentenceElement = document.createElement('div');
    sentenceElement.className = 'sentence data__sentence';
    sentenceElement.dataset.audio = this.audioExample;
    sentenceElement.dataset.text = this.textExample;

    const sentenceArray = this.textExample.split(' ');

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
    const expectedSentence = this.textExample;
    const actualSentence = getActualSentence();
    if (actualSentence === expectedSentence) {
      console.log('sentence true');
    } else {
      console.log('sentence false');
    }
  }
}
