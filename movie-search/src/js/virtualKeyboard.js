import Keyboard from './Keyboard';
import { searchInputField, keyboardKeys } from './constants';

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
  keyboardKeys.innerHTML = '';
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
}

function printToTextarea(keyboard, event, keyCode) {
  let textareaContent = searchInputField.value;
  let cursorPos = searchInputField.selectionStart;
  const left = searchInputField.value.slice(0, cursorPos);
  const right = searchInputField.value.slice(cursorPos);
  let keyContent = '';
  if (keyCode === 'Backspace') {
    textareaContent = '';
    keyContent = `${left.slice(0, -1)}${right}`;
    cursorPos -= 1;
  } else if (keyCode === 'Tab') {
    textareaContent = '';
    keyContent = `${left}\t${right}`;
    cursorPos += 1;
  } else if (keyCode === 'Delete') {
    keyContent = `${left}${right.slice(1)}`;
  } else if (keyCode === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    keyContent = '';
    activateCapsLock(keyboard, sessionStorage.getItem('isLanguageEng'));
  } else if (keyCode === 'Space') {
    textareaContent = '';
    keyContent = `${left} ${right}`;
    cursorPos += 1;
  } else if (keyCode === 'ShiftLeft') {
    keyContent = '';
    if (event.ctrlKey && event.shiftKey && event.altKey) {
      toggleKeyClass('ShiftLeft', 'add');
      toggleKeyClass('ControlLeft', 'add');
      toggleKeyClass('AltLeft', 'add');
    } else if ((event.ctrlKey && event.shiftKey)) {
      switchLanguage();
      toggleKeyClass('ShiftLeft', 'add');
      toggleKeyClass('ControlLeft', 'add');
    } else if (document.querySelector('.ControlLeft').classList.contains('pressed')) {
      switchLanguage();
    }
  } else if (keyCode === 'ControlLeft') {
    keyContent = '';
    if (event.ctrlKey && event.shiftKey && event.altKey) {
      toggleKeyClass('ShiftLeft', 'add');
      toggleKeyClass('ControlLeft', 'add');
      toggleKeyClass('AltLeft', 'add');
    } else if (event.ctrlKey && event.shiftKey) {
      switchLanguage();
      toggleKeyClass('ShiftLeft', 'add');
      toggleKeyClass('ControlLeft', 'add');
    } else if (document.querySelector('.ShiftLeft').classList.contains('pressed')) {
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
    cursorPos += 1;
  } else if (keyCode === 'ArrowLeft') {
    cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
  } else if (keyCode === 'ArrowDown') {
    keyContent = '↓';
    cursorPos += 1;
  } else if (keyCode === 'ArrowRight') {
    cursorPos += 1;
  } else {
    const keysElements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < keysElements.length; i += 1) {
      if (keysElements[i].classList.contains(keyCode)) {
        keyContent = keysElements[i].innerHTML;
        cursorPos += 1;
      }
    }
  }
  textareaContent += keyContent;
  searchInputField.value = textareaContent;
  searchInputField.setSelectionRange(cursorPos, cursorPos);
}

function keyboardHandler(keyboard) {
  document.addEventListener('keydown', (event) => {
    if (!keyboardKeys.classList.contains('hidden')) {
      toggleKeyClass(event.code, 'add');
      printToTextarea(keyboard, event, event.code, event.key);
      event.preventDefault();
    }
  });
  document.addEventListener('keyup', (event) => {
    if (!keyboardKeys.classList.contains('hidden')) {
      toggleKeyClass(event.code, 'remove');
    }
  });
}

function mouseHandler(keyboard) {
  let keyCode = '';
  let keyButton;
  keyboardKeys.addEventListener('mousedown', (event) => {
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
  keyboardKeys.addEventListener('mouseup', () => {
    if (keyButton) {
      keyButton.classList.remove('pressed');
    }
  });
}

export { clearKeyboardContainer, keyboardHandler, mouseHandler };
