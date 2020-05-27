import './sass/style.scss';
import '@babel/polyfill';
import requestToAPIs from './js/requestToAPIs';
import { transferTemperature } from './js/utils/temperatureUtils';
import renderData from './js/render/renderData';
import getUserGeolocation from './js/APIs/userGeolocationAPI';
import { getAndRenderNewImage } from './js/render/renderImage';
import { languages } from './js/data/data';


let appObject;
let appObjCopy;

async function init() {
  console.log(`init LC lang ${localStorage.getItem('language')}`);
  console.log(`init LC temp ${localStorage.getItem('temp')}`);
  if (localStorage.getItem('language') === null) {
    localStorage.setItem('language', 'English');
    console.log(`if language null , set to eng ${localStorage.getItem('language')}`);
  }
  if (localStorage.getItem('temp') === null) {
    localStorage.setItem('temp', 'isCelsius');
    console.log(`if temp null , set to isCelsius ${localStorage.getItem('temp')}`);
  }
  document.querySelector('.dropdown-toggle').innerHTML = languages[localStorage.getItem('language')]; //

  const userGeolocation = await getUserGeolocation();
  const { city } = userGeolocation;
  appObject = await requestToAPIs(city);
  renderData(appObject);
}

init();

let timerId = setTimeout(function tick() {
  console.log(appObject);
  if (appObject) {
    appObjCopy = appObject;
  }
  if (appObjCopy) {
    const localeStrDate = new Date().toLocaleString('en-US', { timeZone: `${appObjCopy.timezone}` });
    const currentDate = new Date(Date.parse(localeStrDate));

    let HH = currentDate.getHours();
    if (HH < 10) {
      HH = `0${HH}`;
    }
    let mm = currentDate.getMinutes();
    if (mm < 10) {
      mm = `0${mm}`;
    }
    let ss = currentDate.getSeconds();
    if (ss < 10) {
      ss = `0${ss}`;
    }
    document.querySelector('.time').textContent = `${HH}:${mm}:${ss}`;
    timerId = setTimeout(tick, 1000);
  }
  if (appObjCopy === undefined) {
    timerId = setTimeout(tick, 1000);
  }
}, 2000);


async function searchFromInputForm(city) {
  const errorMessageElem = document.querySelector('.errorMessage');
  if (city.match(/[!@#$%^&*()_+=]/g)) {
    errorMessageElem.textContent = 'Unappropriate city name. Please, try another city name!';
  } else if (city.length <= 3) {
    errorMessageElem.textContent = 'Too short city name, minimum length is 4 symbols!';
  } else if (city.length > 3) {
    appObject = await requestToAPIs(city);
    if (appObject) {
      renderData(appObject);
    } else {
      errorMessageElem.textContent = 'Can not find information by your request. Please, try another city name!';
    }
  }
}


document.querySelector('.submit__button').addEventListener('click', (event) => {
  const cityInput = document.querySelector('.input__city');
  cityInput.focus();
  event.preventDefault();
  const city = cityInput.value;
  searchFromInputForm(city);
});

document.querySelector('.tempInput').addEventListener('click', () => {
  const tempElements = document.querySelectorAll('.temperature');
  transferTemperature(tempElements);
});


document.querySelector('.icon__rotate').addEventListener('click', () => {
  getAndRenderNewImage(appObject.imgProperties);
});

document.querySelector('.dropdown-menu').addEventListener('click', (event) => {
  console.log('dropdown');
  const appLanguage = event.target.closest('.dropdown-item').innerText;
  localStorage.setItem('language', appLanguage);
  console.log(`localStorage.setItem('language', appLanguage) ${appLanguage}`);
  document.querySelector('.dropdown-toggle').innerHTML = languages[localStorage.getItem('language')];
});
