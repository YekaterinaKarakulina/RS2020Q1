import { getCurrentDate } from './dateUtils';

export default function getKeywordsForImgAPI(appObject) {
  const currentDate = getCurrentDate(appObject);
  const month = currentDate.getMonth();
  const hours = currentDate.getHours();
  let season = '';
  let dayTime = '';
  if (month > 1 && month < 5) {
    season = (appObject.lat < 0) ? 'autumn' : 'spring';
  } else if (month > 4 && month < 8) {
    season = (appObject.lat < 0) ? 'winter' : 'summer';
  } else if (month > 7 && month < 11) {
    season = (appObject.lat < 0) ? 'spring' : 'autumn';
  } else {
    season = (appObject.lat < 0) ? 'summer' : 'winter';
  }
  if (hours > 5 && hours < 12) {
    dayTime = 'morning';
  } else if (hours >= 12 && hours < 18) {
    dayTime = 'day';
  } else if (hours >= 18 && hours < 24) {
    dayTime = 'evening';
  } else {
    dayTime = 'night';
  }
  const imgKeywords = `${season} ${dayTime}`;
  return imgKeywords;
}

// async function getAndRenderNewImg(imgProperties) {
//   const linkToImg = await getImage(imgProperties);
//   renderImage(linkToImg);
// }
