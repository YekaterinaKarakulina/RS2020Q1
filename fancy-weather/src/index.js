import './sass/style.scss';
import '@babel/polyfill';
import getUserGeolocation from './js/geolocationAPI';
import { getWeatherForDay, getWeatherForThreeDays } from './js/weatherAPIUtils';
import {
  renderGeolocationInfo, renderTodayWeatherData, renderThreeDaysWeather, renderDate, renderTime,
} from './js/renderData';
import getWeatherData from './js/weatherAPI';
import createDomElement from './js/utils';

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

  renderDate();

  renderTime();
}

let timerId = setTimeout(function tick() {
  const currentDate = new Date();
  let HH = currentDate.getHours();
  if (HH < 10) {
    HH = `0${HH}`;
  }
  let mm = currentDate.getMinutes();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  let ss = currentDate.getSeconds();
  if (ss < 10) {
    ss = `0${ss}`;
  }
  document.querySelector('.time').textContent = `${HH}:${mm}:${ss}`;
  timerId = setTimeout(tick, 1000);
}, 1000);

init();
