import { createElement } from 'lwc';
import LwcReserved from 'x/lwcReserved';

if (window.lwcRuntimeFlags.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE) {
    describe('native lifecycle callbacks', () => {
        it('throws in connectedCallback/disconnectedCallback for manually-created element with tag name reserved by LWC', () => {
            const lwcElm = createElement('lwc-already-reserved-this-tag-name', { is: LwcReserved });
            document.body.appendChild(lwcElm);

            const expectedMessage =
                'Error: [LWC error]: VM for tag name "lwc-already-reserved-this-tag-name" is undefined. ' +
                'This indicates that an element was created with this tag name, which is already reserved ' +
                'by an LWC component. Use lwc.createElement instead to create elements.';

            let elm;
            expect(() => {
                elm = document.createElement('lwc-already-reserved-this-tag-name');
            }).toLogErrorDev(expectedMessage);

            // Confirm that connectedCallback/disconnectedCallback don't throw
            document.body.appendChild(elm);
            document.body.removeChild(elm);
        });
    });
}
