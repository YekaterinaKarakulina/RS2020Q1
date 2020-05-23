import getImage from '../APIs/imagesAPI';

export default async function renderImage() {
  const img = await getImage();
  const { regular } = img.urls;
  const el = document.querySelector('.imgContainer');
  el.style = `background-image: url("${regular}")`;
}
