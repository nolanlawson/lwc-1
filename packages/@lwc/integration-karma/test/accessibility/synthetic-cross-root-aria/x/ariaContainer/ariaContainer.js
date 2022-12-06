import { LightningElement, api } from 'lwc';

export default class extends LightningElement {
    @api usePropertyAccess = false;

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

    @api
    linkUsingBothAriaLabelledByAndId() {
        const id = 'my-brand-new-id';
        this.refs.source.setAriaLabelledBy(id);
        this.refs.target.setId(id);
    }
}
