export default class Buttons {
    constructor(buttonType) {
        this.buttonType = buttonType;
    }

    generateButtonObject() {
        if(this.buttonType === 'switch') {
            return this.generateSwitch();
        } else if(this.buttonType === 'button') {
           // this.generateButton(buttonForm);
        }
    }

    generateSwitch() {
        let template = '';
        template = '<div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>        <label class="onoffswitch-label" for="myonoffswitch">            <span class="onoffswitch-inner"></span>            <span class="onoffswitch-switch"></span></label></div>';
        return template;
    }
}