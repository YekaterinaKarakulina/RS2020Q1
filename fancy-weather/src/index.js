import './sass/style.scss';
import '@babel/polyfill';
import getUserGeolocation from './js/geolocationAPI';
import renderGeolocationInfo from './js/renderData';
import getWeather from './js/weatherAPI';
import getWeatherForDay from './js/weatherAPIUtils';

async function init() {
  const userGeolocation = await getUserGeolocation();
  console.log(userGeolocation);
  renderGeolocationInfo(userGeolocation);

  const { loc } = userGeolocation;
  const weatherData = await getWeather(loc);
  console.log(weatherData);

  const extractedWeatherData = getWeatherForDay(weatherData, 0);
  console.log(extractedWeatherData);
}

init();
