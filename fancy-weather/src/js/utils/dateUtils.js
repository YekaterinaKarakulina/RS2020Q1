import { weekDaysFull } from '../data/data';

function getCurrentDate(appObject) {
  const localeStrDate = new Date().toLocaleString('en-US', { timeZone: `${appObject.timezone}` });
  const currentDate = new Date(Date.parse(localeStrDate));
  return currentDate;
}

function getWeekDay(index) {
  if (index < weekDaysFull.length) {
    return weekDaysFull[index];
  }
  return weekDaysFull[index % 7];
}

export { getCurrentDate, getWeekDay };
