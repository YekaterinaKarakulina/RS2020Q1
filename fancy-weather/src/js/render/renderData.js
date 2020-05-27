import createDomElement from '../utils/renderUtils';
import { renderImage } from './renderImage';
import renderMap from '../APIs/mapsAPI';
import createLocationDOMFragment from './locationDOMFragment';
import createDateDOMFragment from './dateDOMFragment';
import { createTodayWeatherDOMFragment, createThreeDaysWeatherDOMFragment } from './weatherDOMFragments';
import createMapDOMFragment from './mapDOMFragment';

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
    const dateTimeFragment = createDateDOMFragment(appObject);
    const todayWeatherFragment = createTodayWeatherDOMFragment(appObject.todayWeatherData);

    const todaysWeather = createDomElement('section', 'todaysWeather');
    todaysWeather.append(locationFragment);
    todaysWeather.append(dateTimeFragment);
    todaysWeather.append(todayWeatherFragment);

    const threeDaysWeatherFragment = createThreeDaysWeatherDOMFragment(appObject);
    const threeDaysWeather = createDomElement('section', 'threeDaysWeather');
    threeDaysWeather.append(threeDaysWeatherFragment);

    weatherInfo.append(todaysWeather);
    weatherInfo.append(threeDaysWeather);

    const locationInfo = createDomElement('div', 'locationInfo');
    const locationMapFragment = createMapDOMFragment(appObject);
    locationInfo.append(locationMapFragment);

    fragment.append(weatherInfo);
    fragment.append(locationInfo);

    document.querySelector('.wrapper__main').append(fragment);

    const { linkToImg } = appObject;
    renderImage(linkToImg);
    renderMap(appObject.lat, appObject.lng);
  }
}
