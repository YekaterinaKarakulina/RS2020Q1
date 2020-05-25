import getImage from '../APIs/imagesAPI';

export default async function renderImage(img) {
  try {
    // const img = await getImage();
    const { regular } = img.urls;
    const el = document.querySelector('.imgContainer');
    el.style = `background-image: url("${regular}")`;
  } catch (error) {
    console.log(error);
  }
}
