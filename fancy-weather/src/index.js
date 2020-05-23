import './sass/style.scss';
import '@babel/polyfill';
import requestFromUserLocation from './js/requestFromUserLocation';
import renderImage from './js/render/renderImage';
import clock from './js/clock';

requestFromUserLocation();
clock();
renderImage();
