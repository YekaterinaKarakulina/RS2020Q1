export default class Card {
    constructor({word, translation, imageSrc, audioSrc}) {
        this.word = word;
        this.translation = translation;
        this.imageSrc = imageSrc;
        this.audioSrc = audioSrc;
    }

    generateCard() {
        const card = document.createElement('div');
        card.classList.add(this.word);
        //console.log(card);
        return card;
    }
}