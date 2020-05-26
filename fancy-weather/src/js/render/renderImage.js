export default function renderImage(linkToImg) {
  const el = document.querySelector('.imgContainer');
  el.style = `background-image: url("${linkToImg}")`;
}
