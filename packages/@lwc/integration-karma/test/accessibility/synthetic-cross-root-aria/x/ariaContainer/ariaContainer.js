import { LightningElement, api } from 'lwc';

export default class extends LightningElement {
    @api
    linkUsingAriaLabelledBy() {
        const id = this.refs.target.getId();
        this.refs.source.setAriaLabelledBy(id);
    }

    @api
    linkUsingId() {
        const ariaLabelledBy = this.refs.source.getAriaLabelledBy();
        this.refs.target.setId(ariaLabelledBy);
    }
}
