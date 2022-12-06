import { createElement, __unstable__ReportingControl as reportingControl } from 'lwc';
import AriaContainer from 'x/ariaContainer';

// Should be kept in sync with the enum ReportId in reporting.ts
const ReportId = {
    CrossRootAriaInSyntheticShadow: 0,
};

// These tests are designed to detect non-standard cross-root ARIA usage in synthetic shadow DOM
if (!process.env.NATIVE_SHADOW) {
    describe('synthetic shadow cross-root ARIA', () => {
        let dispatcher;
        let elm;
        let sourceElm;
        let targetElm;

        beforeEach(() => {
            dispatcher = jasmine.createSpy();
            reportingControl.attachDispatcher(dispatcher);

            elm = createElement('x-aria-container', { is: AriaContainer });
            document.body.appendChild(elm);
            sourceElm = elm.shadowRoot.querySelector('x-aria-source');
            targetElm = elm.shadowRoot.querySelector('x-aria-target');
        });

        afterEach(() => {
            reportingControl.detachDispatcher();
        });

        [false, true].forEach((usePropertyAccess) => {
            describe(usePropertyAccess ? 'property' : 'attribute', () => {
                beforeEach(() => {
                    elm.usePropertyAccess = usePropertyAccess;
                    return Promise.resolve();
                });

                it('can detect setting aria-labelledby', () => {
                    expect(() => {
                        elm.linkUsingAriaLabelledBy();
                    }).toLogErrorDev(
                        /<x-aria-source>: Element <input> uses attribute "aria-labelledby" to reference element <label>, which is not in the same shadow root\. This will break in native shadow DOM\./
                    );
                    expect(dispatcher).toHaveBeenCalledWith(
                        ReportId.CrossRootAriaInSyntheticShadow,
                        'x-aria-source',
                        jasmine.any(Number)
                    );
                });

                it('can detect setting id', () => {
                    expect(() => {
                        elm.linkUsingId();
                    }).toLogErrorDev(
                        /<x-aria-source>: Element <input> uses attribute "aria-labelledby" to reference element <label>, which is not in the same shadow root\. This will break in native shadow DOM\./
                    );
                    expect(dispatcher).toHaveBeenCalledWith(
                        ReportId.CrossRootAriaInSyntheticShadow,
                        'x-aria-source',
                        jasmine.any(Number)
                    );
                });

                it('reports only once when setting both id and aria-labelledby', () => {
                    expect(() => {
                        elm.linkUsingBothAriaLabelledByAndId();
                    }).toLogErrorDev(
                        /<x-aria-source>: Element <input> uses attribute "aria-labelledby" to reference element <label>, which is not in the same shadow root\. This will break in native shadow DOM\./
                    );
                    expect(dispatcher).toHaveBeenCalledWith(
                        ReportId.CrossRootAriaInSyntheticShadow,
                        'x-aria-source',
                        jasmine.any(Number)
                    );
                });

                it('detects linking to an element in global light DOM', () => {
                    const label = document.createElement('label');
                    label.id = 'foo';
                    document.body.appendChild(label);
                    expect(() => {
                        sourceElm.setAriaLabelledBy('foo');
                    }).toLogErrorDev(
                        /<x-aria-source>: Element <input> uses attribute "aria-labelledby" to reference element <label>, which is not in the same shadow root\. This will break in native shadow DOM\./
                    );
                    expect(dispatcher).toHaveBeenCalledWith(
                        ReportId.CrossRootAriaInSyntheticShadow,
                        'x-aria-source',
                        jasmine.any(Number)
                    );
                });

                it('detects linking from an element in global light DOM', () => {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.setAttribute('aria-labelledby', 'foo');
                    document.body.appendChild(input);
                    expect(() => {
                        targetElm.setId('foo');
                    }).toLogErrorDev(
                        /<x-aria-target>: Element <input> uses attribute "aria-labelledby" to reference element <label>, which is not in the same shadow root\. This will break in native shadow DOM\./
                    );
                    expect(dispatcher).toHaveBeenCalledWith(
                        ReportId.CrossRootAriaInSyntheticShadow,
                        'x-aria-target',
                        jasmine.any(Number)
                    );
                });
            });
        });
    });
}
