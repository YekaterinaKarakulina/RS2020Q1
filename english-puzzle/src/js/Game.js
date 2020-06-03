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
  }

  async startGame() {
    const dataSentences = [];
    const resultSentences = [];
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
      sentence.textExample = sentence.textExample.replace(/<b>/, '').replace(/<\/b>/, '');
      sentence = sentence.createDataSentence();
      dataSentences.push(sentence);

      const sentenceContainer = document.createElement('div');
      sentenceContainer.className = 'sentence result__sentence';
      fragment.append(sentenceContainer);
    });

    console.log(dataSentences);
    console.log(fragment);

    document.querySelector('.results-container').append(fragment);

    this.bIsRoundInProgress = true;
    document.querySelectorAll('.results-container>.result__sentence').forEach((el) => resultSentences.push(el));

    const currentSentence = resultSentences[this.iCurrentSentenceNumber];
    currentSentence.classList.add('active');

    document.querySelector('.data-container').append(dataSentences[this.iCurrentSentenceNumber]);

    return this.game;
  }
}
