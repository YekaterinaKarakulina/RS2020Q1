function createWordElement(word) {
  const element = document.createElement('span');
  element.className = 'word';
  element.textContent = word;
  return element;
}

export default class Sentence {
  constructor({
    id, audioExample, textExample,
  }) {
    this.id = id;
    this.audioExample = audioExample;
    this.textExample = textExample;
  }

  createSentenceElement() {
    const sentenceElement = document.createElement('div');
    sentenceElement.className = 'sentence';
    sentenceElement.dataset.audio = this.audioExample;
    sentenceElement.dataset.text = this.textExample;

    const sentenceArray = this.textExample.split(' ');
    console.log(sentenceArray);

    const sentenceArrayMixed = [];
    const sentenceArrayLength = sentenceArray.length;
    for (let i = 0; i < sentenceArrayLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * sentenceArray.length);
      const randomWord = sentenceArray[randomNumber];
      sentenceArray.splice(randomNumber, 1);
      sentenceArrayMixed.push(randomWord);
    }
    console.log(sentenceArrayMixed);

    const fragment = document.createDocumentFragment();
    sentenceArrayMixed.forEach((el) => {
      fragment.append(createWordElement(el));
    });
    sentenceElement.append(fragment);
    return sentenceElement;
  }

  playSound() {
    const sound = new Audio(`https://raw.githubusercontent.com/yekaterinakarakulina/rslang-data/master/${this.audioExample}`);
    sound.play();
  }
}
