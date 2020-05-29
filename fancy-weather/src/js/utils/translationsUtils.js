import { getCurrentDate } from './dateUtils';
import { weekDaysShort, months } from '../data/data';
// import translateCoordinates from './coordinatesUtils';
import getWordTranslation from '../APIs/translationAPI';

async function getTranslations(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function translateElement(language, dataAttr, elementToTranslate, elementAttr, dataAdditional) {
  const urlToI18NFile = `/i18n/${language}.json`;
  let data = await getTranslations(urlToI18NFile);
  const element = elementToTranslate;
  if (dataAdditional) {
    data = data[dataAdditional];
  }
  element[elementAttr] = data[element.dataset[dataAttr]];
}

async function translateElements(language, dataAttr, elementsToTranslate, elementAttr, dataAdditional) {
  elementsToTranslate.forEach((element) => {
    translateElement(language, dataAttr, element, elementAttr, dataAdditional);
  });
}


async function translateDate(language, currentDate, element) {
  const urlToI18NFile = `/i18n/${language}.json`;
  const data = await getTranslations(urlToI18NFile);
  const dateElement = element;
  dateElement.textContent = `${data.weekDaysShort[weekDaysShort[currentDate.getDay()]]} 
  ${currentDate.getDate()} ${data.months[months[currentDate.getMonth()]]}`;
}


async function translateDataFromAPI(appObjectData, language) {
  let translateLang = '';
  switch (language) {
    case 'Russian':
      translateLang = 'ru';
      break;
    case 'Belorussian':
      translateLang = 'be';
      break;
    default:
      translateLang = 'en';
      break;
  }
  const translatedWord = await getWordTranslation(appObjectData, translateLang);
  return translatedWord;
}

async function transferLanguageBeforeRendering(appObject, language, fragment) {
  const staticElements = fragment.querySelectorAll('[data-i18n]');
  translateElements(language, 'i18n', staticElements, 'textContent');

  const searchButtonElement = document.querySelector('[data-searchbtn]');
  translateElement(language, 'searchbtn', searchButtonElement, 'textContent');

  const placeholderElements = document.querySelectorAll('[data-placeholder]');
  translateElements(language, 'placeholder', placeholderElements, 'placeholder');

  const weekDaysFullElements = fragment.querySelectorAll('[data-weekdayfull]');
  translateElements(language, 'weekdayfull', weekDaysFullElements, 'textContent', 'weekDaysFull');

  const currentDate = getCurrentDate(appObject);
  const dateElement = fragment.querySelector('[data-date]');
  translateDate(language, currentDate, dateElement);

  const locationElement = fragment.querySelector('.location');
  locationElement.textContent = await translateDataFromAPI(`${appObject.city}, ${appObject.country}`, language);

  const weatherDescriptionElements = document.querySelectorAll('[data-weathercode]');
  translateElements(language, 'weathercode', weatherDescriptionElements, 'textContent', 'weatherCodes');
}

async function switchLanguage(language, appObject) {
  const staticElements = document.querySelectorAll('[data-i18n]');
  translateElements(language, 'i18n', staticElements, 'textContent');

  const searchButtonElement = document.querySelector('[data-searchbtn]');
  translateElement(language, 'searchbtn', searchButtonElement, 'textContent');

  const placeholderElements = document.querySelectorAll('[data-placeholder]');
  translateElements(language, 'placeholder', placeholderElements, 'placeholder');

  const weekDaysFullElements = document.querySelectorAll('[data-weekdayfull]');
  translateElements(localStorage.getItem('language'), 'weekdayfull', weekDaysFullElements, 'textContent', 'weekDaysFull');

  const currentDate = getCurrentDate(appObject);
  const dateElement = document.querySelector('[data-date]');
  translateDate(language, currentDate, dateElement);

  // const weatherDescriptionElement = document.querySelector('.weatherDescription');
  // weatherDescriptionElement.textContent = (await translateDataFromAPI(appObject.todayWeatherData.weatherCode, language)).toUpperCase();

  const locationElement = document.querySelector('.location');
  locationElement.textContent = await translateDataFromAPI(`${appObject.city}, ${appObject.country}`, language);

  const weatherDescriptionElements = document.querySelectorAll('[data-weathercode]');
  translateElements(language, 'weathercode', weatherDescriptionElements, 'textContent', 'weatherCodes');

}

export { switchLanguage, transferLanguageBeforeRendering };
