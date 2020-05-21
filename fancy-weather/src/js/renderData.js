import createDomElement from './utils';
import icons from './icons';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat'];
const weekDaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

function renderGeolocationInfo(geolocation) {
  const { city, country } = geolocation;
  const fragment = document.createDocumentFragment();

  const cityElement = createDomElement('span', 'city');
  cityElement.textContent = city;

  const countryElement = createDomElement('span', 'country');
  countryElement.textContent = country;

  fragment.append(cityElement);
  fragment.append(countryElement);

  document.querySelector('.location').append(fragment);
}

function generateSummaryContainer(todayWeather) {
  const summaryContainer = createDomElement('div', 'summaryContainer');

  const iconWeatherClassNames = icons[todayWeather.weatherCode];

  const weatherIcon = createDomElement('i', `icon__weather ${iconWeatherClassNames}`);

  const weatherDescription = createDomElement('div', 'weatherDescription');
  weatherDescription.textContent = todayWeather.weatherCode.toUpperCase();

  const realFeelTemperature = createDomElement('div', 'realFeelTemperature');
  realFeelTemperature.textContent = `REALFEEL ${todayWeather.realFeelTemp}°`;

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
  return summaryContainer;
}

function renderTodayWeatherData(todayWeather) {
  const fragment = document.createDocumentFragment();

  const currentTemperature = createDomElement('div', 'currentTemperature');
  currentTemperature.textContent = `${todayWeather.currentTemp}°`;

  const summaryContainer = generateSummaryContainer(todayWeather);
  fragment.append(currentTemperature);
  fragment.append(summaryContainer);

  document.querySelector('.weatherContainer').append(fragment);
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

  const dayTemperature = createDomElement('span', 'dayTemperature');
  dayTemperature.textContent = `${dayWeather.currentTemp}°`;

  // const weatherIcon = createDomElement('span', 'icon icon__weather'); //
  const iconWeatherClassNames = icons[dayWeather.weatherCode];
  const weatherIcon = createDomElement('i', `icon__weather icon__small ${iconWeatherClassNames}`);

  dayElement.append(weekDay);
  dayElement.append(dayTemperature);
  dayElement.append(weatherIcon);

  return dayElement;
}

function renderThreeDaysWeather(threeDaysWeather) {
  const fragment = document.createDocumentFragment();

  const date = new Date();

  const firstDayWeather = generateOneDayWeather(threeDaysWeather[0], getWeekDay(date.getDay() + 1));
  const secDayWeather = generateOneDayWeather(threeDaysWeather[1], getWeekDay(date.getDay() + 2));
  const thirdDayWeather = generateOneDayWeather(threeDaysWeather[2], getWeekDay(date.getDay() + 3));

  fragment.append(firstDayWeather);
  fragment.append(secDayWeather);
  fragment.append(thirdDayWeather);

  document.querySelector('.threeDaysWeather').append(fragment);
}

function renderDate() {
  const fragment = document.createDocumentFragment();
  const currentDate = new Date();
  const date = createDomElement('span', 'date');
  date.textContent = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]} `;
  fragment.append(date);
  document.querySelector('.currentDate').append(fragment);
}

function renderTime() {
  const currentDate = new Date();
  const time = createDomElement('span', 'time');
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
  time.textContent = `${HH}:${mm}:${ss}`;
  document.querySelector('.currentDate').append(time);
}

export {
  renderGeolocationInfo, renderTodayWeatherData, renderThreeDaysWeather, renderDate, renderTime,
};
