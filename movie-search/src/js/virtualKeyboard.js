import Keyboard from './Keyboard';
import { searchInputField } from './constants';

const keyboardContainer = document.querySelector('.keyboard__keys');

sessionStorage.setItem('isLanguageEng', true);
let isCapsLockOn = false;
let isLanguageEng = sessionStorage.getItem('isLanguageEng');

function toggleKeyClass(keyCode, action) {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    if (element.classList.contains(keyCode)) {
      if (action === 'add') {
        element.classList.add('pressed');
      } else if (action === 'remove') {
        element.classList.remove('pressed');
      }
    }
  });
}

function clearKeyboardContainer() {
  document.querySelector('.keyboard__keys').innerHTML = '';
}

function activateCapsLock(keyboard) {
  clearKeyboardContainer();
  keyboard.renderKeys(sessionStorage.getItem('isLanguageEng'), isCapsLockOn);
  if (isCapsLockOn === true) {
    document.querySelector('.keyboard__key_activatable').classList.add('active');
  } else {
    document.querySelector('.keyboard__key_activatable').classList.remove('active');
  }
}

function switchLanguage() {
  isLanguageEng = !isLanguageEng;
  sessionStorage.setItem('isLanguageEng', isLanguageEng);
  clearKeyboardContainer();
  const keyboard = new Keyboard('keyboard');
  keyboard.renderKeys(sessionStorage.getItem('isLanguageEng'), isCapsLockOn);
  toggleKeyClass('ShiftLeft', 'add');
  toggleKeyClass('ControlLeft', 'add');
}

function printToTextarea(keyboard, event, keyCode) {
  let textareaContent = searchInputField.value;
  let keyContent = '';
  if (keyCode === 'Backspace') {
    keyContent = textareaContent.substring(0, textareaContent.length - 1);
    textareaContent = '';
  } else if (keyCode === 'Tab') {
    keyContent = '    ';
  } else if (keyCode === 'Delete') {
    keyContent = '';
  } else if (keyCode === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    keyContent = '';
    activateCapsLock(keyboard, sessionStorage.getItem('isLanguageEng'));
  } else if (keyCode === 'Enter') {
    keyContent = '\n';
  } else if (keyCode === 'Space') {
    keyContent = ' ';
  } else if (keyCode === 'ShiftLeft') {
    keyContent = '';
    if (event.ctrlKey && event.shiftKey && event.altKey) {
      toggleKeyClass('ShiftLeft', 'add');
      toggleKeyClass('ControlLeft', 'add');
      toggleKeyClass('AltLeft', 'add');
    } else if (event.ctrlKey && event.shiftKey) {
      switchLanguage(event);
    }
  } else if (keyCode === 'ControlLeft') {
    keyContent = '';
    if (event.ctrlKey && event.shiftKey && event.altKey) {
      toggleKeyClass('ShiftLeft', 'add');
      toggleKeyClass('ControlLeft', 'add');
      toggleKeyClass('AltLeft', 'add');
    } else if (event.ctrlKey && event.shiftKey) {
      switchLanguage();
    }
  } else if (keyCode === 'ShiftRight') {
    keyContent = '';
  } else if (keyCode === 'ControlRight') {
    keyContent = '';
  } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
    keyContent = '';
  } else if (keyCode === 'ArrowUp') {
    keyContent = '↑';
  } else if (keyCode === 'ArrowLeft') {
    keyContent = '←';
  } else if (keyCode === 'ArrowDown') {
    keyContent = '↓';
  } else if (keyCode === 'ArrowRight') {
    keyContent = '→';
  } else {
    const keysElements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < keysElements.length; i += 1) {
      if (keysElements[i].classList.contains(keyCode)) {
        keyContent = keysElements[i].innerHTML;
      }
    }
  }
  textareaContent += keyContent;
  searchInputField.value = textareaContent;
}

function keyboardHandler(keyboard) {
  document.addEventListener('keydown', (event) => {
    if (!document.querySelector('.keyboard__keys').classList.contains('hidden')) {
      console.log(event);
      toggleKeyClass(event.code, 'add');
      printToTextarea(keyboard, event, event.code, event.key);
      event.preventDefault();
    }
  });
  document.addEventListener('keyup', (event) => {
    if (!document.querySelector('.keyboard__keys').classList.contains('hidden')) {
      toggleKeyClass(event.code, 'remove');
    }
  });
}

function mouseHandler(keyboard) {
  let keyCode = '';
  let keyButton;
  keyboardContainer.addEventListener('mousedown', (event) => {
    console.log(event.target);
    keyButton = event.target.closest('.keyboard__key');
    if (keyButton) {
      if (keyButton.classList[keyButton.classList.length - 1] === 'active') {
        keyCode = keyButton.classList[keyButton.classList.length - 2];
      } else {
        keyCode = keyButton.classList[keyButton.classList.length - 1];
      }
      keyButton.classList.add('pressed');
    }
    printToTextarea(keyboard, event, keyCode);
  });
  keyboardContainer.addEventListener('mouseup', () => {
    if (keyButton) {
      keyButton.classList.remove('pressed');
    }
  });
}

export { clearKeyboardContainer, keyboardHandler, mouseHandler };
