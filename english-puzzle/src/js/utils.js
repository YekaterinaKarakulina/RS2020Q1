function createWordElement(word) {
  const element = document.createElement('span');
  element.className = 'word data__word';
  element.dataset.word = word.replace(/[.]/, '');
  element.setAttribute('draggable', 'true');
  element.textContent = word;
  return element;
}

function getActualSentence() {
  const dataWords = document.querySelectorAll('.result__sentence>.data__word');
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
