import Keyboard from './Keyboard';
import { searchInputField, keyboardKeys } from './constants';

sessionStorage.setItem('isLanguageEng', true);
let isCapsLockOn = false;
let isLanguageEng = sessionStorage.getItem('isLanguageEng');

function toggleKeyClass(keyCode, action) {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    const { classList } = element;
    if (classList.contains(keyCode)) {
      if (action === 'add') {
        classList.add('pressed');
      } else if (action === 'remove') {
        classList.remove('pressed');
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
  const capsLockKey = document.querySelector('.keyboard__key_activatable');
  capsLockKey.classList.toggle('active');
}

function switchLanguage() {
  isLanguageEng = !isLanguageEng;
  sessionStorage.setItem('isLanguageEng', isLanguageEng);
  clearKeyboardContainer();
  const keyboard = new Keyboard('keyboard');
  keyboard.renderKeys(sessionStorage.getItem('isLanguageEng'), isCapsLockOn);
}

function checkCapsLock(event) {
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
}

function printToTextarea(keyboard, event, keyCode) {
  let textareaContent = searchInputField.value;
  let cursorPos = searchInputField.selectionStart;
  let keyContent = '';
  const keysElements = document.querySelectorAll('.keyboard__key');
  const left = searchInputField.value.slice(0, cursorPos);
  const right = searchInputField.value.slice(cursorPos);

  switch (keyCode) {
    case 'Backspace':
      textareaContent = '';
      keyContent = `${left.slice(0, -1)}${right}`;
      cursorPos -= 1;
      break;
    case 'Tab':
      textareaContent = '';
      keyContent = `${left}\t${right}`;
      cursorPos += 1;
      break;
    case 'Delete':
      textareaContent = '';
      keyContent = `${left}${right.slice(1)}`;
      break;
    case 'CapsLock':
      isCapsLockOn = !isCapsLockOn;
      keyContent = '';
      activateCapsLock(keyboard, sessionStorage.getItem('isLanguageEng'));
      break;
    case 'Enter':
      keyContent = '';
      break;
    case 'Space':
      textareaContent = '';
      keyContent = `${left} ${right}`;
      cursorPos += 1;
      break;
    case 'ShiftLeft':
      keyContent = '';
      checkCapsLock(event);
      break;
    case 'ControlLeft':
      keyContent = '';
      checkCapsLock(event);
      break;
    case 'ArrowUp':
      keyContent = '↑';
      cursorPos += 1;
      break;
    case 'ArrowDown':
      keyContent = '↓';
      cursorPos += 1;
      break;
    case 'ArrowLeft':
      cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
      break;
    case 'ArrowRight':
      cursorPos += 1;
      break;
    case 'ShiftRight':
      keyContent = '';
      break;
    case 'ControlRight':
      keyContent = '';
      break;
    case 'AltLeft':
      keyContent = '';
      break;
    case 'AltRight':
      keyContent = '';
      break;
    default:
      keysElements.forEach((value, index) => {
        if (keysElements[index].classList.contains(keyCode)) {
          keyContent = keysElements[index].innerHTML;
          cursorPos += 1;
        }
      });
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
      searchInputField.focus();
    }
  });
}

export { clearKeyboardContainer, keyboardHandler, mouseHandler };
