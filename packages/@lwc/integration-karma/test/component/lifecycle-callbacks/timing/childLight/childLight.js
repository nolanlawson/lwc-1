import { LightningElement, api } from 'lwc';

export default class extends LightningElement {
    static renderMode = 'light';
    @api value = 'foo';

    constructor() {
        super();
        window.timingBuffer.push('child:constructor');
    }

    connectedCallback() {
        window.timingBuffer.push('child:connectedCallback');
    }

    disconnectedCallback() {
        if (window.timingBuffer) {
            window.timingBuffer.push('child:disconnectedCallback');
        }
    }

    renderedCallback() {
        window.timingBuffer.push('child:renderedCallback');
    }
}
