import { LightningElement, api } from 'lwc';

export default class Illustration extends LightningElement {
    @api heading;
    @api bodyText;
    @api size;
    @api illustration;
    get containerCSSClass() {
        let css = 'slds-illustration slds-illustration_';
        if (this.size === 'large') {
            css += this.size;
        } else {
            css += 'small';
        }
        return css;
    }
}