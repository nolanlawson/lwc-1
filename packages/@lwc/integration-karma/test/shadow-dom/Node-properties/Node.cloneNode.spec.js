import { createElement } from 'lwc';

import Slotted from 'x/slotted';
import Container from 'x/container';
import ComplexCloneNode from 'x/complexCloneNode';

const expectedError = (tagName) =>
    `Error: [LWC error]: VM for tag name "${tagName}" is undefined. ` +
    'This indicates that an element was created with this tag name, which is already reserved ' +
    'by an LWC component. Use lwc.createElement instead to create elements.';

function testCloneNodeShadowRoot(deep) {
    it(`should not clone the associated shadowRoot when cloning an element with deep=${deep}`, () => {
        const elm = createElement('x-slotted', { is: Slotted });
        document.body.appendChild(elm);

        expect(elm.shadowRoot).toBeDefined();

        // Depending if ShadowRoot is implemented natively by the browser Element.shadowRoot could be undefined. Since
        // LWC is not globally patching the Element prototype, we need to check if shadowRoot is either null or
        // undefined.
        let clone;
        expect(() => {
            clone = clone = elm.cloneNode(deep);
        }).toLogErrorDev(expectedError('x-slotted'));
        expect(clone.shadowRoot === null || clone.shadowRoot === undefined).toBe(true);
    });

    // Node.cloneNode should throw an error in all modes
    it(`should throw when invoking cloneNode on a shadowRoot with deep=${deep}`, () => {
        const elm = createElement('x-slotted', { is: Slotted });
        document.body.appendChild(elm);

        // #984 - Can't assert against Error type, since by spec cloneNode throws a `NotSupportedError` while in LWC it
        // throws a standard Error.
        expect(() => {
            elm.shadowRoot.cloneNode(deep);
        }).toThrowError();
    });
}

describe('Node.cloneNode', () => {
    testCloneNodeShadowRoot(true);
    testCloneNodeShadowRoot(false);

    describe('deep=false', () => {
        it('should not clone shadow tree', () => {
            const elm = createElement('x-slotted', { is: Slotted });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.cloneNode(false);
            }).toLogErrorDev(expectedError('x-slotted'));
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<x-slotted></x-slotted>');
        });

        it('should not clone slotted content', () => {
            const elm = createElement('x-slotted', { is: Slotted });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.shadowRoot.querySelector('x-container').cloneNode(false);
            }).toLogErrorDev(expectedError('x-container'));
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<x-container></x-container>');
        });
    });

    describe('deep=undefined', () => {
        it('should not clone shadow tree', () => {
            const elm = createElement('x-slotted', { is: Slotted });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.cloneNode();
            }).toLogErrorDev(expectedError('x-slotted'));
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<x-slotted></x-slotted>');
        });

        it('should not clone slotted content', () => {
            const elm = createElement('x-slotted', { is: Slotted });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.shadowRoot.querySelector('x-container').cloneNode();
            }).toLogErrorDev(expectedError('x-container'));
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<x-container></x-container>');
        });

        it('should not clone children of parent node with vanilla html', () => {
            const table = document.createElement('table');
            table.innerHTML = '<tr><th>Cat</th></tr><tr><th>Dog</th></tr>';
            document.body.appendChild(table);
            const clone = table.cloneNode();
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<table></table>');
        });
    });

    describe('deep=true', () => {
        it('should not clone shadow tree', () => {
            const elm = createElement('x-slotted', { is: Slotted });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.cloneNode(true);
            }).toLogErrorDev(expectedError('x-slotted'));
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<x-slotted></x-slotted>');
        });

        it('should clone slotted content', () => {
            const elm = createElement('x-slotted', { is: Slotted });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.shadowRoot.querySelector('x-container').cloneNode(true);
            }).toLogErrorDev(expectedError('x-container'));
            expect(clone.childNodes.length).toBe(1);
            expect(clone.outerHTML).toBe(
                '<x-container><div class="slotted">Slotted Text</div></x-container>'
            );
        });

        it('should clone complex slotted content', () => {
            const elm = createElement('x-complex-clone-node', { is: ComplexCloneNode });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.shadowRoot.querySelector('div').cloneNode(true);
            }).toLogErrorDev([
                expectedError('x-container'),
                expectedError('x-container'),
                expectedError('x-container'),
            ]);
            expect(clone.childNodes.length).toBe(2);
            expect(clone.outerHTML).toBe(
                '<div>A<x-container><x-container>B</x-container><div><x-container>C</x-container></div></x-container></div>'
            );
        });

        it('should not clone default slotted content', () => {
            const elm = createElement('x-container', { is: Container });
            document.body.appendChild(elm);

            let clone;
            expect(() => {
                clone = elm.cloneNode(true);
            }).toLogErrorDev(expectedError('x-container'));
            expect(clone.childNodes.length).toBe(0);
            expect(clone.outerHTML).toBe('<x-container></x-container>');
        });

        it('should clone children of parent node with vanilla html', () => {
            const table = document.createElement('table');
            table.innerHTML = '<tbody><tr><th>Cat</th></tr><tr><th>Dog</th></tr></tbody>';
            document.body.appendChild(table);
            const clone = table.cloneNode(true);
            expect(clone.childNodes.length).toBe(1);
            expect(clone.outerHTML).toBe(
                '<table><tbody><tr><th>Cat</th></tr><tr><th>Dog</th></tr></tbody></table>'
            );
        });
    });
});
