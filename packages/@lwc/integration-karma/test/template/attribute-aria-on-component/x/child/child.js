import { LightningElement, api } from 'lwc';
import { ariaProperties } from 'test-utils';

export default class extends LightningElement {
    @api
    getPrivateAriaProperties() {
        const result = {};
        for (const prop of ariaProperties) {
            result[prop] = this[prop];
        }
        return result;
    }
}
