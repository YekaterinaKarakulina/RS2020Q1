import {
  extractWeatherCode, extractWeatherInfo, getWeatherForDay, getWeatherForThreeDays,
} from '../js/utils/weatherUtils';

describe('extractWeatherCode', () => {
  it('Should return weather average value', () => {
    const weatherObject = {
      value: 'sunny',
    };
    const result = extractWeatherCode(weatherObject);
    expect(result).toBeDefined();
    expect(result).toMatch(/sunny/);
  });
});


describe('extractWeatherInfo', () => {
  it('Should return weather code', () => {
    const weatherInfo = {
      0: {
        min: {
          value: 10,
        },
      },
      1: {
        max: {
          value: 20,
        },
      },
    };
    const result = extractWeatherInfo(weatherInfo);
    expect(result).toBeDefined();
    expect(result === 15).toBeTruthy();
    expect(result === 10).toBeFalsy();
    expect(result === 20).toBeFalsy();
  });
});

describe('getWeatherForDay', () => {
  it('Should return weather object', () => {
    const weatherData = {
      0: {
        feels_like: {
          0: { min: { value: 35.55 } },
          1: { max: { value: 43.68 } },
        },
        humidity: {
          0: { min: { value: 47 } },
          1: { max: { value: 63.2 } },
        },
        temp: {
          0: { min: { value: 32.75 } },
          1: { max: { value: 34.95 } },
        },
        weather_code: {
          value: 'mostly_clear',
        },
        wind_speed: {
          0: { min: { value: 2.19 } },
          1: { max: { value: 8.6 } },
        },
      },
    };
    const result = getWeatherForDay(weatherData, 0);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('realFeelTemp', 40);
    expect(result).toHaveProperty('hum', 55);
    expect(result).toHaveProperty('currentTemp', 34);
    expect(result).toHaveProperty('weatherCode', 'mostly_clear');
    expect(result).toHaveProperty('windSpeed', 5);
  });
});

describe('getWeatherForThreeDays', () => {
  it('Should return weather for three days array', () => {
    const weatherData = {
      0: {
        feels_like: {
          0: { min: { value: 35.55 } },
          1: { max: { value: 43.68 } },
        },
        humidity: {
          0: { min: { value: 47 } },
          1: { max: { value: 63.2 } },
        },
        temp: {
          0: { min: { value: 32.75 } },
          1: { max: { value: 34.95 } },
        },
        weather_code: {
          value: 'mostly_clear',
        },
        wind_speed: {
          0: { min: { value: 2.19 } },
          1: { max: { value: 8.6 } },
        },
      },
      1: {
        feels_like: {
          0: { min: { value: 35.55 } },
          1: { max: { value: 43.68 } },
        },
        humidity: {
          0: { min: { value: 47 } },
          1: { max: { value: 63.2 } },
        },
        temp: {
          0: { min: { value: 32.75 } },
          1: { max: { value: 34.95 } },
        },
        weather_code: {
          value: 'mostly_clear',
        },
        wind_speed: {
          0: { min: { value: 2.19 } },
          1: { max: { value: 8.6 } },
        },
      },
      2: {
        feels_like: {
          0: { min: { value: 35.55 } },
          1: { max: { value: 43.68 } },
        },
        humidity: {
          0: { min: { value: 47 } },
          1: { max: { value: 63.2 } },
        },
        temp: {
          0: { min: { value: 32.75 } },
          1: { max: { value: 34.95 } },
        },
        weather_code: {
          value: 'mostly_clear',
        },
        wind_speed: {
          0: { min: { value: 2.19 } },
          1: { max: { value: 8.6 } },
        },
      },
    };
    const result = getWeatherForThreeDays(weatherData, [0, 1, 2]);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeLessThanOrEqual(3);
    const expected = [
      {
        realFeelTemp: 40,
        hum: 55,
        currentTemp: 34,
        weatherCode: 'mostly_clear',
        windSpeed: 5,
      },
      {
        realFeelTemp: 40,
        hum: 55,
        currentTemp: 34,
        weatherCode: 'mostly_clear',
        windSpeed: 5,
      },
      {
        realFeelTemp: 40,
        hum: 55,
        currentTemp: 34,
        weatherCode: 'mostly_clear',
        windSpeed: 5,
      },
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
