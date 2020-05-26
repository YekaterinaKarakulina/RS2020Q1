import './sass/style.scss';
import '@babel/polyfill';
import requestToAPIs from './js/requestToAPIs';
import { transferTemperature } from './js/utils';
import clock from './js/clock';
import renderData from './js/render/renderData';
import getUserGeolocation from './js/APIs/userGeolocationAPI';

async function init() {
  const userGeolocation = await getUserGeolocation();
  const { city } = userGeolocation;
  const appObj = await requestToAPIs(city);
  renderData(appObj);
  clock();
}

init();


async function searchFromInputForm(city) {
  if (city.match(/[!@#$%^&*()_+=]/g)) {
    alert('Unappropriate city name, try another city');
  } else if (city.length <= 3) {
    alert('Too short city name, minimum length is 4 symbols');
  } else if (city.length > 3) {
    const appObj = await requestToAPIs(city);
    renderData(appObj);
  }
}


document.querySelector('.submit__button').addEventListener('click', (event) => {
  const cityInput = document.querySelector('.input__city');
  cityInput.focus();
  event.preventDefault();
  const city = cityInput.value;
  searchFromInputForm(city);
});

document.querySelector('.tempInput').addEventListener('click', () => {
  const tempElements = document.querySelectorAll('.temperature');
  transferTemperature(tempElements);
});
