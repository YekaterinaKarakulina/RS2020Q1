function createDomElement(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}

function createDomElementWithDataAttr(elementName, className, dataAttr, dataAttrValue) {
  const element = document.createElement(elementName);
  element.className = className;
  element.dataset[dataAttr] = dataAttrValue;
  return element;
}

export { createDomElement, createDomElementWithDataAttr };
