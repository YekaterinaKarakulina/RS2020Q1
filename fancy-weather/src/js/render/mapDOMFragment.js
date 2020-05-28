import createDomElement from '../utils/renderUtils';
import translateCoordinates from '../utils/coordinatesUtils';

export default function createMapDOMFragment(appObject) {
  const fragment = document.createDocumentFragment();

  const mapElem = createDomElement('div', 'map');
  mapElem.id = 'map';

  const mapContainer = createDomElement('div', 'mapContainer');
  mapContainer.append(mapElem);

  const coordinatesTranslated = translateCoordinates(appObject.lat, appObject.lng);

  // const latitude = createDomElement('div', 'latitude');
  // latitude.textContent = `Latitude: ${coordinatesTranslated.latitude}`;

  // const longitude = createDomElement('div', 'longitude');
  // longitude.textContent = `Longitude: ${coordinatesTranslated.longitude}`;

  const latitudeTitle = createDomElement('span', 'latitudeTitle');
  latitudeTitle.dataset.i18n = 'latitude';
  latitudeTitle.textContent = 'Latitude';

  const latitudeValue = createDomElement('span', 'latitudeValue');
  latitudeValue.textContent = coordinatesTranslated.latitude;

  const latitude = createDomElement('div', 'latitude');
  latitude.append(latitudeTitle);
  latitude.append(latitudeValue);

  const longitudeTitle = createDomElement('span', 'longitudeTitle');
  longitudeTitle.dataset.i18n = 'longitude';
  longitudeTitle.textContent = 'Longitude';

  const longitudeValue = createDomElement('span', 'longitudeValue');
  longitudeValue.textContent = coordinatesTranslated.longitude;

  const longitude = createDomElement('div', 'longitude');
  longitude.append(longitudeTitle);
  longitude.append(longitudeValue);

  const coordinates = createDomElement('div', 'coordinates');
  coordinates.append(latitude);
  coordinates.append(longitude);



  fragment.append(mapContainer);
  fragment.append(coordinates);
  return fragment;
}
