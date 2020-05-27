import createDomElement from '../utils/renderUtils';
import { renderImage } from './renderImage';
import renderMap from '../APIs/mapsAPI';
import createLocationDOMFragment from './locationDOMFragment';
import createDateDOMFragment from './dateDOMFragment';
import { createTodayWeatherDOMFragment, createThreeDaysWeatherDOMFragment } from './weatherDOMFragments';
import createMapDOMFragment from './mapDOMFragment';
import { languages } from '../data/data';

export default function renderData(appObject) {
  const errorMessageElem = document.querySelector('.errorMessage');
  console.log(appObject);
  console.log(`localStorage.getItem('language') ${localStorage.getItem('language')}`); //

  if (appObject) {
    document.querySelector('.wrapper__main').innerHTML = '';
    errorMessageElem.textContent = '';

    if (localStorage.getItem('temp') === 'isFahrenheit') {
      document.querySelector('.tempInput').checked = true;
    }

    const lang = (languages[localStorage.getItem('language')] === undefined) ? 'English' : languages[localStorage.getItem('language')]; //
    console.log(`lang ${lang}`); //
    document.querySelector('.dropdown-toggle').innerHTML = lang; //

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
