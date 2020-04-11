import Card from './Card';

export default class Cards {
    constructor(className) {
        this.className = className;
    }

    generateSectionCards(cardsArray) {
        let cardsContainer = document.createElement('div');
        cardsContainer.className = this.className;
        for(let i=0; i<cardsArray.length; i++) {
            cardsContainer.append((new Card(cardsArray[i])).generateCard());
        }
        console.log(cardsContainer);
        return cardsContainer;
        // add mode check
    }

    generateCategoryCards(cardsArray) {
        let cardsContainer = document.createElement('div');
        cardsContainer.className = this.className;
        for(let i=0; i<cardsArray.length; i++) {
            cardsContainer.append((new Card(cardsArray[i])).generateCard());
        }
        console.log(cardsContainer);
        return cardsContainer;
        // add mode check
      }
      
}