/* export default async function getWeatherInfo() {
  const weatherAPIToken = '20699dba1886b7bc0707b05b23ae1e06';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=Kiev&lang=ua&units=metric&APPID=${weatherAPIToken}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
} */

export default async function getWeatherInfo(loc) { // climacello
  const locArray = loc.split(',');
  const latitude = locArray[0];
  const longitude = locArray[1];
  const weatherAPIToken = 'R3sD8JyfZmJhRMNGjhKgK4u7v9xYvGNv';
  const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${weatherAPIToken}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
