import getGeolocation from './APIs/geolocationAPI';
import getWeatherData from './APIs/weatherAPI';
import { getWeatherForDay, getWeatherForThreeDays } from './APIs/weatherAPIUtils';
import getImage from './APIs/imagesAPI';

export default async function requestToAPIs(city) {
  const appObject = {};

  try {
    appObject.city = city;

    const bestSearchMatchResultIndex = 0;
    const geolocation = await getGeolocation(city);

    if (geolocation.results.length !== 0) {
      const { lat, lng } = geolocation.results[bestSearchMatchResultIndex].geometry;
      appObject.lat = lat;
      appObject.lng = lng;

      const { country } = geolocation.results[bestSearchMatchResultIndex].components;
      appObject.country = country;
      const promises = [getWeatherData(lat, lng), getImage()];
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
        const { regular } = img.urls;
        appObject.linkToImg = regular;
        return appObject;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
}
