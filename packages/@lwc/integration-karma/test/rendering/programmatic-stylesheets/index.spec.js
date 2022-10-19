import { createElement } from 'lwc';
import Basic from 'x/basic';
import InheritFromLightningElement from 'x/inheritFromLightningElement';

describe('programmatic stylesheets', () => {
    it('works for a basic usage of static stylesheets', () => {
        const elm = createElement('x-basic', { is: Basic });
        document.body.appendChild(elm);
        const h1 = document.createElement('h1');
        document.body.appendChild(h1);

        return new Promise((resolve) => requestAnimationFrame(() => resolve())).then(() => {
            expect(getComputedStyle(elm.shadowRoot.querySelector('h1')).color).toEqual(
                'rgb(255, 0, 0)'
            );
            // styles do not leak (e.g. synthetic shadow
            expect(getComputedStyle(h1).color).toEqual('rgb(0, 0, 0)');
        });
    });

    it('can attempt to inherit from lightning element which has no stylesheets', () => {
        const elm = createElement('x-inherit-from-lightning-element', {
            is: InheritFromLightningElement,
        });
        document.body.appendChild(elm);

        return new Promise((resolve) => requestAnimationFrame(() => resolve())).then(() => {
            expect(getComputedStyle(elm.shadowRoot.querySelector('h1')).color).toEqual(
                'rgb(255, 0, 0)'
            );
        });
    });
});
