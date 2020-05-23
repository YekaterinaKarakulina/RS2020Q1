export default async function getCoordinates(city) {
  const accessToken = '51f14f1731da46e89c71dc4853a0e3a8';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${accessToken}&pretty=1&no_annotations=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
