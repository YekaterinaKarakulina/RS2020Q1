export default async function getWeatherData(lat, lng) {
  const APIKey = 'R3sD8JyfZmJhRMNGjhKgK4u7v9xYvGNv';
  const url = `https://api.climacell.co/v3/weather/forecast/daily?lat=${lat}&lon=${lng}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${APIKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
