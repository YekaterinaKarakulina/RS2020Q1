export default class Key {
  constructor(keyClass, keyName, isUpperCase) {
    this.keyName = keyName;
    this.keyClass = keyClass;
    this.isUpperCase = isUpperCase;
  }

  // generate key
  generateKey() {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    let keyName = '';

    if (this.keyName === 'ShiftLeft' || this.keyName === 'ShiftRight') {
      keyName = 'Shift';
    } else if (this.keyName === 'ControlLeft' || this.keyName === 'ControlRight') {
      keyName = 'Ctrl';
    } else if (this.keyName === 'AltLeft' || this.keyName === 'AltRight') {
      keyName = 'Alt';
    } else if (this.keyName === 'Space') {
      keyName = '';
    } else if (this.keyName === 'ArrowLeft') {
      keyName = '◄';
    } else if (this.keyName === 'ArrowRight') {
      keyName = '►';
    } else if (this.keyName === 'ArrowUp') {
      keyName = '▲';
    } else if (this.keyName === 'ArrowDown') {
      keyName = '▼';
    } else {
      keyName = this.keyName;
    }
    if (this.keyName.length < 2) {
      if (this.isUpperCase === true) {
        key.innerHTML = keyName.toUpperCase();
      } else {
        key.innerHTML = keyName.toLowerCase();
      }
    } else {
      key.innerHTML = keyName;
    }

    if (this.keyName === 'Space') {
      key.classList.add('keyboard__key_extra-wide');
    }
    if (this.keyName === 'Tab' || this.keyName === 'ControlLeft' || this.keyName === 'ControlRight'
      || this.keyName === 'ShiftLeft' || this.keyName === 'ShiftRight' || this.keyName === 'Enter'
      || this.keyName === 'AltLeft' || this.keyName === 'AltRight' || this.keyName === 'Backspace') {
      key.classList.add('keyboard__key_wide');
    }
    if (this.keyName === 'CapsLock') {
      key.classList.add('keyboard__key_activatable');
      key.classList.add('keyboard__key_wide');
    }
    key.classList.add(this.keyClass);
    return key;
  }
}
