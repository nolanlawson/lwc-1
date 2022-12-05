import { LightningElement, api } from 'lwc';

export default class extends LightningElement {
    @api
    setAriaLabelledBy(id) {
        this.refs.input.setAttribute('aria-labelledby', id);
    }

    @api
    getAriaLabelledBy() {
        return this.refs.input.getAttribute('aria-labelledby');
    }
}
