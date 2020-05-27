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
  const temperature = (localStorage.getItem('temp') === undefined) ? 'isCelsius' : localStorage.getItem('temp'); //
  if (temperature === 'isCelsius') {
    localStorage.setItem('temp', 'isFahrenheit');
    transferCelsiusToFahrenheit(tempElements);
  } else if (temperature === 'isCelsius') {
    localStorage.setItem('temp', 'isFahrenheit');
    transferFahrenheitToCelsius(tempElements);
  }
  // if (localStorage.getItem('temp') === 'isCelsius') {
  //   localStorage.setItem('temp', 'isFahrenheit');
  //   transferCelsiusToFahrenheit(tempElements);
  // } else {
  //   localStorage.setItem('temp', 'isCelsius');
  //   transferFahrenheitToCelsius(tempElements);
  // }
}

export { transferTemperature, transferCelsiusToFahrenheit };
