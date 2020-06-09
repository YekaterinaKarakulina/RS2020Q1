function createWordElement(word) {
  const wordContainer = document.createElement('span');
  wordContainer.className = 'word-container';
  const wordElement = document.createElement('span');
  wordElement.className = 'word data__word';
  wordElement.dataset.word = word.replace(/[.]/, '');
  wordElement.setAttribute('draggable', 'true');
  wordElement.textContent = word;
  wordContainer.append(wordElement);
  return wordContainer;
}

function getActualSentence() {
  const dataWords = document.querySelectorAll('.result__sentence.current>.word-container>.data__word');
  const actualSentenceArray = [];
  dataWords.forEach((el) => {
    actualSentenceArray.push(el);
  });
  return actualSentenceArray;
}

function mixArrayElements(array) {
  const arrayMixed = [];
  const arrayLength = array.length;
  for (let i = 0; i < arrayLength; i += 1) {
    const randomNumber = Math.floor(Math.random() * array.length);
    const randomWord = array[randomNumber];
    array.splice(randomNumber, 1);
    arrayMixed.push(randomWord);
  }
  return arrayMixed;
}

export {
  createWordElement, getActualSentence, mixArrayElements,
};
