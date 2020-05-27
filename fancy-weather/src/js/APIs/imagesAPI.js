export default async function getImage(keywords) {
  const APIKey = 'YLzYNV0V3tq92NvXEuA-rk5ZJUlfpNgn_Pfh1joXme4';
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${keywords}&client_id=${APIKey}`;
  const urlToImg = 'https://images.unsplash.com/photo-1496267472830-2eb2b7e0942d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNjQ0N30';
  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();
    return data.urls.regular;
  }
  return urlToImg;
}
