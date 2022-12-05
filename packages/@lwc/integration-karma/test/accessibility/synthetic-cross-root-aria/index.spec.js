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

        beforeEach(() => {
            dispatcher = jasmine.createSpy();
            reportingControl.attachDispatcher(dispatcher);
        });

        afterEach(() => {
            reportingControl.detachDispatcher();
        });

        it('can detect setting aria-labelledby', () => {
            const elm = createElement('x-aria-container', { is: AriaContainer });
            document.body.appendChild(elm);
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
            const elm = createElement('x-aria-container', { is: AriaContainer });
            document.body.appendChild(elm);
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
    });
}
