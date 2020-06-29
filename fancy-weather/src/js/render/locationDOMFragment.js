import { createDomElement } from '../utils/renderUtils';

export default function createLocationDOMFragment(appObject) {
  const fragment = document.createDocumentFragment();

  const cityCountryElem = createDomElement('div', 'location');
  cityCountryElem.textContent = `${appObject.city}, ${appObject.country}`;

  fragment.append(cityCountryElem);

  return fragment;
}
