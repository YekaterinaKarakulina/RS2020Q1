import createDomElement from '../utils/renderUtils';
import { transferCelsiusToFahrenheit } from '../utils/temperatureUtils';
import { getWeekDay } from '../utils/dateUtils';
import icons from '../data/icons';

function createTodayWeatherDOMFragment(todayWeather) {
  const fragment = document.createDocumentFragment();

  const currentTemperature = createDomElement('div', 'temperature currentTemperature');
  currentTemperature.textContent = todayWeather.currentTemp;

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

  const summaryContainer = createDomElement('div', 'summaryContainer');
  summaryContainer.append(weatherIcon);
  summaryContainer.append(weatherSummary);

  const weatherContainer = createDomElement('div', 'weatherContainer');
  weatherContainer.append(currentTemperature);
  weatherContainer.append(summaryContainer);
  fragment.append(weatherContainer);

  if (localStorage.getItem('temp') === 'isFahrenheit') {
    const tempElements = fragment.querySelectorAll('.temperature');
    transferCelsiusToFahrenheit(tempElements);
  }
  return fragment;
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


function createThreeDaysWeatherDOMFragment(appObject) {
  const threeDaysWeather = appObject.threeDaysWeatherData;

  const fragment = document.createDocumentFragment();
  const localeStrDate = new Date().toLocaleString('en-US', { timeZone: `${appObject.timezone}` });
  const currentDate = new Date(Date.parse(localeStrDate));

  const firstDay = generateOneDayWeather(threeDaysWeather[0], getWeekDay(currentDate.getDay() + 1));
  const secDay = generateOneDayWeather(threeDaysWeather[1], getWeekDay(currentDate.getDay() + 2));
  const thirdDay = generateOneDayWeather(threeDaysWeather[2], getWeekDay(currentDate.getDay() + 3));

  fragment.append(firstDay);
  fragment.append(secDay);
  fragment.append(thirdDay);
  return fragment;
}

export { createTodayWeatherDOMFragment, createThreeDaysWeatherDOMFragment };
