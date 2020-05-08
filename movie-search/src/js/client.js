import printSearchResults from './searchResults';

const apiKey = '5964eff4';

async function translate(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
}

async function getMovieImdbRating(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getMovieInfo(title, page) {
  const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  printSearchResults(title, data);
  return data;
}

export { translate, getMovieImdbRating, getMovieInfo };
