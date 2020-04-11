export default class Card {
    constructor({word, translation, imageSrc, audioSrc, sectionTitle, className}) {
        this.word = word;
        this.translation = translation;
        this.imageSrc = imageSrc;
        this.audioSrc = audioSrc;
        this.sectionTitle = sectionTitle;
        this.className = className;
    }

    generateSectionCard() {
        const card = document.createElement('div');
        card.classList.add('card');
            card.classList.add('sectionCard');
            card.classList.add(this.className);
            card.append(this.createImgBlock('sectionImage'));
            card.append(this.createSectionTitle());
        return card;
    }


    generateTrainCard() {
        const card = document.createElement('div');
        card.classList.add('card');
            card.classList.add('trainCard');

            card.append(this.createImgBlock('cardImage'));

            const cardWord = document.createElement('div');
            cardWord.className = 'cardWord';
            cardWord.innerHTML = this.word;

            const cardIcon = document.createElement('div');
            cardIcon.className = 'cardIcon';

            const rotateIcon = document.createElement('object');
            rotateIcon.className = 'iconRotate';
            rotateIcon.setAttribute('type', `image/svg+xml`);
            rotateIcon.setAttribute('data', `./src/assets/images/rotate.svg`);
            const wordDescription = document.createElement('div');
            wordDescription.className = 'wordDescription';
            cardIcon.append(rotateIcon);
            wordDescription.append(cardWord);
            wordDescription.append(cardIcon);

            card.append(wordDescription);
          
        return card;
    }



    createImgBlock(className) {
        const imageElement = document.createElement('div');
        imageElement.className = className;
        imageElement.setAttribute('style', `background-image: url(${this.imageSrc});`);
       return imageElement; 
    }

    createSectionTitle() {
        const sectionTitleElem = document.createElement('div');
        sectionTitleElem.classList.add('sectionTitle');
        sectionTitleElem.classList.add(this.className);
        sectionTitleElem.innerHTML = this.sectionTitle;
        return sectionTitleElem;
    }
}