export default class Hamburger {
  constructor(className) {
    this.className = className;
  }

  generateHamburgerContent() {
    let template = '';
    const navList = ['Main Page', 'Action(set A)', 'Action(set B)', 'Action(set C)', 'Adjective', 'Animal(set A)',
      'Animal(set B)', 'Clothes', 'Emotions'];
    template += '<div class="hamburger-container hidden">';
    template += '<button class="closeButton"></button>';
    template += '<div class="hamburger__menu">';
    template += '<nav class="hamburger__navigation">';
    template += ' <ul class="navigation" id="navigation">';
    for (let i = 0; i < navList.length; i++) {
      template += `<li class="nav-item"><a href="#">${navList[i]}</a></li>`;
    }
    template += '</ul>';
    template += '</nav>';
    template += '</div>';
    template += '</div>';
    return template;
  }
}
