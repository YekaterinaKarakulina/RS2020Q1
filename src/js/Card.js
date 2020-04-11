export default class Card {
    constructor({word, translation, imageSrc, audioSrc, sectionTitle, className}) {
        this.word = word;
        this.translation = translation;
        this.imageSrc = imageSrc;
        this.audioSrc = audioSrc;
        this.sectionTitle = sectionTitle;
        this.className = className;
    }

    generateCard() {
        const card = document.createElement('div');
        card.classList.add('card');

        if(this.sectionTitle) {
            card.classList.add('sectionCard');
            card.classList.add(this.className);
            card.append(this.createImgBlock('sectionImage'));
            card.append(this.createSectionTitle());
        }
        if(this.word) {
            card.classList.add('trainCard');
            card.append(this.createImgBlock('tytyt','trainImage'));
            const wordDescription = document.createElement('div');
            wordDescription.className = 'wordDescription';
            wordDescription.innerHTML = this.word;
            const rotateElement = document.createElement('div');//add svg
            rotateElement.className = 'rotateElement';
            const wordDescriptionContainer = document.createElement('div');
            wordDescriptionContainer.className = 'wordDescriptionContainer';
            wordDescriptionContainer.append(wordDescription);
            wordDescriptionContainer.append(rotateElement);
            card.append(wordDescriptionContainer);
        }
       
        //card.classList.add(this.word);
        return card;
    }

    createImgBlock(sectionImage) {
        const imageElement = document.createElement('div');
        imageElement.className = sectionImage;
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