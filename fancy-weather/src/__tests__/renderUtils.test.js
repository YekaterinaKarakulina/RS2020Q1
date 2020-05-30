import { createDomElement, createDomElementWithDataAttr } from '../js/utils/renderUtils';

describe('createDomElement', () => {
  it('Should return DOM element with className', () => {
    const result = createDomElement('div', 'className');
    expect(result).toMatchSnapshot();
  });
});

describe('createDomElement', () => {
  it('Should return DOM element with data attribute', () => {
    const result = createDomElementWithDataAttr('div', 'className', 'i18n', 'temp');
    expect(result).toMatchSnapshot();
  });
});
