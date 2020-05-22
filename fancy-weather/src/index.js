import './sass/style.scss';
import '@babel/polyfill';
import getUserGeolocation from './js/geolocationAPI';
import { getWeatherForDay, getWeatherForThreeDays } from './js/weatherAPIUtils';
import {
  renderGeolocationInfo, renderTodayWeatherData, renderThreeDaysWeather, renderDate, renderTimeContainer,
} from './js/renderData';
import getWeatherData from './js/weatherAPI';
import getImage from './js/imagesAPI';

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

  renderTimeContainer();

  const img = await getImage();
  console.log(img);
  const { regular } = img.urls;
  console.log(regular);
  const el = document.querySelector('.imgContainer');
  el.style = `background-image: url("${regular}")`;
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
}, 2000);

init();
