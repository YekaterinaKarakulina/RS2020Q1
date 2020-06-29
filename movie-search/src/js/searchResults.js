import { searchResultsTitle, searchResultsMessage, searchErrorMessage } from './constants';

function renderSearchResults(resultsTitle, movieTitle, errorMessage) {
  searchResultsTitle.textContent = resultsTitle;
  searchResultsMessage.textContent = movieTitle;
  searchErrorMessage.textContent = errorMessage;
}

export default function printSearchResults(movieTitle, data, errorMessage) {
  if (data.Response === 'True') {
    renderSearchResults('Showing results for: ', movieTitle, '');
  } else if (errorMessage) {
    renderSearchResults('', '', errorMessage);
  } else {
    switch (data.Error) {
      case 'Movie not found!':
        renderSearchResults('No results for: ', movieTitle, '');
        break;
      default:
        renderSearchResults('', '', data.Error);
        break;
    }
  }
}
