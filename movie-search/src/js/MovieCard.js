export default class MovieCard {
    constructor({title, year, poster, imdbID, linkToVideoGallery, imdbRating}) {
        this.title = title;
        this.year = year;
        this.poster = poster;
        this.imdbID = imdbID;
        this.linkToVideoGallery = linkToVideoGallery;
        this.imdbRating = imdbRating;
    }

     createCardElement() {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${this.imdbID}`;
        return cardElement;
        
    }
}