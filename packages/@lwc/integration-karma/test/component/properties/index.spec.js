import { createElement } from 'lwc';
import { ariaProperties } from 'test-utils';

import Component from 'x/component';

// This list can grow as we add more properties to the base LightningElement
const expectedEnumerableProps =
    process.env.NODE_ENV === 'production'
        ? [
              'accessKey',
              'addEventListener',
              'ariaActiveDescendant',
              'ariaAtomic',
              'ariaAutoComplete',
              'ariaBusy',
              'ariaChecked',
              'ariaColCount',
              'ariaColIndex',
              'ariaColSpan',
              'ariaControls',
              'ariaCurrent',
              'ariaDescribedBy',
              'ariaDetails',
              'ariaDisabled',
              'ariaErrorMessage',
              'ariaExpanded',
              'ariaFlowTo',
              'ariaHasPopup',
              'ariaHidden',
              'ariaInvalid',
              'ariaKeyShortcuts',
              'ariaLabel',
              'ariaLabelledBy',
              'ariaLevel',
              'ariaLive',
              'ariaModal',
              'ariaMultiLine',
              'ariaMultiSelectable',
              'ariaOrientation',
              'ariaOwns',
              'ariaPlaceholder',
              'ariaPosInSet',
              'ariaPressed',
              'ariaReadOnly',
              'ariaRelevant',
              'ariaRequired',
              'ariaRoleDescription',
              'ariaRowCount',
              'ariaRowIndex',
              'ariaRowSpan',
              'ariaSelected',
              'ariaSetSize',
              'ariaSort',
              'ariaValueMax',
              'ariaValueMin',
              'ariaValueNow',
              'ariaValueText',
              'childNodes',
              'children',
              'classList',
              'dir',
              'dispatchEvent',
              'draggable',
              'firstChild',
              'firstElementChild',
              'getAttribute',
              'getAttributeNS',
              'getBoundingClientRect',
              'getElementsByClassName',
              'getElementsByTagName',
              'hasAttribute',
              'hasAttributeNS',
              'hidden',
              'id',
              'isConnected',
              'lang',
              'lastChild',
              'lastElementChild',
              'querySelector',
              'querySelectorAll',
              'refs',
              'removeAttribute',
              'removeAttributeNS',
              'removeEventListener',
              'render',
              'role',
              'setAttribute',
              'setAttributeNS',
              'shadowRoot',
              'spellcheck',
              'tabIndex',
              'template',
              'title',
              'toString',
          ]
        : [
              'accessKey',
              'accessKeyLabel',
              'addEventListener',
              'childNodes',
              'children',
              'classList',
              'className',
              'contentEditable',
              'dataset',
              'dir',
              'dispatchEvent',
              'draggable',
              'dropzone',
              'firstChild',
              'firstElementChild',
              'getAttribute',
              'getAttributeNS',
              'getBoundingClientRect',
              'getElementsByClassName',
              'getElementsByTagName',
              'hasAttribute',
              'hasAttributeNS',
              'hidden',
              'id',
              'inputMode',
              'isConnected',
              'isContentEditable',
              'lang',
              'lastChild',
              'lastElementChild',
              'offsetHeight',
              'offsetLeft',
              'offsetParent',
              'offsetTop',
              'offsetWidth',
              'querySelector',
              'querySelectorAll',
              'refs',
              'removeAttribute',
              'removeAttributeNS',
              'removeEventListener',
              'render',
              'setAttribute',
              'setAttributeNS',
              'shadowRoot',
              'slot',
              'spellcheck',
              'style',
              'tabIndex',
              'template',
              'title',
              'toString',
              'translate',
              ...ariaProperties,
          ];

const expectedEnumerableAndWritableProps = [
    'addEventListener',
    'dispatchEvent',
    'getAttribute',
    'getAttributeNS',
    'getBoundingClientRect',
    'getElementsByClassName',
    'getElementsByTagName',
    'hasAttribute',
    'hasAttributeNS',
    'querySelector',
    'querySelectorAll',
    'removeAttribute',
    'removeAttributeNS',
    'removeEventListener',
    'render',
    'setAttribute',
    'setAttributeNS',
    'toString',
];

describe('properties', () => {
    // IE11 and old Safari are buggy, return 'constructor' along with the other properties
    if (!process.env.COMPAT) {
        let elm;

        beforeEach(() => {
            elm = createElement('x-component', { is: Component });
            document.body.appendChild(elm);
        });

        it('has expected enumerable properties', () => {
            const props = elm.getEnumerableProps();
            expect(props).toEqual(expectedEnumerableProps);
        });

        it('has expected writable properties', () => {
            const props = elm.getEnumerableAndWritableProps();
            expect(props).toEqual(expectedEnumerableAndWritableProps);
        });

        it('has expected configurable properties', () => {
            const props = elm.getEnumerableAndConfigurableProps();
            expect(props).toEqual([]);
        });
    }
});
