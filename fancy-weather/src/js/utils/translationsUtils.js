async function getTranslations(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function translateElement(language, dataAttr, elementToTranslate, elementAttr) {
  const urlToI18NFile = `/i18n/${language}.json`;
  const data = await getTranslations(urlToI18NFile);
  const element = elementToTranslate;
  element[elementAttr] = data[element.dataset[dataAttr]];
}

async function translateElements(language, dataAttr, elementsToTranslate, elementAttr) {
  elementsToTranslate.forEach((element) => {
    translateElement(language, dataAttr, element, elementAttr);
  });
}

async function switchLanguage(language) {
  const staticElements = document.querySelectorAll('[data-i18n]');
  translateElements(language, 'i18n', staticElements, 'textContent');

  const searchButtonElement = document.querySelector('[data-searchbtn]');
  translateElement(language, 'searchbtn', searchButtonElement, 'textContent');

  const placeholderElements = document.querySelectorAll('[data-placeholder]');
  translateElements(language, 'placeholder', placeholderElements, 'placeholder');
}

async function transferLanguageBeforeRendering(language, fragment) {
  const staticElements = fragment.querySelectorAll('[data-i18n]');
  translateElements(language, 'i18n', staticElements, 'textContent');

  const searchButtonElement = document.querySelector('[data-searchbtn]');
  translateElement(language, 'searchbtn', searchButtonElement, 'textContent');

  const placeholderElements = document.querySelectorAll('[data-placeholder]');
  translateElements(language, 'placeholder', placeholderElements, 'placeholder');
}

export { switchLanguage, transferLanguageBeforeRendering };
