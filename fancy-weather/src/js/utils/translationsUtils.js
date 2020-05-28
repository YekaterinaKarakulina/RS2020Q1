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

async function transferLanguageBeforeRendering(language, fragment) {
  const staticElements = fragment.querySelectorAll('[data-i18n]');
  translateElements(language, 'i18n', staticElements, 'textContent');

  const searchButtonElement = document.querySelector('[data-searchbtn]');
  translateElement(language, 'searchbtn', searchButtonElement, 'textContent');

  const placeholderElements = document.querySelectorAll('[data-placeholder]');
  translateElements(language, 'placeholder', placeholderElements, 'placeholder');

  const weekDaysFullElements = fragment.querySelectorAll('[data-weekdayfull]');
  translateElements(localStorage.getItem('language'), 'weekdayfull', weekDaysFullElements, 'textContent', 'weekDaysFull');
}

async function switchLanguage(language) {
  const staticElements = document.querySelectorAll('[data-i18n]');
  translateElements(language, 'i18n', staticElements, 'textContent');

  const searchButtonElement = document.querySelector('[data-searchbtn]');
  translateElement(language, 'searchbtn', searchButtonElement, 'textContent');

  const placeholderElements = document.querySelectorAll('[data-placeholder]');
  translateElements(language, 'placeholder', placeholderElements, 'placeholder');

  const weekDaysFullElements = document.querySelectorAll('[data-weekdayfull]');
  translateElements(localStorage.getItem('language'), 'weekdayfull', weekDaysFullElements, 'textContent', 'weekDaysFull');
}

export { switchLanguage, transferLanguageBeforeRendering };
