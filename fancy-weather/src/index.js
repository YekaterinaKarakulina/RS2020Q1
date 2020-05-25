import './sass/style.scss';
import '@babel/polyfill';
import requestFromUserLocation from './js/requestFromUserLocation';
import requestFromSearchForm from './js/requestFromSearchForm';
import { transferTemperature } from './js/utils';
import renderImage from './js/render/renderImage';
import clock from './js/clock';

requestFromUserLocation();
clock();

localStorage.setItem('isCelsius', 'true');


document.querySelector('.submit__button').addEventListener('click', (event) => {
  event.preventDefault();
  const city = document.querySelector('.input__city').value;
  requestFromSearchForm(city);
});

document.querySelector('.tempInput').addEventListener('click', () => {
  transferTemperature();
});
