import { createDomElement } from '../utils/renderUtils';
import { getCurrentDate } from '../utils/dateUtils';
import { weekDays, months } from '../data/data';

export default function createDateDOMFragment(appObject) {
  const fragment = document.createDocumentFragment();

  const currentDate = getCurrentDate(appObject);

  const date = createDomElement('span', 'date');
  date.textContent = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()}
  ${months[currentDate.getMonth()]} `;

  const time = createDomElement('span', 'time');

  const currentDateAndTimeElem = createDomElement('div', 'currentDate');
  currentDateAndTimeElem.append(date);
  currentDateAndTimeElem.append(time);

  fragment.append(currentDateAndTimeElem);

  return fragment;
}
