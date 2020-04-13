export default class Card {
    constructor({word, translation, imageSrc, audioSrc, sectionTitle, className}) {
        this.word = word;
        this.translation = translation;
        this.imageSrc = imageSrc;
        this.audioSrc = audioSrc;
        this.sectionTitle = sectionTitle;
        this.className = className;
    }

    createSectionTitle() {
        const sectionTitleElem = document.createElement('div');
        sectionTitleElem.classList.add('section-title');
        sectionTitleElem.classList.add(this.className);
        sectionTitleElem.innerHTML = this.sectionTitle;
        return sectionTitleElem;
    }

    createImgBlock(className) {
        const imageElement = document.createElement('div');
        imageElement.className = className;
        imageElement.setAttribute('style', `background-image: url(${this.imageSrc});`);
       return imageElement; 
    }

    generateSectionCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('section-card');
        card.classList.add(this.className);
        card.append(this.createImgBlock('section-image'));
        card.append(this.createSectionTitle());
        return card;
    }


    generateTrainCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('train-card');
        card.append(this.createImgBlock('card-image'));
        const cardWord = document.createElement('div');
        cardWord.className = 'card-word';
        cardWord.innerHTML = this.word;
        const cardIcon = document.createElement('div');
        cardIcon.className = 'card-icon';
        const rotateIcon = document.createElement('object');
        rotateIcon.className = 'icon-rotate';
        rotateIcon.setAttribute('type', `image/svg+xml`);
        rotateIcon.setAttribute('data', `./src/assets/images/rotate.svg`);
        const wordDescription = document.createElement('div');
        wordDescription.className = 'card-description';
        cardIcon.append(rotateIcon);
        wordDescription.append(cardWord);
        wordDescription.append(cardIcon);
        card.append(wordDescription);  
        return card;
    }

    generatePlayCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('play-card');
        card.append(this.createImgBlock('card-image'));
        return card;
    }
 
}