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
            card.classList.add(this.className);
            card.appendChild(this.createImgBlock());
            card.append(this.createSectionTitle());
        }
       
        //card.classList.add(this.word);
        return card;
    }

    createImgBlock() {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'sectionImage';
        const img = document.createElement('img');
        img.setAttribute('src', this.imageSrc);
        imgContainer.append(img);
        return imgContainer;
    }

    createSectionTitle() {
        const sectionTitleElem = document.createElement('div');
        sectionTitleElem.classList.add(this.className);
        sectionTitleElem.innerHTML = this.sectionTitle;
        return sectionTitleElem;
    }
}