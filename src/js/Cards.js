import Card from './Card';

export default class Cards {
  constructor(className) {
    this.className = className;
  }

  generateCards(cardsArray) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.className;
    for (let i = 0; i < cardsArray.length; i += 1) {
      cardsContainer.append((new Card(cardsArray[i])).generateSectionCard());
    }
    return cardsContainer;
  }

  generateTrainPlayCards(cardsArray) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.className;
    for (let i = 0; i < cardsArray.length; i += 1) {
      cardsContainer.append((new Card(cardsArray[i])).generateTrainPlayCard());
    }
    return cardsContainer;
  }
}
