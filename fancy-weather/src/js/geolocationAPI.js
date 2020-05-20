export default async function getUserGeolocation() {
  const GeolocationAPIToken = 'efc6d47eafe53a';
  const url = `https://ipinfo.io/json?token=${GeolocationAPIToken}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
