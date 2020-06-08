import './sass/style.scss';

const TOOLBARCONTAINER = document.querySelector('.toolbar-container');
const TOOLBARHAMBURGER = document.querySelector('.toolbar-hamburger');

TOOLBARHAMBURGER.addEventListener('click', () => {
  TOOLBARHAMBURGER.classList.toggle('open');
  TOOLBARCONTAINER.classList.toggle('hidden');
});

