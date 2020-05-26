export default async function getGeolocation(city) {
  const APIKey = '51f14f1731da46e89c71dc4853a0e3a8';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${APIKey}&pretty=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
