import getData from './wordsAPI';
import Sentence from './Sentence';

export default class Game {
  constructor(level, round, hints) {
    this.iLevel = level;
    this.iRound = round;
    this.bIsRoundInProgress = false;
    this.iCurrentSentenceNumber = 0;
    this.bIsSentenceBuild = false;
    this.bIsSentenceCorrect = false;
    this.dataSentencesObjects = [];
    this.dataSentences = [];
    this.resultSentences = [];
    this.hints = hints;
  }

  async startGame() {
    this.bIsRoundInProgress = true;
    const data = await getData(0, 0);
    const roundData = [];
    const fragment = document.createDocumentFragment();
    Array.from(data).forEach((value, index) => {
      if (index >= 0 && index <= 9) {
        roundData.push(data[index]);
      }
    });

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

    this.bIsRoundInProgress = true;
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));

    const currentSentence = this.resultSentences[this.iCurrentSentenceNumber];
    currentSentence.classList.add('active');

    document.querySelector('.data-container').append(this.dataSentences[this.iCurrentSentenceNumber]);
    this.checkGameStatus();
    this.showHintsAtBegin();
    return this.game;
  }

  checkGameStatus() {
    const resultSentenceLength = document.querySelectorAll('.result__sentence.active>.data__word').length;
    const dataSentenceLength = this.dataSentencesObjects[this.iCurrentSentenceNumber].length;
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
    const currentSentence = this.dataSentencesObjects[this.iCurrentSentenceNumber];
    const sentenceErrors = currentSentence.checkSentence();
    if (sentenceErrors === 0) {
      this.bIsSentenceCorrect = true;
    } else {
      this.bIsSentenceCorrect = false;
    }
  }

  translateCurrentSentence() {
    const currentSentence = this.dataSentencesObjects[this.iCurrentSentenceNumber];
    currentSentence.showSentenceTranslation();
  }

  buildCurrentSentence() {
    const currentSentence = this.dataSentencesObjects[this.iCurrentSentenceNumber];
    currentSentence.buildSentence();
  }

  autoPronounceCurrentSentence() {
    const currentSentence = this.dataSentencesObjects[this.iCurrentSentenceNumber];
    currentSentence.playSentenceSound();
  }

  showHintsAtBegin() {
    if (localStorage.getItem('autoPronunciation') === 'true') {
      this.autoPronounceCurrentSentence();
    }
    if (localStorage.getItem('translation') === 'true') {
      this.translateCurrentSentence();
    }
    if (localStorage.getItem('bckImage') === 'true') {
      console.log('bckImage');
    }
  }

  showHintsAtEnd() {

  }

}
