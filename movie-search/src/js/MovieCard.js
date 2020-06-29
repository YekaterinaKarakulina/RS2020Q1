export default class MovieCard {
  constructor({
    title, year, poster, imdbID, linkToVideoGallery, imdbRating,
  }) {
    this.title = title;
    this.year = year;
    this.poster = poster;
    this.imdbID = imdbID;
    this.linkToVideoGallery = linkToVideoGallery;
    this.imdbRating = imdbRating;
  }

  createCardElement() {
    const cardElement = document.createElement('div');
    cardElement.className = 'swiper-slide';

    const cardHeader = document.createElement('a');
    cardHeader.className = 'card__header';
    cardHeader.setAttribute('href', this.linkToVideoGallery);
    cardHeader.text = this.title;

    const cardBody = document.createElement('div');
    cardBody.className = 'card__body';
    if (this.poster !== 'N/A') {
      cardBody.setAttribute('style', `background-image: url(${this.poster})`);
    } else {
      cardBody.innerText = 'Image not found';
    }

    const year = document.createElement('span');
    year.className = 'movieYear';
    year.innerHTML = `${this.year} year`;

    const rating = document.createElement('span');
    rating.className = 'movieRating';
    rating.innerHTML = `IMDb rating: ${this.imdbRating}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card__footer';
    cardFooter.append(year);
    cardFooter.append(rating);

    cardElement.append(cardHeader);
    cardElement.append(cardBody);
    cardElement.append(cardFooter);

    return cardElement;
  }
}
