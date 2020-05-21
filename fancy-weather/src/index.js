import './sass/style.scss';
import '@babel/polyfill';
import getUserGeolocation from './js/geolocationAPI';
import { renderGeolocationInfo, renderTodayWeatherData } from './js/renderData';
import getWeather from './js/weatherAPI';
import getWeatherForDay from './js/weatherAPIUtils';


async function init() {
  const todayIndex = 0;
  const userGeolocation = await getUserGeolocation();
  console.log('userGeolocation');
  console.log(userGeolocation);
  renderGeolocationInfo(userGeolocation);

  const { loc } = userGeolocation;
  const weatherData = await getWeather(loc);
  console.log(weatherData);

  const extractedTodayWeatherData = getWeatherForDay(weatherData, todayIndex);
  console.log(extractedTodayWeatherData);
  renderTodayWeatherData(extractedTodayWeatherData);
}

init();
