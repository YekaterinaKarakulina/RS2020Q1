import './sass/style.scss';
import 'babel-polyfill';

import { createUser, loginUser } from './js/userAPI';

const TOOLBARCONTAINER = document.querySelector('.toolbar-container');
const TOOLBARHAMBURGER = document.querySelector('.toolbar-hamburger');
const LOGINSECTION = document.querySelector('.login-page');
const STARTGAMESECTION = document.querySelector('.start-page');
const GAMESECTION = document.querySelector('.game-page');


/* ----- HAMBURGER ----- */
TOOLBARHAMBURGER.addEventListener('click', () => {
  TOOLBARHAMBURGER.classList.toggle('open');
  TOOLBARCONTAINER.classList.toggle('hidden');
});

/* ----- LOGIN ----- */
function getFormData() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  return { email, password };
}

async function signIn(userData) {
  const loginResult = await loginUser(userData);
  console.log(loginResult.message);
  if (loginResult.message === 'Authenticated') {
    console.log('userAuthorized');
    localStorage.setItem('userAuthorized', 'true');
    LOGINSECTION.classList.add('hidden');
    STARTGAMESECTION.classList.remove('hidden');
  }
}

document.addEventListener('click', (event) => {
  document.querySelector('.error-message').innerHTML = '';
  if (event.target.classList.contains('button__signUp')) {
    event.preventDefault();
    const userData = getFormData();
    createUser(userData);
  } else if (event.target.classList.contains('button__signIn')) {
    event.preventDefault();
    const userData = getFormData();
    signIn(userData);
  } else if (event.target.classList.contains('start__button')) {
    STARTGAMESECTION.classList.add('hidden');
    GAMESECTION.classList.remove('hidden');
  }
});
