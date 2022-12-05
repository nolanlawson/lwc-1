import { LightningElement, api } from 'lwc';

export default class extends LightningElement {
    @api
    getId() {
        return this.refs.label.getAttribute('id');
    }

    @api
    setId(id) {
        this.refs.label.setAttribute('id', id);
    }
}
