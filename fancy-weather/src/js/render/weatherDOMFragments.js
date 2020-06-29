import { createDomElement, createDomElementWithDataAttr } from '../utils/renderUtils';
import { transferCelsiusToFahrenheit } from '../utils/temperatureUtils';
import { getWeekDay, getCurrentDate } from '../utils/dateUtils';
import getWeatherIconName from './iconDOMFragment';

function createTodayWeatherDOMFragment(appObject) {
  const todayWeather = appObject.todayWeatherData;
  const fragment = document.createDocumentFragment();

  const currentTemperature = createDomElement('div', 'temperature currentTemperature');
  currentTemperature.textContent = todayWeather.currentTemp;

  const iconWeatherName = getWeatherIconName(appObject);
  const weatherIcon = createDomElement('span', 'icon__weather');
  weatherIcon.style.backgroundImage = `url('src/assets/amcharts_weather_icons_1.0.0/animated/${iconWeatherName}.svg')`;

  const weatherDescription = createDomElementWithDataAttr('div', 'weatherDescription', 'weathercode', todayWeather.weatherCode);

  const realFeelTempTitle = createDomElementWithDataAttr('span', 'realFeelTempTitle', 'i18n', 'realFeel');
  realFeelTempTitle.textContent = 'REALFEEL';

  const realFeelTempValue = createDomElement('span', 'temperature realFeelTempValue');
  realFeelTempValue.textContent = todayWeather.realFeelTemp;

  const realFeelTemperature = createDomElement('div', 'realFeelTemperature');
  realFeelTemperature.append(realFeelTempTitle);
  realFeelTemperature.append(realFeelTempValue);


  const windSpeedTitle = createDomElementWithDataAttr('span', 'windSpeedTitle', 'i18n', 'windSpeed');
  windSpeedTitle.textContent = 'WIND';

  const windSpeedValue = createDomElement('span', 'windSpeedValue');
  windSpeedValue.textContent = todayWeather.windSpeed;

  const windSpeed = createDomElement('div', 'windSpeed');
  windSpeed.append(windSpeedTitle);
  windSpeed.append(windSpeedValue);


  const humidityTitle = createDomElementWithDataAttr('span', 'humidityTitle', 'i18n', 'humidity');
  humidityTitle.textContent = 'HUMIDITY';

  const humidityValue = createDomElement('span', 'humidityValue');
  humidityValue.textContent = todayWeather.hum;

  const humidity = createDomElement('div', 'humidity');
  humidity.append(humidityTitle);
  humidity.append(humidityValue);


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

function generateOneDayWeather(appObject, dayCount) {
  const dayWeather = appObject.threeDaysWeatherData[dayCount - 1];

  const currentDate = getCurrentDate(appObject);
  const day = getWeekDay(currentDate.getDay() + dayCount);

  const dayElement = createDomElement('div', 'day');

  const weekDay = createDomElementWithDataAttr('div', 'weekDay', 'weekdayfull', `${day}`);
  weekDay.textContent = day;

  const dayTemperature = createDomElement('span', 'temperature dayTemperature');
  dayTemperature.textContent = dayWeather.currentTemp;

  const iconWeatherName = getWeatherIconName(appObject);
  const weatherIcon = createDomElement('span', 'icon__weather icon__small');
  weatherIcon.style.backgroundImage = `url('src/assets/amcharts_weather_icons_1.0.0/animated/${iconWeatherName}.svg')`;

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
  const fragment = document.createDocumentFragment();

  const firstDay = generateOneDayWeather(appObject, 1);
  const secDay = generateOneDayWeather(appObject, 2);
  const thirdDay = generateOneDayWeather(appObject, 3);

  fragment.append(firstDay);
  fragment.append(secDay);
  fragment.append(thirdDay);

  return fragment;
}

export { createTodayWeatherDOMFragment, createThreeDaysWeatherDOMFragment };
