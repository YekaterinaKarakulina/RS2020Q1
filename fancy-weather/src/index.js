import './sass/style.scss';
import '@babel/polyfill';
import getUserGeolocation from './js/geolocationAPI';
import { getWeatherForDay, getWeatherForThreeDays } from './js/weatherAPIUtils';
import { renderGeolocationInfo, renderTodayWeatherData, renderThreeDaysWeather } from './js/renderData';
import getWeatherData from './js/weatherAPI';


async function init() {
  const todayIndex = 0;
  const nextThreeDaysIndexes = [1, 2, 3];

  const userGeolocation = await getUserGeolocation();
  console.log('userGeolocation');
  console.log(userGeolocation);
  renderGeolocationInfo(userGeolocation);


  const { loc } = userGeolocation;
  const weatherData = await getWeatherData(loc);
  console.log(weatherData);

  const todayWeatherData = getWeatherForDay(weatherData, todayIndex);
  console.log(todayWeatherData);
  renderTodayWeatherData(todayWeatherData);

  const threeDaysWeatherData = getWeatherForThreeDays(weatherData, nextThreeDaysIndexes);
  console.log(threeDaysWeatherData);
  renderThreeDaysWeather(threeDaysWeatherData);
}

init();
