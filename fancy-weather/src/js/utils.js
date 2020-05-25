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

function transferCelsiusToFahrenheit(tempElements) {
  tempElements.forEach((el) => {
    const tempElem = el;
    const currentT = el.textContent;
    const translatedTemp = (9 / 5) * currentT + 32;
    tempElem.textContent = Math.round(translatedTemp);
  });
}

function transferFahrenheitToCelsius(tempElements) {
  tempElements.forEach((el) => {
    const tempElem = el;
    const currentT = el.textContent;
    const translatedTemp = (5 / 9) * (currentT - 32);
    tempElem.textContent = Math.round(translatedTemp);
  });
}

function transferTemperature(tempElements) {
  if (localStorage.getItem('temp') === 'isCelsius') {
    localStorage.setItem('temp', 'isFahrenheit');
    transferCelsiusToFahrenheit(tempElements);
  } else {
    localStorage.setItem('temp', 'isCelsius');
    transferFahrenheitToCelsius(tempElements);
  }
}

export {
  createDomElement, translateCoordinates, transferTemperature, transferCelsiusToFahrenheit,
};
