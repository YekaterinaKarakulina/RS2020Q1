import MovieCard from '../js/MovieCard';

describe('MovieCard.createCardElement', () => {
  it('Should be instance of function', () => {
    expect(MovieCard.prototype.createCardElement).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    const context = {
      title: 'Film',
      year: 2017,
      poster: 'linkToPoster',
      imdbID: 'id001',
      linkToVideoGallery: 'linkToVideogallery',
      imdbRating: 4.2,
    };
    document.body.appendChild(MovieCard.prototype.createCardElement.call(context));
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
