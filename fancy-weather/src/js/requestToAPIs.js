import getGeolocation from './APIs/geolocationAPI';
import getWeatherData from './APIs/weatherAPI';
import { getWeatherForDay, getWeatherForThreeDays } from './utils/weatherUtils';
import getImage from './APIs/imagesAPI';
import getKeywordsForImgAPI from './utils/imageUtils';

export default async function requestToAPIs(city) {
  document.querySelector('.spinner').classList.remove('hidden');
  const appObject = {};

  try {
    appObject.city = city;

    const bestSearchMatchResultIndex = 0;
    const geolocation = await getGeolocation(city);
    if (geolocation.results.length !== 0) {
      const { lat, lng } = geolocation.results[bestSearchMatchResultIndex].geometry;
      appObject.lat = lat;
      appObject.lng = lng;

      const { timezone } = geolocation.results[bestSearchMatchResultIndex].annotations;
      appObject.timezone = timezone.name;

      const { country } = geolocation.results[bestSearchMatchResultIndex].components;
      appObject.country = country;

      const imgProperties = `${getKeywordsForImgAPI(appObject)} nature`;
      appObject.imgProperties = imgProperties;

      const promises = [getWeatherData(lat, lng), getImage(imgProperties)];
      const results = await Promise.all(promises);

      if (results) {
        const weatherData = results[0];
        const todayIndex = 0;
        const nextThreeDaysIndexes = [1, 2, 3];
        const todayWeatherData = getWeatherForDay(weatherData, todayIndex);
        appObject.todayWeatherData = todayWeatherData;
        const threeDaysWeatherData = getWeatherForThreeDays(weatherData, nextThreeDaysIndexes);
        appObject.threeDaysWeatherData = threeDaysWeatherData;

        const img = results[1];
        appObject.linkToImg = img;
        return appObject;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
}
