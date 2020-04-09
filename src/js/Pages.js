export default class Pages {
    constructor(id, mode, errorsAmount) {
        this.id = id;
        this.mode = mode;
        this.errorsAmount = errorsAmount;
    }

    //page generator
    generatePage() { 
        let mainPage = document.createElement('div');
        mainPage.classList.add('wrapper');
        
        let header = document.createElement('header');
        header.classList.add('header');

        let main = document.createElement('main');
        main.classList.add('main');

        let navBar = document.createElement('div');
        navBar.classList.add('navigation');

        let modeSwitch = document.createElement('div');
        modeSwitch.classList.add('modeSwitch');
        if(this.mode === 'train') {
            modeSwitch.classList.add('train');
        } else if(this.mode === 'play') {
            modeSwitch.classList.add('play');
        }

        let cardsWrapper = document.createElement('div');
        cardsWrapper.classList.add('cardsWrapper');

        if(this.id === 'main') {
            cardsWrapper.innerHTML = this.generateSectionCards();
        } else if(this.id === 'category') {
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
        let template = '<div>generateSectionCards</div>';
        //todo generateCard
        //add mode check
        return template;
    }

    generateCategoryCards() {
        console.log('generateCategoryCards');
        let template = '<div>generateCategoryCards</div>';
        //todo generateCard
        //add mode check
        return template;
    }
   

}

