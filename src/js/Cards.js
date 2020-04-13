import Card from './Card';

export default class Cards {
    constructor(className) {
        this.className = className;
    }

    generateCards(cardsArray) {
        let cardsContainer = document.createElement('div');
        cardsContainer.className = this.className;
        for(let i=0; i<cardsArray.length; i++) {
            cardsContainer.append((new Card(cardsArray[i])).generateSectionCard());
        }
        console.log(cardsContainer);
        return cardsContainer;
        // add mode check
    }

    
    generateTrainCards(cardsArray) {
        let cardsContainer = document.createElement('div');
        cardsContainer.className = this.className;
        for(let i=0; i<cardsArray.length; i++) {
            cardsContainer.append((new Card(cardsArray[i])).generateTrainCard());
        }
        console.log(cardsContainer);
        return cardsContainer;
        // add mode check
      }

      generatePlayCards(cardsArray) {
        let cardsContainer = document.createElement('div');
        cardsContainer.className = this.className;
        for(let i=0; i<cardsArray.length; i++) {
            cardsContainer.append((new Card(cardsArray[i])).generatePlayCard());
        }
        console.log(cardsContainer);
        return cardsContainer;
        // add mode check
      }
      
}