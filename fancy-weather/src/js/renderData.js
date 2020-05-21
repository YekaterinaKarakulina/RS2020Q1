import createDomElement from './utils';
import icons from './icons';

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


  const iconWeatherClassNames = icons.cloudy;
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

function generateOneDayWeather(dayWeather) {
  const dayElement = createDomElement('div', 'day');

  const weekDay = createDomElement('div', 'weekDay');

  const dayTemperature = createDomElement('span', 'dayTemperature');
  dayTemperature.textContent = `${dayWeather.currentTemp}°`;

  const weatherIcon = createDomElement('span', 'icon icon__weather');

  dayElement.append(weekDay);
  dayElement.append(dayTemperature);
  dayElement.append(weatherIcon);

  return dayElement;
}

function renderThreeDaysWeather(threeDaysWeather) {
  const fragment = document.createDocumentFragment();

  const firstDayWeather = generateOneDayWeather(threeDaysWeather[0]);
  const secondDayWeather = generateOneDayWeather(threeDaysWeather[1]);
  const thirdDayWeather = generateOneDayWeather(threeDaysWeather[2]);

  fragment.append(firstDayWeather);
  fragment.append(secondDayWeather);
  fragment.append(thirdDayWeather);

  document.querySelector('.threeDaysWeather').append(fragment);

}

export { renderGeolocationInfo, renderTodayWeatherData, renderThreeDaysWeather };
