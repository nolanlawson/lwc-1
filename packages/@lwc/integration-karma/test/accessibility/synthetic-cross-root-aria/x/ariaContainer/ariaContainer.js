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
    linkUsingBoth({ reverseOrder = false, specialChars = false, addWhitespace = false } = {}) {
        // For some examples of characters that may need escaping, see:
        // https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape#basic_results
        // https://stackoverflow.com/a/9189067
        const id = specialChars ? 'a.b#c()[]{}--><&"\'\\' : 'my-id';

        const operations = [
            () => {
                this.refs.source.setAriaLabelledBy(addWhitespace ? `  ${id} \t` : id);
            },
            () => {
                this.refs.target.setId(id);
            },
        ];
        if (reverseOrder) {
            operations.reverse();
        }

        for (const operation of operations) {
            operation();
        }
    }

    @api
    linkMultipleTargets({ reverseOrder = false } = {}) {
        const operations = [
            () => {
                this.refs.source.setAriaLabelledBy('id1 id2');
            },
            () => {
                this.refs.target.setId('id1');
                this.refs.target2.setId('id2');
            },
        ];
        if (reverseOrder) {
            operations.reverse();
        }

        for (const operation of operations) {
            operation();
        }
    }
}
