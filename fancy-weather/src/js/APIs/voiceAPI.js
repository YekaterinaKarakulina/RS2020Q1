import getLanguageAbbreviation from '../utils/localStorageUtils';

export default function voiceRecognitionAndSpeak() {
  const cityInput = document.querySelector('.input__city');
  const submitButton = document.querySelector('.submit__button');

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
}
