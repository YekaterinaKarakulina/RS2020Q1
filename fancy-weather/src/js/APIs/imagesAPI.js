export default async function getImage(keywords) {
  const APIKey = 'YLzYNV0V3tq92NvXEuA-rk5ZJUlfpNgn_Pfh1joXme4';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${keywords}&client_id=${APIKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
