export default async function getImage() {
  const accessToken = 'YLzYNV0V3tq92NvXEuA-rk5ZJUlfpNgn_Pfh1joXme4';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${accessToken}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
