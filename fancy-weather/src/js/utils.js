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


/* function translateCToF(tempElements) {
  tempElements.forEach((el) => {
    const tempElem = el;
    const currentT = el.textContent.slice(0, -1);
    const translatedTemp = (9 / 5) * currentT + 32;
    tempElem.textContent = `${Math.round(translatedTemp)}°`;
  });
  const realFeelTempElem = document.querySelector('.realFeelTemperature');
  const currentRealFeelTemp = realFeelTempElem.textContent.split(' ')[1].slice(0, -1);
  const translatedRealFeelTemp = (9 / 5) * currentRealFeelTemp + 32;
  realFeelTempElem.textContent = `REALFEEL ${Math.round(translatedRealFeelTemp)}°`;
}

function translateFToC(tempElements) {
  tempElements.forEach((el) => {
    const tempElem = el;
    const currentT = el.textContent.slice(0, -1);
    const translatedTemp = (5 / 9) * (currentT - 32);
    tempElem.textContent = `${Math.round(translatedTemp)}°`;
  });
  const realFeelTempElem = document.querySelector('.realFeelTemperature');
  const currentRealFeelTemp = realFeelTempElem.textContent.split(' ')[1].slice(0, -1);
  const translatedRealFeelTemp = (5 / 9) * (currentRealFeelTemp - 32);
  realFeelTempElem.textContent = `REALFEEL ${Math.round(translatedRealFeelTemp)}°`;
} */


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

function transferTemperature() {
  const tempElements = document.querySelectorAll('.temperature');

  console.log(localStorage.getItem('isCelsius'));
  if (localStorage.getItem('isCelsius') === 'true') {
    console.log('yes');
    localStorage.setItem('isCelsius', 'false');
    transferCelsiusToFahrenheit(tempElements);
  } else {
    console.log('no');
    localStorage.setItem('isCelsius', 'true');
    transferFahrenheitToCelsius(tempElements);
  }
}

export { createDomElement, translateCoordinates, transferTemperature };
