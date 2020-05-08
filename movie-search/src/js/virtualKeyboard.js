import Keyboard from './Keyboard';
import { searchInputField } from './constants';

sessionStorage.setItem('isLanguageEng', true);
let isCapsLockOn = false;
let isLanguageEng = sessionStorage.getItem('isLanguageEng');
let textareaContent = '';
let keyContent = '';


function pressedKeyHandler(keyCode) {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    if (element.classList.contains(keyCode)) {
      element.classList.add('pressed');
    }
  });
}

function unpressedKeyHandler(keyCode) {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    if (element.classList.contains(keyCode)) {
      element.classList.remove('pressed');
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
  pressedKeyHandler('ShiftLeft');
  pressedKeyHandler('ControlLeft');
}

function printToTextarea(keyboard, event, keyCode) {
  keyContent = '';
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
      pressedKeyHandler('ShiftLeft');
      pressedKeyHandler('ControlLeft');
      pressedKeyHandler('AltLeft');
    } else if (event.ctrlKey && event.shiftKey) {
      switchLanguage(event);
    }
  } else if (keyCode === 'ControlLeft') {
    keyContent = '';
    if (event.ctrlKey && event.shiftKey && event.altKey) { 
      pressedKeyHandler('ShiftLeft');
      pressedKeyHandler('ControlLeft');
      pressedKeyHandler('AltLeft');
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

export default function keyboardHandler(keyboard) {
  keyboard.renderKeys(isLanguageEng, isCapsLockOn);
  document.addEventListener('keydown', (event) => {
    console.log(event);
    pressedKeyHandler(event.code);
    printToTextarea(keyboard, event, event.code, event.key);
    event.preventDefault();
  });
  document.addEventListener('keyup', (event) => {
    unpressedKeyHandler(event.code);
  });
}
