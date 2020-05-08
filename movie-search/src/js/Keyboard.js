import Key from './Key';

const keyboardKeyCodes = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'Backslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp'],
  ['ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const keyboardEng = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['ShiftLeft', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ShiftRight', 'ArrowUp'],
  ['ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const keyboardRu = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['ShiftLeft', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'ShiftRight', 'ArrowUp'],
  ['ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const addLanguageSwitchDescriptionElement = () => {
  const text = document.createElement('div');
  text.classList.add('languages-switch-description');
  text.innerHTML = 'Switch language: ShiftLeft + ControlLeft';
  document.querySelector('.keyboard__keys').appendChild(text);
};

export default class Keyboard {
  constructor(name) {
    this.name = name;
  }

//   generateKeyboardContainer() {
//     const keyboardContainer = document.createElement('div');
//     keyboardContainer.classList.add(this.name);
//     const keys = document.createElement('div');
//     keys.classList.add('keyboard__keys');
//     keyboardContainer.append(keys);
//     document.body.append(keyboardContainer);
//   }

  renderKeys(isLanguageEng, isUppercase) {
    addLanguageSwitchDescriptionElement();
    const keysContainer = document.querySelector('.keyboard__keys');
    if (isLanguageEng === 'true') {
      this.generateKeys(keyboardKeyCodes, keyboardEng, isUppercase).forEach((key) => {
        keysContainer.append(key.generateKey());
        if (key.keyName === 'Backspace' || key.keyName === 'Delete' || key.keyName === 'Enter' || key.keyName === 'ArrowUp') {
          keysContainer.append(document.createElement('br'));
        }
      });
    } else {
      this.generateKeys(keyboardKeyCodes, keyboardRu, isUppercase).forEach((key) => {
        keysContainer.append(key.generateKey());
        if (key.keyName === 'Backspace' || key.keyName === 'Delete' || key.keyName === 'Enter' || key.keyName === 'ArrowUp') {
          keysContainer.append(document.createElement('br'));
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  generateKeys(keysClassArray, keysTitleArray, isUppercase) {
    const keys = [];
    for (let i = 0; i < keysTitleArray.length; i += 1) {
      for (let j = 0; j < keysTitleArray[i].length; j += 1) {
        keys.push(new Key(keysClassArray[i][j], keysTitleArray[i][j], isUppercase));
      }
    }
    return keys;
  }
}
