export default class Card {
  constructor({
    word, translation, imageSrc, audioSrc, sectionTitle, className,
  }) {
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

  createSoundBlock(className) {
    const soundElement = document.createElement('audio');
    soundElement.className = className;
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', this.audioSrc);
    sourceElement.setAttribute('type', 'audio/mpeg');
    soundElement.append(sourceElement);
    return soundElement;
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

  generateTrainPlayCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('train-card');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face');
    cardFront.classList.add('card-face-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face');
    cardBack.classList.add('card-face-back');
    cardBack.classList.add('hidden');

    const cardWord = document.createElement('div');
    cardWord.className = 'card-word';
    cardWord.innerHTML = this.word;

    const cardTranslation = document.createElement('div');
    cardTranslation.className = 'card-word';
    cardTranslation.innerHTML = this.translation;

    const cardIconFront = document.createElement('a');
    cardIconFront.className = 'card-icon';

    const rotateIconF = document.createElement('object');
    rotateIconF.className = 'icon-rotate';
    rotateIconF.setAttribute('type', 'image/svg+xml');
    rotateIconF.setAttribute('data', './src/assets/images/rotate.svg');

    const rotateIconB = document.createElement('object');
    rotateIconB.className = 'icon-rotate';
    rotateIconB.setAttribute('type', 'image/svg+xml');
    rotateIconB.setAttribute('data', './src/assets/images/rotate.svg');

    const cardIconBack = document.createElement('a');
    cardIconBack.className = 'card-icon';

    cardIconFront.append(rotateIconF);
    cardIconBack.append(rotateIconB);

    const cardDescriptionFront = document.createElement('div');
    cardDescriptionFront.className = 'card-description';
    cardDescriptionFront.append(cardWord);
    cardDescriptionFront.append(cardIconFront);

    const cardDescriptionBack = document.createElement('div');
    cardDescriptionBack.className = 'card-description';
    cardDescriptionBack.append(cardTranslation);
    cardDescriptionBack.append(cardIconBack);

    cardFront.append(this.createImgBlock('card-image'));
    cardFront.append(this.createSoundBlock('card-sound'));
    cardFront.append(cardDescriptionFront);

    cardBack.append(this.createImgBlock('card-image'));
    cardBack.append(cardDescriptionBack);

    card.append(cardFront);
    card.append(cardBack);

    return card;
  }
}
