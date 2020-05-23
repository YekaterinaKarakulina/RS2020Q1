export default async function getUserGeolocation() {
  const APIKey = 'efc6d47eafe53a';
  const url = `https://ipinfo.io/json?token=${APIKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
