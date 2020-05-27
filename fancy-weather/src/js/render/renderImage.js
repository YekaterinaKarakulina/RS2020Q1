import getImage from '../APIs/imagesAPI';

function renderImage(linkToImg) {
  const el = document.querySelector('.imgContainer');
  el.style = `background-image: url("${linkToImg}")`;
}

async function getAndRenderNewImage(imgProperties) {
  const linkToImg = await getImage(imgProperties);
  renderImage(linkToImg);
}

export { renderImage, getAndRenderNewImage };
