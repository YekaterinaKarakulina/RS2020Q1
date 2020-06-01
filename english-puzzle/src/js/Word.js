export default class Word {
  constructor({
    id, word, audioExample, textExample,
  }) {
    this.id = id;
    this.word = word;
    this.audioExample = audioExample;
    this.textExample = textExample;
  }

  createWordElement() {
    const wordElement = document.createElement('div');
    wordElement.className = 'word';
    wordElement.dataset.audio = this.audioExample;
    wordElement.dataset.text = this.textExample;
    wordElement.textContent = this.word;
    return wordElement;
  }
}
