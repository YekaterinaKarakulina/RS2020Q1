import Card from './Card';

export default class Cards {
  constructor(className) {
    this.className = className;
  }

  generateCards(cardsArray) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.className;
    for (let i = 0; i < cardsArray.length; i++) {
      cardsContainer.append((new Card(cardsArray[i])).generateSectionCard());
    }
    console.log(cardsContainer);
    return cardsContainer;
  }


  generateTrainCards(cardsArray) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.className;
    for (let i = 0; i < cardsArray.length; i++) {
      cardsContainer.append((new Card(cardsArray[i])).generateTrainCard());
    }
    console.log(cardsContainer);
    return cardsContainer;
  }

  generatePlayCards(cardsArray) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = this.className;
    for (let i = 0; i < cardsArray.length; i++) {
      cardsContainer.append((new Card(cardsArray[i])).generatePlayCard());
    }
    console.log(cardsContainer);
    return cardsContainer;
  }
}
