import { createElement } from 'lwc';
import { ariaAttributes, ariaProperties } from 'test-utils';

import Parent from 'x/parent';

describe('aria attribute on component', () => {
    let child;

    beforeEach(() => {
        const elm = createElement('x-parent', { is: Parent });
        document.body.appendChild(elm);

        child = elm.shadowRoot.querySelector('x-child');
    });

    it('can set aria attributes on a component from a template HTML', () => {
        for (const attrName of ariaAttributes) {
            expect(child.getAttribute(attrName)).toMatch(/^foo/);
        }
    });

    it('can get aria prop from within component', () => {
        const privateAriaProperties = child.getPrivateAriaProperties();
        expect(Object.keys(privateAriaProperties)).toEqual(ariaProperties);
        for (const prop of ariaProperties) {
            expect(privateAriaProperties[prop]).toMatch(/^foo/);
        }
    });

    it('can get aria prop from outside component', () => {
        for (const prop of ariaProperties) {
            expect(child[prop]).toMatch(/^foo/);
        }
    });
});
