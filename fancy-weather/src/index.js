import './sass/style.scss';
import '@babel/polyfill';
import requestFromUserLocation from './js/requestFromUserLocation';
import requestFromSearchForm from './js/requestFromSearchForm';
import { transferTemperature } from './js/utils';
import renderImage from './js/render/renderImage';
import clock from './js/clock';
import getImage from './js/APIs/imagesAPI';
import renderData from './js/render/renderData';
import renderMap from './js/APIs/mapsAPI';

async function init() {
  const promises = [requestFromUserLocation(), getImage()];
  const results = await Promise.all(promises);
  if (results) {
    const { lat, lng } = results[0];
    renderImage(results[1]);
    renderData(results[0]);
    renderMap(lat, lng);
  }
}


init();
clock();

async function initSearch(city) {
  const promises = [requestFromSearchForm(city), getImage()];
  const results = await Promise.all(promises);
  if (results) {
    const { lat, lng } = results[0];
    renderImage(results[1]);
    renderData(results[0]);
    renderMap(lat, lng);
  }
}

document.querySelector('.submit__button').addEventListener('click', (event) => {
  event.preventDefault();
  const city = document.querySelector('.input__city').value;
  initSearch(city);
});

document.querySelector('.tempInput').addEventListener('click', () => {
  const tempElements = document.querySelectorAll('.temperature');
  transferTemperature(tempElements);
});
