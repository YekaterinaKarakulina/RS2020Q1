import Sentence from './Sentence';
import initData from './dataUtils';

export default class Game {
  constructor(level, round) {
    this.iLevel = level;
    this.iRound = round;
    this.bIsRoundInProgress = false;
    this.iCurrentSentenceNumber = 0;
    this.bIsSentenceBuild = false;
    this.bIsSentenceCorrect = false;
    this.dataSentencesObjects = [];
    this.dataSentences = [];
    this.resultSentences = [];
  }

  async startGame() {
    this.bIsRoundInProgress = true;
    const fragment = document.createDocumentFragment();
    const roundData = await initData(this.iLevel, this.iRound);
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

    document.querySelector('.results-container').append(fragment);
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));

    this.next();
    return this.game;
  }

  next() {
    if (this.iCurrentSentenceNumber <= 3) {
      this.bIsSentenceBuild = false;
      this.bIsSentenceCorrect = false;
      const dataWords = document.querySelectorAll('.result__sentence.current>.data__word');
      dataWords.forEach((el) => el.classList.remove('true'));
      this.resultSentences.forEach((el) => el.classList.remove('current'));
      this.currentDataSentence = this.dataSentences[this.iCurrentSentenceNumber];
      this.currentResultSentence = this.resultSentences[this.iCurrentSentenceNumber];
      this.currentDataSentenceObject = this.dataSentencesObjects[this.iCurrentSentenceNumber];
      this.currentResultSentence.classList.add('active');
      this.currentResultSentence.classList.add('current');

      document.querySelector('.data-container').append(this.currentDataSentence);
      this.checkGameStatus();
      this.showHintsAtBegin();
    } else {
      console.log('new round');
    }
  }

  checkGameStatus() {
    const resultSentenceLength = document.querySelectorAll('.result__sentence.current>.data__word').length;
    const dataSentenceLength = this.currentDataSentenceObject.length;
    if (dataSentenceLength === resultSentenceLength) {
      this.bIsSentenceBuild = true;
    } else {
      this.bIsSentenceBuild = false;
    }

    const dontKnowButton = document.querySelector('.footer__buttons>.dontKnow');
    const checkButton = document.querySelector('.footer__buttons>.check');
    const continueButton = document.querySelector('.footer__buttons>.continue');

    if (this.bIsSentenceBuild === true && this.bIsSentenceCorrect === true) {
      continueButton.classList.remove('hidden');
      checkButton.classList.add('hidden');
      dontKnowButton.classList.add('hidden');
      this.iCurrentSentenceNumber += 1;
      console.log(this.iCurrentSentenceNumber);
      console.log('next');
    } else if (this.bIsSentenceBuild === true && this.bIsSentenceCorrect === false) {
      dontKnowButton.classList.remove('hidden');
      checkButton.classList.remove('hidden');
      continueButton.classList.add('hidden');
    } else if (this.bIsSentenceBuild === true) {
      dontKnowButton.classList.add('hidden');
      checkButton.classList.remove('hidden');
    } else if (this.bIsSentenceBuild === false) {
      checkButton.classList.add('hidden');
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
      document.querySelector('.hints-sentence').textContent = '';
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
      this.bIsSentenceCorrect = true;
    } else {
      this.bIsSentenceCorrect = false;
    }
  }

  translateCurrentSentence() {
    this.currentDataSentenceObject.showSentenceTranslation();
  }

  buildCurrentSentence() {
    this.currentDataSentenceObject.buildSentence();
  }

  autoPronounceCurrentSentence() {
    this.currentDataSentenceObject.playSentenceSound();
  }

  showHintsAtBegin() {
    if (localStorage.getItem('autoPronunciation') === 'true') {
      this.autoPronounceCurrentSentence();
    }
    if (localStorage.getItem('translation') === 'true') {
      this.translateCurrentSentence();
    }
    if (localStorage.getItem('bckImage') === 'true') {
      console.log('show bckImage');
    }
  }

  showHintsAtEnd() {
    if (!this.currentDataSentenceObject.bIsTranslationHintUsed) {
      this.translateCurrentSentence();
    }
  }
}
