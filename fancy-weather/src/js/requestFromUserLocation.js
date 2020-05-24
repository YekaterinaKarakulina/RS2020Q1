import getUserGeolocation from './APIs/userGeolocationAPI';
import getGeolocation from './APIs/geolocationAPI';
import getWeatherData from './APIs/weatherAPI';
import { getWeatherForDay, getWeatherForThreeDays } from './APIs/weatherAPIUtils';
import renderData from './render/renderData';
import renderMap from './APIs/mapsAPI';
import renderImage from './render/renderImage';

export default async function requestFromUserLocation() {
  const appObject = {};

  const userGeolocation = await getUserGeolocation();
  const { city } = userGeolocation;
  appObject.city = city;

  const bestSearchMatchResultIndex = 0;
  const geolocation = await getGeolocation(city);
  const { lat, lng } = geolocation.results[bestSearchMatchResultIndex].geometry;
  appObject.lat = lat;
  appObject.lng = lng;

  const { country } = geolocation.results[bestSearchMatchResultIndex].components;
  appObject.country = country;

  const weatherData = await getWeatherData(lat, lng);
  const todayIndex = 0;
  const nextThreeDaysIndexes = [1, 2, 3];
  const todayWeatherData = getWeatherForDay(weatherData, todayIndex);
  appObject.todayWeatherData = todayWeatherData;

  const threeDaysWeatherData = getWeatherForThreeDays(weatherData, nextThreeDaysIndexes);
  appObject.threeDaysWeatherData = threeDaysWeatherData;

  renderData(appObject);
  renderMap(lat, lng);
  renderImage();
}
