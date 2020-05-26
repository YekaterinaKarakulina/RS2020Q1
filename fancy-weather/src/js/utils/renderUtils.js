export default function createDomElement(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}
