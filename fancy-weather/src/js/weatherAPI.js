export default async function getWeatherData(loc) { // climacello
  const locArray = loc.split(',');
  const latitude = locArray[0];
  const longitude = locArray[1];
  const weatherAPIToken = 'R3sD8JyfZmJhRMNGjhKgK4u7v9xYvGNv';
  const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${weatherAPIToken}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
