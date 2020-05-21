import createDomElement from './utils';

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

function generateSummaryContainer(dayWeather) {
  const summaryContainer = createDomElement('div', 'summaryContainer');

  const weatherIcon = createDomElement('span', 'icon icon__weather');

  const weatherDescription = createDomElement('div', 'weatherDescription');
  weatherDescription.textContent = dayWeather.weatherCode.toUpperCase();

  const realFeelTemperature = createDomElement('div', 'realFeelTemperature');
  realFeelTemperature.textContent = `REALFEEL ${dayWeather.realFeelTemp}°`;

  const windSpeed = createDomElement('div', 'windSpeed');
  windSpeed.textContent = `SPEED ${dayWeather.windSpeed} m/s`;

  const humidity = createDomElement('div', 'humidity');
  humidity.textContent = `HUMIDITY ${dayWeather.hum} %`;

  const weatherSummary = createDomElement('div', 'weatherSummary');
  weatherSummary.append(weatherDescription);
  weatherSummary.append(realFeelTemperature);
  weatherSummary.append(windSpeed);
  weatherSummary.append(humidity);

  summaryContainer.append(weatherIcon);
  summaryContainer.append(weatherSummary);
  return summaryContainer;
}

function renderTodayWeatherData(dayWeather) {
  const fragment = document.createDocumentFragment();

  const currentTemperature = createDomElement('div', 'currentTemperature');
  currentTemperature.textContent = `${dayWeather.currentTemp}°`;

  const summaryContainer = generateSummaryContainer(dayWeather);
  fragment.append(currentTemperature);
  fragment.append(summaryContainer);

  document.querySelector('.weatherContainer').append(fragment);
}

export { renderGeolocationInfo, renderTodayWeatherData };
