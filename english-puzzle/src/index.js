import './sass/style.scss';
import 'babel-polyfill';

import initGame from './js/gamePuzzle';
import {
  LOADSECTION, LOGINSECTION, STARTGAMESECTION, GAMESECTION, STATISTICSECTION,
  TOOLBARHAMBURGER, TOOLBARCONTAINER, HEADERWRAPPER,
} from './js/constants';

import signIn from './js/userUtils';
import { createUser, getGameProgressFromUserSetting } from './js/userAPI';
import { getFormData } from './js/utils';

async function initApp() {
  STATISTICSECTION.classList.add('hidden');
  if (localStorage.getItem('userId') && localStorage.getItem('userToken')) {
    const userObj = {
      userId: localStorage.getItem('userId'),
      userToken: localStorage.getItem('userToken'),
    };
    const gameProgress = await getGameProgressFromUserSetting(userObj);
    if (gameProgress === undefined) {
      console.log('NEED TO AUTHORIZE');
      LOADSECTION.classList.add('hidden');
      LOGINSECTION.classList.remove('hidden');
    } else {
      console.log('userID and userTOKEN OK!');
      LOADSECTION.classList.add('hidden');
      STARTGAMESECTION.classList.remove('hidden');
    }
  } else {
    console.log('NEW USER! NEED TO AUTHORIZE');
    LOADSECTION.classList.add('hidden');
    LOGINSECTION.classList.remove('hidden');
  }
}

initApp();

TOOLBARHAMBURGER.addEventListener('click', () => {
  TOOLBARHAMBURGER.classList.toggle('open');
  TOOLBARCONTAINER.classList.toggle('hidden');
});

HEADERWRAPPER.addEventListener('click', (event) => {
  if (event.target.classList.contains('button__logOut')) {
    LOGINSECTION.classList.remove('hidden');
    STARTGAMESECTION.classList.add('hidden');
    GAMESECTION.classList.add('hidden');
    TOOLBARCONTAINER.classList.add('hidden');
    TOOLBARHAMBURGER.classList.remove('open');
  }
});

LOGINSECTION.addEventListener('click', (event) => {
  document.querySelector('.error-message').innerHTML = '';
  if (event.target.classList.contains('button__signUp')) {
    console.log('button__signUp');
    event.preventDefault();
    const userData = getFormData();
    createUser(userData);
  } else if (event.target.classList.contains('button__signIn')) {
    console.log('button__signIn');
    event.preventDefault();
    const userData = getFormData();
    signIn(userData);
  }
});

STARTGAMESECTION.addEventListener('click', (event) => {
  if (event.target.classList.contains('start__button')) {
    STARTGAMESECTION.classList.add('hidden');
    GAMESECTION.classList.remove('hidden');
    initGame();
  }
});
