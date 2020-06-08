import Sentence from './Sentence';
import initData from './dataUtils';

const dontKnowButton = document.querySelector('.game__buttons>.dontKnow');
const checkButton = document.querySelector('.game__buttons>.check');
const continueButton = document.querySelector('.game__buttons>.continue');
const resultsButton = document.querySelector('.game__buttons>.results');

export default class Game {
  constructor(level, round) {
    this.iLevel = level;
    this.iRound = round;
  }

  async startGame() {
    this.dataSentencesObjects = [];
    this.dataSentences = [];
    this.resultSentences = [];
    this.iCurrentSentenceNumber = 0;
    this.isSentenceCompleted = false;

    checkButton.classList.add('hidden');
    continueButton.classList.add('hidden');
    resultsButton.classList.add('hidden');
    const fragment = document.createDocumentFragment();
    const roundData = await initData(this.iLevel, this.iRound);
    console.log(roundData);
    roundData.forEach((el) => {
      let sentence = new Sentence(el);
      this.dataSentencesObjects.push(sentence);
      sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
      sentence = sentence.createDataSentence();
      this.dataSentences.push(sentence);

      const sentenceContainer = document.createElement('div');
      sentenceContainer.className = 'sentence result__sentence';
      fragment.append(sentenceContainer);
    });

    document.querySelector('.results-container').innerHTML = '';
    document.querySelector('.results-container').append(fragment);
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));

    this.next();
  }

  next() {
    document.querySelector('.hints-sentence').textContent = '';
    this.isSentenceCompleted = false;
    // this.iCurrentSentenceNumber += 1;
    const dataWords = document.querySelectorAll('.result__sentence.current>.data__word');
    dataWords.forEach((el) => el.classList.remove('true'));
    this.resultSentences.forEach((el) => el.classList.remove('current'));
    this.currentDataSentence = this.dataSentences[this.iCurrentSentenceNumber];
    this.currentResultSentence = this.resultSentences[this.iCurrentSentenceNumber];
    this.currentDataSentenceObject = this.dataSentencesObjects[this.iCurrentSentenceNumber];
    this.currentResultSentence.classList.add('active');
    this.currentResultSentence.classList.add('current');

    document.querySelector('.data-container').innerHTML = '';
    document.querySelector('.data-container').append(this.currentDataSentence);
    this.checkGameStatus();
    this.showHintsAtBegin();
  }

  checkGameStatus() {
    const resultSentenceLength = document.querySelectorAll('.result__sentence.current>.data__word').length;
    const dataSentenceLength = this.currentDataSentenceObject.length;
    if (this.isSentenceCompleted === true) {
      console.log('this.isSentenceCompleted');
      this.showHintsAtEnd();
      continueButton.classList.remove('hidden');
      checkButton.classList.add('hidden');
      dontKnowButton.classList.add('hidden');
    } else if (dataSentenceLength === resultSentenceLength) {
      checkButton.classList.remove('hidden');
      console.log('dataSentenceLength === resultSentenceLength');
    } else if (dataSentenceLength !== resultSentenceLength) {
      console.log('dataSentenceLength !== resultSentenceLength');
      continueButton.classList.add('hidden');
      checkButton.classList.add('hidden');
      dontKnowButton.classList.remove('hidden');
    }



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
      localStorage.setItem('bckImage', 'true');
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
      this.translateCurrentSentence();
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

  checkCurrentSentence() {
    const sentenceErrors = this.currentDataSentenceObject.checkSentence();
    if (sentenceErrors === 0) {
      this.isSentenceCompleted = true;
    }
  }

  translateCurrentSentence() {
    this.currentDataSentenceObject.showSentenceTranslation();
  }

  buildCurrentSentence() {
    this.currentDataSentenceObject.buildSentence();
  }

  pronounceCurrentSentence() {
    this.currentDataSentenceObject.playSentenceSound();
  }

  showCurrentBckImage() {
    this.currentDataSentenceObject.showBckImage();
  }

  showHintsAtBegin() {
    if (localStorage.getItem('translation') === 'true') {
      this.translateCurrentSentence();
    }
    if (localStorage.getItem('sentencePronunciation') === 'true') {
      if ((localStorage.getItem('autoPronunciation') === 'true')) {
        this.pronounceCurrentSentence();
      }
    }
    if (localStorage.getItem('bckImage') === 'true') {
      console.log('show bckImage hint before');
      this.showCurrentBckImage();
    }
  }

  showHintsAtEnd() {
    if (!this.currentDataSentenceObject.bIsTranslationHintUsed) {
      this.translateCurrentSentence();
    }

    if (!this.currentDataSentenceObject.bIsPronunciationHintUsed) {
      if ((localStorage.getItem('autoPronunciation') === 'true')) {
        this.pronounceCurrentSentence();
      }
    }
    if (!this.currentDataSentenceObject.bIsBckImageHintUsed) {
      console.log('show bckImage hint after');
      this.showCurrentBckImage();
    }
  }
}
