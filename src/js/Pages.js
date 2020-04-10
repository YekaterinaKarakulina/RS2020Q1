import Hamburger from './Hamburger';
import Button from './Buttons';
import cardsActionA from './cardsData/cardsActionA';
import Cards from './Cards';
import cardsMainPage from './cardsData/cardsMainPage';

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

    const hamburger = new Hamburger('hamburger');
    header.innerHTML = hamburger.generateHamburgerContent() + hamburger.generateHamburgerElement();

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
      console.log('generateSectionCards');
      cardsWrapper.append((new Cards('sectionCards').generateSectionCards(cardsActionA)));
    } else if (this.id === 'category') {
      console.log('generateCategoryCards');
      cardsWrapper.append((new Cards('categoryCards').generateCategoryCards(cardsMainPage)));
  
    }

    header.append(modeSwitch);
    mainPage.append(header);
    main.append(cardsWrapper);
    mainPage.append(main);
    document.body.append(mainPage);

    return mainPage;
  }
}