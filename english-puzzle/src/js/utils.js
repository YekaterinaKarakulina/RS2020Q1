function getFormData() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  return { email, password };
}

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

function checkActiveHintsBeforeGame() {
  if (localStorage.getItem('autoPronunciation') === null) {
    localStorage.setItem('autoPronunciation', 'true');
  }
  if (localStorage.getItem('translation') === null) {
    localStorage.setItem('translation', 'true');
  }
  if (localStorage.getItem('sentencePronunciation') === null) {
    localStorage.setItem('sentencePronunciation', 'true');
  }
  if (localStorage.getItem('bckImage') === null) {
    localStorage.setItem('bckImage', 'false');
  }

  const autoPronunciationButton = document.querySelector('.menu__button.auto-pronunciation');
  if (localStorage.getItem('autoPronunciation') === 'true') {
    autoPronunciationButton.classList.add('active');
  } else {
    autoPronunciationButton.classList.remove('active');
  }

  const translationButton = document.querySelector('.menu__button.translation');
  if (localStorage.getItem('translation') === 'true') {
    translationButton.classList.add('active');
  } else {
    translationButton.classList.remove('active');
  }

  const sentencePronunciationButton = document.querySelector('.menu__button.sentence-pronunciation');
  if (localStorage.getItem('sentencePronunciation') === 'true') {
    sentencePronunciationButton.classList.add('active');
  } else {
    sentencePronunciationButton.classList.remove('active');
  }

  const bckImageButton = document.querySelector('.menu__button.bck-image');
  if (localStorage.getItem('bckImage') === 'true') {
    bckImageButton.classList.add('active');
  } else {
    bckImageButton.classList.remove('active');
  }
}

export {
  getFormData, createWordElement, getActualSentence, mixArrayElements, checkActiveHintsBeforeGame,
};
