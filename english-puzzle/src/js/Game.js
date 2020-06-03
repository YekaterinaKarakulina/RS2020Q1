import getData from './wordsAPI';
import Sentence from './Sentence';

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

    console.log(this.dataSentences);
    console.log(fragment);

    document.querySelector('.results-container').append(fragment);

    this.bIsRoundInProgress = true;
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => this.resultSentences.push(el));

    const currentSentence = this.resultSentences[this.iCurrentSentenceNumber];
    currentSentence.classList.add('active');

    document.querySelector('.data-container').append(this.dataSentences[this.iCurrentSentenceNumber]);

    return this.game;
  }

  checkGameStatus() {
    const resultSentenceLength = document.querySelectorAll('.result__sentence.active>.data__word').length;
    const dataSentenceLength = this.dataSentencesObjects[this.iCurrentSentenceNumber].length;
    if (dataSentenceLength === resultSentenceLength) {
      console.log('dataSentenceLength === resultSentenceLength');
      this.bIsSentenceBuild = true;
    } else {
      console.log('dataSentenceLength !== resultSentenceLength');
      this.bIsSentenceBuild = false;
    }

    if (this.bIsSentenceBuild === true && this.bIsSentenceCorrect === true) {
      document.querySelector('.footer__buttons>.continue').classList.remove('hidden');
      document.querySelector('.footer__buttons>.check').classList.add('hidden');
      document.querySelector('.footer__buttons>.dontKnow').classList.add('hidden');
    } else if (this.bIsSentenceBuild === true && this.bIsSentenceCorrect === false) {
      document.querySelector('.footer__buttons>.dontKnow').classList.remove('hidden');
      document.querySelector('.footer__buttons>.check').classList.remove('hidden');
      document.querySelector('.footer__buttons>.continue').classList.add('hidden');
    } else if (this.bIsSentenceBuild === true) {
      document.querySelector('.footer__buttons>.dontKnow').classList.add('hidden');
      document.querySelector('.footer__buttons>.check').classList.remove('hidden');
    } else if (this.bIsSentenceBuild === false) {
      document.querySelector('.footer__buttons>.check').classList.add('hidden');
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
}
