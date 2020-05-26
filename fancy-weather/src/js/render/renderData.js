import { createDomElement, translateCoordinates, transferCelsiusToFahrenheit } from '../utils';
import icons from '../icons';
import renderImage from './renderImage';
import renderMap from '../APIs/mapsAPI';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat'];
const weekDaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

function createLocationDOMFragment(appObject) {
  const fragment = document.createDocumentFragment();
  const cityCountryElem = createDomElement('div', 'location');
  cityCountryElem.textContent = `${appObject.city}, ${appObject.country}`;
  fragment.append(cityCountryElem);
  return fragment;
}

function createDateTimeDOMFragment() {
  const fragment = document.createDocumentFragment();

  const currentDate = new Date();

  const date = createDomElement('span', 'date');
  date.textContent = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()}
  ${months[currentDate.getMonth()]} `;

  const time = createDomElement('span', 'time');

  const currentDateAndTimeElem = createDomElement('div', 'currentDate');
  currentDateAndTimeElem.append(date);
  currentDateAndTimeElem.append(time);

  fragment.append(currentDateAndTimeElem);
  return fragment;
}

function createTodayWeatherDOMFragment(todayWeather) {
  const fragment = document.createDocumentFragment();
  const weatherContainer = createDomElement('div', 'weatherContainer');

  const currentTemperature = createDomElement('div', 'temperature currentTemperature');
  currentTemperature.textContent = todayWeather.currentTemp;

  const summaryContainer = createDomElement('div', 'summaryContainer');

  const iconWeatherClassNames = icons[todayWeather.weatherCode];
  const weatherIcon = createDomElement('i', `icon__weather ${iconWeatherClassNames}`);

  const weatherDescription = createDomElement('div', 'weatherDescription');
  weatherDescription.textContent = todayWeather.weatherCode.toUpperCase();

  const realFeelTempTitle = createDomElement('span', 'realFeelTempTitle');
  realFeelTempTitle.textContent = 'REALFEEL ';
  const realFeelTempValue = createDomElement('span', 'temperature realFeelTempValue');
  realFeelTempValue.textContent = todayWeather.realFeelTemp;

  const realFeelTemperature = createDomElement('div', 'realFeelTemperature');
  realFeelTemperature.append(realFeelTempTitle);
  realFeelTemperature.append(realFeelTempValue);

  const windSpeed = createDomElement('div', 'windSpeed');
  windSpeed.textContent = `SPEED ${todayWeather.windSpeed} m/s`;

  const humidity = createDomElement('div', 'humidity');
  humidity.textContent = `HUMIDITY ${todayWeather.hum} %`;

  const weatherSummary = createDomElement('div', 'weatherSummary');
  weatherSummary.append(weatherDescription);
  weatherSummary.append(realFeelTemperature);
  weatherSummary.append(windSpeed);
  weatherSummary.append(humidity);

  summaryContainer.append(weatherIcon);
  summaryContainer.append(weatherSummary);

  weatherContainer.append(currentTemperature);
  weatherContainer.append(summaryContainer);
  fragment.append(weatherContainer);

  if (localStorage.getItem('temp') === 'isFahrenheit') {
    const tempElements = fragment.querySelectorAll('.temperature');
    transferCelsiusToFahrenheit(tempElements);
  }
  return fragment;
}


function getWeekDay(index) {
  if (index < weekDaysFull.length) {
    return weekDaysFull[index];
  }
  return weekDaysFull[index % 7];
}

function generateOneDayWeather(dayWeather, day) {
  const dayElement = createDomElement('div', 'day');

  const weekDay = createDomElement('div', 'weekDay');
  weekDay.textContent = day;

  const dayTemperature = createDomElement('span', 'temperature dayTemperature');
  dayTemperature.textContent = dayWeather.currentTemp;

  const iconWeatherClassNames = icons[dayWeather.weatherCode];
  const weatherIcon = createDomElement('i', `icon__weather icon__small ${iconWeatherClassNames}`);

  dayElement.append(weekDay);
  dayElement.append(dayTemperature);
  dayElement.append(weatherIcon);

  if (localStorage.getItem('temp') === 'isFahrenheit') {
    const tempElements = dayElement.querySelectorAll('.temperature');
    transferCelsiusToFahrenheit(tempElements);
  }

  return dayElement;
}

function createThreeDaysWeatherDOMFragment(threeDaysWeather) {
  const fragment = document.createDocumentFragment();
  const date = new Date();

  const firstDayWeather = generateOneDayWeather(threeDaysWeather[0], getWeekDay(date.getDay() + 1));
  const secDayWeather = generateOneDayWeather(threeDaysWeather[1], getWeekDay(date.getDay() + 2));
  const thirdDayWeather = generateOneDayWeather(threeDaysWeather[2], getWeekDay(date.getDay() + 3));

  fragment.append(firstDayWeather);
  fragment.append(secDayWeather);
  fragment.append(thirdDayWeather);
  return fragment;
}

function createLocationMapDOMFragment(appObject) {
  const fragment = document.createDocumentFragment();

  const mapElem = createDomElement('div', 'map');
  mapElem.id = 'map';

  const mapContainer = createDomElement('div', 'mapContainer');
  mapContainer.append(mapElem);

  const coordinatesTranslated = translateCoordinates(appObject.lat, appObject.lng);

  const latitude = createDomElement('div', 'latitude');
  latitude.textContent = `Latitude: ${coordinatesTranslated.latitude}`;

  const longitude = createDomElement('div', 'longitude');
  longitude.textContent = `Longitude: ${coordinatesTranslated.longitude}`;

  const coordinates = createDomElement('div', 'coordinates');
  coordinates.append(latitude);
  coordinates.append(longitude);

  fragment.append(mapContainer);
  fragment.append(coordinates);
  return fragment;
}

export default function renderData(appObject) {
  console.log(appObject);
  if (appObject) {
    document.querySelector('.wrapper__main').innerHTML = '';

    if (localStorage.getItem('temp') === 'isFahrenheit') {
      document.querySelector('.tempInput').checked = true;
    }

    const fragment = document.createDocumentFragment();
    const weatherInfo = createDomElement('div', 'weatherInfo');

    const locationFragment = createLocationDOMFragment(appObject);
    const dateTimeFragment = createDateTimeDOMFragment();
    const todayWeatherFragment = createTodayWeatherDOMFragment(appObject.todayWeatherData);

    const todaysWeather = createDomElement('section', 'todaysWeather');
    todaysWeather.append(locationFragment);
    todaysWeather.append(dateTimeFragment);
    todaysWeather.append(todayWeatherFragment);

    const threeDaysWeatherFragment = createThreeDaysWeatherDOMFragment(appObject.threeDaysWeatherData);
    const threeDaysWeather = createDomElement('section', 'threeDaysWeather');
    threeDaysWeather.append(threeDaysWeatherFragment);

    weatherInfo.append(todaysWeather);
    weatherInfo.append(threeDaysWeather);

    const locationInfo = createDomElement('div', 'locationInfo');
    const locationMapFragment = createLocationMapDOMFragment(appObject);
    locationInfo.append(locationMapFragment);

    fragment.append(weatherInfo);
    fragment.append(locationInfo);

    document.querySelector('.wrapper__main').append(fragment);

    const { linkToImg } = appObject;
    renderImage(linkToImg);
    renderMap(appObject.lat, appObject.lng);
  }
}
