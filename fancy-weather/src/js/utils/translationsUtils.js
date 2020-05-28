async function getTranslations(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function translateElementsText(language, dataAttr, elementAttr) {
  const elementsToTranslate = document.querySelectorAll(`[data-${dataAttr}]`);
  const urlToI18NFile = `/i18n/${language}.json`;
  const data = await getTranslations(urlToI18NFile);
  elementsToTranslate.forEach((element) => {
    const elementToTranslate = element;
    elementToTranslate[elementAttr] = data[element.dataset[dataAttr]];
  });
}

export default async function switchLanguage(language) {
  translateElementsText(language, 'i18n', 'textContent');
  translateElementsText(language, 'placeholder', 'placeholder');
}
