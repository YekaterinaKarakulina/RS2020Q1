import { createDomElement, createDomElementWithDataAttr } from '../utils/renderUtils';
import { getCurrentDate } from '../utils/dateUtils';
import { weekDaysShort } from '../data/data';

export default function createDateDOMFragment(appObject) {
  const fragment = document.createDocumentFragment();

  const currentDate = getCurrentDate(appObject);
  const date = createDomElementWithDataAttr('span', 'date', 'date', weekDaysShort[currentDate.getDay()]);
  const time = createDomElement('span', 'time');

  const currentDateAndTimeElem = createDomElement('div', 'currentDate');
  currentDateAndTimeElem.append(date);
  currentDateAndTimeElem.append(time);

  fragment.append(currentDateAndTimeElem);

  return fragment;
}
