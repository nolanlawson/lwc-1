import { LightningElement, api } from 'lwc';

export default class TemplateTest extends LightningElement {
    static renderMode = 'light';
    connectedCallback() {
        this._template = this.template;
    }

    @api
    getTemplate() {
        return this._template;
    }
}
