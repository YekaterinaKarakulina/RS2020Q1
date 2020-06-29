import Key from './Key';
import { keyboardKeyCodes, keyboardEng, keyboardRu } from './KeyboardData';

const addLanguageSwitchDescriptionElement = () => {
  const text = document.createElement('div');
  text.classList.add('languages-switch-description');
  text.textContent = 'Switch language: ShiftLeft + ControlLeft';
  document.querySelector('.keyboard__keys').appendChild(text);
};

export default class Keyboard {
  constructor(name) {
    this.name = name;
  }

  renderKeys(isLanguageEng, isUppercase) {
    addLanguageSwitchDescriptionElement();
    if (isLanguageEng === 'true') {
      this.generateKeys(keyboardKeyCodes, keyboardEng, isUppercase);
    } else {
      this.generateKeys(keyboardKeyCodes, keyboardRu, isUppercase);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  generateKeys(keysClassArray, keysTitleArray, isUppercase) {
    const keys = [];
    const keysContainer = document.querySelector('.keyboard__keys');
    for (let i = 0; i < keysTitleArray.length; i += 1) {
      for (let j = 0; j < keysTitleArray[i].length; j += 1) {
        keys.push(new Key(keysClassArray[i][j], keysTitleArray[i][j], isUppercase));
      }
    }
    keys.forEach((key) => {
      keysContainer.append(key.generateKey());
      if (key.keyName === 'Backspace' || key.keyName === 'Delete' || key.keyName === 'Enter' || key.keyName === 'ArrowUp') {
        keysContainer.append(document.createElement('br'));
      }
    });
  }
}
