import createDomElement from './utils';

export default function renderGeolocationInfo(geolocation) {
  const { city, country } = geolocation;
  const fragment = document.createDocumentFragment();

  const cityElement = createDomElement('span', 'city');
  cityElement.textContent = city;

  const countryElement = createDomElement('span', 'country');
  countryElement.textContent = country;

  fragment.append(cityElement);
  fragment.append(countryElement);

  document.querySelector('.location').append(fragment);
}
