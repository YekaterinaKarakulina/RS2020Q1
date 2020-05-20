import './sass/style.scss';
import '@babel/polyfill';
import getUserGeolocation from './js/geolocationAPI';
import renderGeolocationInfo from './js/renderData';

async function init() {
  const userGeolocation = await getUserGeolocation();
  console.log(userGeolocation);
  renderGeolocationInfo(userGeolocation);
}

init();
