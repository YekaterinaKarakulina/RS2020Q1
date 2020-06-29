import { getCurrentDate } from '../utils/dateUtils';
import icons from '../data/icons';

export default function getWeatherIconName(appObject) {
  const todayWeather = appObject.todayWeatherData;
  const currentDate = getCurrentDate(appObject);
  const hours = currentDate.getHours();
  let dayTime = '';
  if (hours > 5 && hours < 18) {
    dayTime = 'day';
  } else {
    dayTime = 'night';
  }
  const iconsObj = icons[dayTime];

  let iconWeatherName = iconsObj[todayWeather.weatherCode];
  if (dayTime === 'day' && iconWeatherName === undefined) {
    iconWeatherName = 'day';
  } else if (dayTime === 'night' && iconWeatherName === undefined) {
    iconWeatherName = 'night';
  }
  return iconWeatherName;
}
