import { transferCelsiusToFahrenheit, transferFahrenheitToCelsius } from '../js/utils/temperatureUtils';

describe('transferCelsiusToFahrenheit', () => {
  it('Should return temperature in Fahrenheit', () => {
    const elTempC = document.createElement('span');
    elTempC.className = 'temperature dayTemperature';
    elTempC.textContent = 34;
    const data = [elTempC];
    transferCelsiusToFahrenheit(data);
    expect(elTempC.textContent === '93').toBeTruthy();
    expect(elTempC.textContent === '1').toBeFalsy();
  });
});

describe('transferFahrenheitToCelsius', () => {
  it('Should return temperature in Celsius', () => {
    const elTempF = document.createElement('span');
    elTempF.className = 'temperature dayTemperature';
    elTempF.textContent = 93;
    const data = [elTempF];
    transferFahrenheitToCelsius(data);
    expect(elTempF.textContent === '34').toBeTruthy();
    expect(elTempF.textContent === '199').toBeFalsy();
  });
});
