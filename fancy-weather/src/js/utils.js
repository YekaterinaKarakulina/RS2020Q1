function createDomElement(elementName, className) {
  const element = document.createElement(elementName);
  element.className = className;
  return element;
}

function translateCoordinates(lat, lng) {
  let degrees = 0;
  let minutes = 0;
  let seconds = 0;
  let latSign = 'N';
  let lngSign = 'E';
  let latitude = lat;
  let longitude = lng;
  if (lat < 0) {
    latSign = 'S';
    latitude = Math.abs(lat);
  }
  if (lng < 0) {
    lngSign = 'W';
    longitude = Math.abs(lng);
  }

  degrees = Math.floor(latitude);
  let remainder = latitude - degrees;
  minutes = Math.floor(remainder * 60);
  remainder = remainder * 60 - minutes;
  seconds = Math.floor(remainder * 60);
  latitude = `${degrees}°${minutes}'${seconds}''${latSign}`;

  degrees = Math.floor(longitude);
  remainder = longitude - degrees;
  minutes = Math.floor(remainder * 60);
  remainder = remainder * 60 - minutes;
  seconds = Math.floor(remainder * 60);
  longitude = `${degrees}°${minutes}'${seconds}''${lngSign}`;

  return { latitude, longitude };
}

export { createDomElement, translateCoordinates };
