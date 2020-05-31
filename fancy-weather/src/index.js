import './sass/style.scss';
import '@babel/polyfill';
import requestToAPIs from './js/requestToAPIs';
import { transferTemperature } from './js/utils/temperatureUtils';
import renderData from './js/render/renderData';
import getUserGeolocation from './js/APIs/userGeolocationAPI';
import { getAndRenderNewImage } from './js/render/renderImage';
import { languages } from './js/data/data';
import { switchLanguage } from './js/utils/translationsUtils';
import getLanguageAbbreviation from './js/utils/localStorageUtils';

const cityInput = document.querySelector('.input__city');
const submitButton = document.querySelector('.submit__button');

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
      document.querySelector('.spinner').classList.add('hidden');
      errorMessageElem.textContent = 'Can not find information by your request. Please, try another city name!';
    }
  }
}


submitButton.addEventListener('click', (event) => {
  
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
  switchLanguage(localStorage.getItem('language'), appObject);
});


const microphone = document.querySelector('.icon__microphone');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

const msg = new SpeechSynthesisUtterance();
msg.volume = 0.5;

function recognitionRestart() {
  recognition.stop();
  setTimeout(() => {
    recognition.start();
  }, 400);
  recognition.continuous = true;
}

function tellWeather() {
  speechSynthesis.cancel();
  const date = document.querySelector('.date').innerText.split(' ');

  const monthDay = date[1] + date[2];
  const currentTemperature = document.querySelector('.currentTemperature').innerText;

  const weatherDescription = document.querySelector('.weatherDescription').innerText;
  const realFeelTempTitle = document.querySelector('.realFeelTempTitle').innerText;
  const realFeelTempValue = document.querySelector('.realFeelTempValue').innerText;

  const windSpeedTitle = document.querySelector('.windSpeedTitle').innerText;
  const windSpeedValue = document.querySelector('.windSpeedValue').innerText.split(' ')[0];

  const humidityTitle = document.querySelector('.humidityTitle').innerText;
  const humidityValue = document.querySelector('.humidityValue').innerText;
  const language = getLanguageAbbreviation(localStorage.getItem('language'));
  msg.rate = 0.8;
  msg.pitch = 1;

  let template = '';

  switch (language) {
    case 'ru':
      msg.lang = 'ru';
      template = `Сегодня ${monthDay}. Температура воздуха ${currentTemperature} °. ${weatherDescription}.
      ${realFeelTempTitle} ${realFeelTempValue} °. ${windSpeedTitle} ${windSpeedValue} метров в секунду.
      ${humidityTitle} ${humidityValue} %.`;
      break;
    case 'be':
      msg.lang = 'ru';
      template = `сёння ${monthDay}. Тэмпература паветра ${currentTemperature} °. ${weatherDescription}.
      ${realFeelTempTitle} ${realFeelTempValue} °. ${windSpeedTitle} ${windSpeedValue} метраў у секунду.
      ${humidityTitle} ${humidityValue} %.`;
      break;
    default:
      msg.lang = 'en';
      template = `Today is ${monthDay}. Current temperature ${currentTemperature} °. ${weatherDescription}.
      ${realFeelTempTitle} ${realFeelTempValue} °. ${windSpeedTitle} ${windSpeedValue} meters per second.
      ${humidityTitle} ${humidityValue} %.`;
      break;
  }
  console.log(template);
  console.log(msg.lang);
  console.log(msg.volume);
  msg.text = template;
  speechSynthesis.speak(msg);
}


microphone.addEventListener('click', () => {
  microphone.classList.toggle('active');
  if (microphone.classList.contains('active')) {
    recognition.lang = getLanguageAbbreviation(localStorage.getItem('language'));
    recognition.start();
  } else {
    recognition.stop();
  }
});


recognition.addEventListener('result', (event) => {
  const transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript);
  console.log(transcript);
  const language = getLanguageAbbreviation(localStorage.getItem('language'));
  switch (language) {
    case 'en':
      switch (transcript[0]) {
        case 'weather':
          recognitionRestart();
          tellWeather();
          break;
        case 'quieter':
          recognitionRestart();
          msg.volume -= 0.2;
          break;
        case 'louder':
          recognitionRestart();
          msg.volume += 0.2;
          break;
        default:
          cityInput.value = transcript;
          submitButton.click();
          recognition.stop();
          microphone.classList.remove('active');
          break;
      }
      break;
    case 'ru':
      switch (transcript[0]) {
        case 'погода':
          recognitionRestart();
          tellWeather();
          break;
        case 'тише':
          recognitionRestart();
          msg.volume -= 0.2;
          break;
        case 'громче':
          recognitionRestart();
          msg.volume += 0.2;
          break;
        default:
          cityInput.value = transcript;
          submitButton.click();
          recognition.stop();
          microphone.classList.remove('active');
          break;
      }
      break;
    case 'be':
      switch (transcript[0]) {
        case 'надвор\'е':
          recognitionRestart();
          tellWeather();
          break;
        case 'цішэй':
          recognitionRestart();
          msg.volume -= 0.2;
          break;
        case 'гучней':
          recognitionRestart();
          msg.volume += 0.2;
          break;
        default:
          cityInput.value = transcript;
          submitButton.click();
          recognition.stop();
          microphone.classList.remove('active');
          break;
      }
      break;
    default:
      break;
  }
});

document.querySelector('.icon__sound').addEventListener('click', () => {
  tellWeather();
});
