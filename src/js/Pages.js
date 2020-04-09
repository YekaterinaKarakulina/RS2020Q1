import Hamburger from './Hamburger';
import Button from './Buttons';

export default class Pages {
  constructor(id, mode, errorsAmount) {
    this.id = id;
    this.mode = mode;
    this.errorsAmount = errorsAmount;
  }

  // page generator
  generatePage() {
    const mainPage = document.createElement('div');
    mainPage.classList.add('wrapper');

    const header = document.createElement('header');
    header.classList.add('header');

    const main = document.createElement('main');
    main.classList.add('main');


    const navBar = document.createElement('div');
    navBar.classList.add('navigation');
    const hamburger = new Hamburger('hamburger');
    navBar.innerHTML = hamburger.generateHamburgerContent();


    const modeSwitch = document.createElement('div');
    modeSwitch.classList.add('modeSwitch');
    const switchElement = new Button('switch');
    modeSwitch.innerHTML = switchElement.generateButtonObject();
    if (this.mode === 'train') {
      modeSwitch.classList.add('train');
    } else if (this.mode === 'play') {
      modeSwitch.classList.add('play');
    }

    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cardsWrapper');

    if (this.id === 'main') {
      cardsWrapper.innerHTML = this.generateSectionCards();
    } else if (this.id === 'category') {
      cardsWrapper.innerHTML = this.generateCategoryCards();
    }


    header.append(navBar);
    header.append(modeSwitch);
    mainPage.append(header);
    main.append(cardsWrapper);
    mainPage.append(main);
    document.body.append(mainPage);

    return mainPage;
  }


  generateSectionCards() {
    console.log('generateSectionCards');
    const template = '<div>generateSectionCards</div>';
    // todo generateCard
    // add mode check
    return template;
  }

  generateCategoryCards() {
    console.log('generateCategoryCards');
    const template = '<div>generateCategoryCards</div>';
    // todo generateCard
    // add mode check
    return template;
  }
}
