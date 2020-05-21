/* eslint-disable camelcase */
function extractWeatherCode(object) {
  return object.value;
}

function extractWeatherInfo(weatherObject) {
  return (weatherObject[0].min.value + weatherObject[1].max.value) / 2;
}

export default function getWeatherForDay(weatherData, dayIndex) {
  const day = weatherData[dayIndex];

  const { feels_like } = day;
  const realFeelTemp = Math.round(extractWeatherInfo(feels_like));

  const { humidity } = day;
  const hum = Math.round(extractWeatherInfo(humidity));

  const { temp } = day;
  const currentTemp = Math.round(extractWeatherInfo(temp));

  const { weather_code } = day;
  const weatherCode = extractWeatherCode(weather_code);

  const { wind_speed } = day;
  const windSpeed = Math.round(extractWeatherInfo(wind_speed));

  return {
    realFeelTemp, hum, currentTemp, weatherCode, windSpeed,
  };
}
