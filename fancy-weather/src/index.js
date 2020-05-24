import './sass/style.scss';
import '@babel/polyfill';
import requestFromUserLocation from './js/requestFromUserLocation';
import requestFromSearchForm from './js/requestFromSearchForm';
import renderImage from './js/render/renderImage';
import clock from './js/clock';

requestFromUserLocation();
clock();

document.querySelector('.submit__button').addEventListener('click', (event) => {
  event.preventDefault();
  const city = document.querySelector('.input__city').value;
  requestFromSearchForm(city);
});
