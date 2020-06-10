import Sentence from './Sentence';
import { getPageData, getPagesAmountInLevel } from './wordsAPI';
import { checkActiveHintsBeforeGame } from './utils';

const dontKnowButton = document.querySelector('.game__buttons>.dontKnow');
const checkButton = document.querySelector('.game__buttons>.check');
const continueButton = document.querySelector('.game__buttons>.continue');
const resultsButton = document.querySelector('.game__buttons>.results');

export default class Game {
  constructor(level, page) {
    this.iLevel = level;
    this.iPage = page;
    this.isFinished = false;
  }

  async startLevel() {
    const pagesAmountInLevel = await getPagesAmountInLevel(this.iLevel);
    this.pagesAmountInLevel = pagesAmountInLevel;
    console.log(this.iLevel, this.pagesAmountInLevel);
    if (pagesAmountInLevel) {
      // console.log(pagesAmountInLevel);
      const fr = document.createDocumentFragment();
      for (let i = 1; i <= pagesAmountInLevel; i += 1) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        fr.append(opt);
      }
      document.querySelector('.select__page>select').innerHTML = '';
      document.querySelector('.select__page>select').append(fr);
    }
  }

  async printRoundData() {
    const fragment = document.createDocumentFragment();
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

  async renderRoundData() {
    console.log(`level ${this.iLevel}, page ${this.iPage}`);
    this.dataSentencesObjects = [];
    this.dataSentences = [];
    this.resultSentences = [];
    this.iCurrentSentenceNumber = 0;
    this.isSentenceCompleted = false;

    checkButton.classList.add('hidden');
    continueButton.classList.add('hidden');
    resultsButton.classList.add('hidden');
    
    await this.printRoundData();
    // const fragment = document.createDocumentFragment();

    // const roundData = await getPageData(this.iLevel, this.iPage);
    // console.log(roundData);
    // roundData.forEach((el) => {
    //   let sentence = new Sentence(el);
    //   this.dataSentencesObjects.push(sentence);
    //   sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
    //   sentence.status = 'iKnow';
    //   sentence = sentence.createDataSentence();
    //   this.dataSentences.push(sentence);
    //   const sentenceContainer = document.createElement('div');
    //   sentenceContainer.className = 'sentence result__sentence';
    //   fragment.append(sentenceContainer);
    // });

    console.log(this.dataSentencesObjects);

    // document.querySelector('.results-container').innerHTML = '';
    // document.querySelector('.results-container').append(fragment);
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));

    checkActiveHintsBeforeGame();
    this.next();
  }

  // async startGame() {
    // console.log(`level ${this.iLevel}, page ${this.iPage}`);
    // this.dataSentencesObjects = [];
    // this.dataSentences = [];
    // this.resultSentences = [];
    // this.iCurrentSentenceNumber = 0;
    // this.isSentenceCompleted = false;

    // checkButton.classList.add('hidden');
    // continueButton.classList.add('hidden');
    // resultsButton.classList.add('hidden');

    // const pagesAmountInLevel = await getPagesAmountInLevel(this.iLevel);
    // this.pagesAmountInLevel = pagesAmountInLevel;
    // if (pagesAmountInLevel) {
    //   console.log(pagesAmountInLevel);
    //   const fr = document.createDocumentFragment();
    //   for (let i = 1; i <= pagesAmountInLevel; i += 1) {
    //     const opt = document.createElement('option');
    //     opt.value = i;
    //     opt.textContent = i;
    //     fr.append(opt);
    //   }
    //   document.querySelector('.select__page>select').innerHTML = '';
    //   document.querySelector('.select__page>select').append(fr);
    // }

    // const fragment = document.createDocumentFragment();
    // const roundData = await getPageData(this.iLevel, this.iPage);
    // console.log(roundData);
    // roundData.forEach((el) => {
    //   let sentence = new Sentence(el);
    //   this.dataSentencesObjects.push(sentence);
    //   sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
    //   sentence.status = 'iKnow';
    //   sentence = sentence.createDataSentence();
    //   this.dataSentences.push(sentence);
    //   const sentenceContainer = document.createElement('div');
    //   sentenceContainer.className = 'sentence result__sentence';
    //   fragment.append(sentenceContainer);
    // });

    // console.log(this.dataSentencesObjects);

    // document.querySelector('.results-container').innerHTML = '';
    // document.querySelector('.results-container').append(fragment);
    // document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));

    // checkActiveHintsBeforeGame();
    // this.next();
  // }

  startNewLevelRound() {
    console.log('new level round');
    this.startLevel();
    this.renderRoundData();
    // if (this.iLevel <= 5) {
    //   this.startLevel();
    //   this.renderRoundData();
    // } else {
    //   console.log('levels end!!!');
    // }
    
  }

  startCurrentLevelRound() {
    console.log('cur level round');
    this.renderRoundData();
    // if (this.iPage < this.pagesAmountInLevel) {
    //   this.renderRoundData();
    // } else {
    //   console.log('pages end!!!');
    // }
  }

  next() {
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
    console.log(this.dataSentencesObjects);
  }

  checkGameStatus() {
    const resultSentenceLength = document.querySelectorAll('.result__sentence.current>.word-container>.data__word').length;
    const dataSentenceLength = this.currentDataSentenceObject.length;
    if (this.isSentenceCompleted === true) {
      console.log('this.isSentenceCompleted = true');
      this.showHintsAtEnd();
      checkActiveHintsBeforeGame();
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
    // console.log(this.isSentenceCompleted);
    // console.log(`autoPronunciation ${localStorage.getItem('autoPronunciation')}`);
    // console.log(`translation ${localStorage.getItem('translation')}`);
    // console.log(`sentencePronunciation ${localStorage.getItem('sentencePronunciation')}`);
    // console.log(`bckImage ${localStorage.getItem('bckImage')}`);

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
