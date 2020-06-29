export default class Key {
  constructor(keyClass, keyName, isUpperCase) {
    this.keyName = keyName;
    this.keyClass = keyClass;
    this.isUpperCase = isUpperCase;
  }

  generateKey() {
    const specificKeys = ['Tab', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'Enter',
      'AltLeft', 'AltRight', 'Backspace'];
    const lengthOfCommonKeysName = 1;
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
    if (this.keyName.length <= lengthOfCommonKeysName) {
      key.innerHTML = this.isUpperCase ? keyName.toUpperCase() : keyName.toLowerCase();
    } else {
      key.innerHTML = keyName;
    }
    if (this.keyName === 'Space') {
      key.classList.add('keyboard__key_extra-wide');
    }
    if (specificKeys.includes(this.keyName)) {
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
