import { createElement } from 'lwc';
import Basic from 'x/basic';
import Scoped from 'x/scoped';
import InheritFromLightningElement from 'x/inheritFromLightningElement';
import Invalid from 'x/invalid';
import Inherit from 'x/inherit';

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

    it('works for scoped stylesheets in light DOM', () => {
        const elm = createElement('x-scoped', { is: Scoped });
        document.body.appendChild(elm);
        const h1 = document.createElement('h1');
        document.body.appendChild(h1);

        return new Promise((resolve) => requestAnimationFrame(() => resolve())).then(() => {
            expect(getComputedStyle(elm.querySelector('h1')).color).toEqual('rgb(0, 128, 0)');
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

    it('can inherit from superclass', () => {
        const elm = createElement('x-inherit', {
            is: Inherit,
        });
        document.body.appendChild(elm);

        return new Promise((resolve) => requestAnimationFrame(() => resolve())).then(() => {
            const style = getComputedStyle(elm.shadowRoot.querySelector('h1'));
            expect(style.color).toEqual('rgb(0, 0, 255)');
            expect(style.backgroundColor).toEqual('rgb(0, 128, 0)');
        });
    });

    it('throws error if stylesheets is not an array of functions', () => {
        let elm;
        expect(() => {
            elm = createElement('x-invalid', {
                is: Invalid,
            });
        }).toLogErrorDev(
            /\[LWC error]: static stylesheets must be an array of CSS stylesheets. Found invalid stylesheets on <x-invalid>/
        );

        document.body.appendChild(elm);
        expect(elm.shadowRoot.querySelector('h1')).toBeTruthy(); // still renders the template correctly
    });
});
