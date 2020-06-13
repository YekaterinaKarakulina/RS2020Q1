import Sentence from './Sentence';
import { getPageData, getPagesAmountInLevel } from './wordsAPI';
import { checkActiveHintsBeforeGame } from './utils';
import { getGameProgressFromUserSetting, setGameProgressToUserSetting } from './userAPI';
import {
  IDONTKNOWBUTTON, CHECKBUTTON, CONTINUEBUTTON, RESULTBUTTON,
  SELECTPAGECONTAINER, SELECTLEVELOPTION, SELECTPAGEOPTION,
} from './constants';

export default class Game {
  constructor({ level, page }) {
    this.iLevel = level;
    this.iPage = page;
    this.isFinished = false;
  }

  async startLevel(pagesAmountInLevel) {
    this.pagesAmountInLevel = pagesAmountInLevel;
    const fr = document.createDocumentFragment();
    for (let i = 1; i <= pagesAmountInLevel; i += 1) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      fr.append(opt);
    }
    SELECTPAGECONTAINER.innerHTML = '';
    SELECTPAGECONTAINER.append(fr);
  }

  async renderRoundData() {
    const fragment = document.createDocumentFragment();

    const userObj = {
      userId: localStorage.getItem('userId'),
      userToken: localStorage.getItem('userToken'),
    };
    const gameProgress = await getGameProgressFromUserSetting(userObj);

    this.iLevel = parseInt(gameProgress.level, 10);
    this.iPage = parseInt(gameProgress.page, 10);
    SELECTLEVELOPTION.value = this.iLevel;
    SELECTPAGEOPTION.value = this.iPage;

    const roundData = await getPageData(this.iLevel, this.iPage);
    roundData.forEach((el) => {
      let sentence = new Sentence(el);
      this.dataSentencesObjects.push(sentence);
      sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
      sentence.status = 'iKnow';
      sentence = sentence.createDataSentence();
      this.dataSentences.push(sentence);
      const sentenceContainer = document.createElement('div');
      sentenceContainer.className = 'sentence result__sentence';
      fragment.append(sentenceContainer);
    });

    document.querySelector('.results-container').innerHTML = '';
    document.querySelector('.results-container').append(fragment);
  }

  async startRound() {
    this.dataSentencesObjects = [];
    this.dataSentences = [];
    this.resultSentences = [];
    this.iCurrentSentenceNumber = 0;
    this.isSentenceCompleted = false;

    CHECKBUTTON.classList.add('hidden');
    CONTINUEBUTTON.classList.add('hidden');
    RESULTBUTTON.classList.add('hidden');
    await this.renderRoundData();
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));
    checkActiveHintsBeforeGame();
    this.startSentence();
  }

  startSentence() {
    document.querySelector('.hints-sentence').textContent = '';
    this.isSentenceCompleted = false;
    const dataWords = document.querySelectorAll('.result__sentence.current>.word-container');
    dataWords.forEach((el) => el.classList.remove('true'));
    this.resultSentences.forEach((el) => el.classList.remove('current'));
    this.currentDataSentence = this.dataSentences[this.iCurrentSentenceNumber];
    this.currentResultSentence = this.resultSentences[this.iCurrentSentenceNumber];
    this.currentDataSentenceObject = this.dataSentencesObjects[this.iCurrentSentenceNumber];
    this.currentResultSentence.classList.add('active');
    this.currentResultSentence.classList.add('current');

    for (let i = 0; i < this.currentDataSentenceObject.length; i += 1) {
      const wordContainer = document.createElement('span');
      wordContainer.className = 'word-container';
      this.currentResultSentence.append(wordContainer);
    }
    document.querySelector('.data-container').innerHTML = '';
    document.querySelector('.data-container').append(this.currentDataSentence);
    this.checkGameStatus();
    this.showHintsAtBegin();
  }

  async startNewLevelRound() {
    this.isFinished = false;
    await this.updateUserSettings();
    const pagesAmountInLevel = await getPagesAmountInLevel(this.iLevel);
    await this.startLevel(pagesAmountInLevel);
    this.startRound();
  }

  async startCurrentLevelRound() {
    this.isFinished = false;
    await this.updateUserSettings();
    this.startRound();
  }

  async updateUserSettings() {
    const obj = {
      userId: localStorage.getItem('userId'),
      userToken: localStorage.getItem('userToken'),
      gameProgress: {
        wordsPerDay: 100,
        optional: {
          level: this.iLevel,
          page: this.iPage,
        },
      },
    };
    await setGameProgressToUserSetting(obj);
  }

  checkGameStatus() {
    const resultSentenceLength = document.querySelectorAll('.result__sentence.current>.word-container>.data__word').length;
    const dataSentenceLength = this.currentDataSentenceObject.length;
    if (this.isSentenceCompleted === true) {
      this.showHintsAtEnd();
      checkActiveHintsBeforeGame();
      CONTINUEBUTTON.classList.remove('hidden');
      CHECKBUTTON.classList.add('hidden');
      IDONTKNOWBUTTON.classList.add('hidden');
    } else if (dataSentenceLength === resultSentenceLength) {
      CHECKBUTTON.classList.remove('hidden');
    } else if (dataSentenceLength !== resultSentenceLength) {
      CONTINUEBUTTON.classList.add('hidden');
      CHECKBUTTON.classList.add('hidden');
      IDONTKNOWBUTTON.classList.remove('hidden');
    }
  }

  checkCurrentSentence() {
    const sentenceErrors = this.currentDataSentenceObject.checkSentence();
    if (sentenceErrors === 0) {
      this.isSentenceCompleted = true;
      this.iCurrentSentenceNumber += 1;
    }
    if (this.iCurrentSentenceNumber === 10) {
      RESULTBUTTON.classList.remove('hidden');
    }
  }

  translateCurrentSentence() {
    this.currentDataSentenceObject.showSentenceTranslation();
  }

  buildCurrentSentence() {
    this.currentDataSentenceObject.status = 'iDontKnow';
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
      this.showCurrentBckImage();
    }
  }
}
