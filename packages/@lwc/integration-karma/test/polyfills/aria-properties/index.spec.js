import { ariaPropertiesMapping, nonStandardAriaProperties } from 'test-utils';

function testAriaProperty(property, attribute) {
    function expectWarningIfNonStandard(callback) {
        // eslint-disable-next-line jest/valid-expect
        let expected = expect(callback);
        if (!nonStandardAriaProperties.includes(property)) {
            expected = expected.not;
        }
        expected.toLogWarningDev(
            `Error: [LWC warn]: Element <div> uses non-standard property "${property}". This will be removed in a future version of LWC. See https://lwc.dev/guide/accessibility#deprecated-aria-reflected-properties`
        );
    }

    describe(property, () => {
        it(`should assign property ${property} to Element prototype`, () => {
            expect(Object.prototype.hasOwnProperty.call(Element.prototype, property)).toBe(true);
        });

        it(`should return null if the value is not set`, () => {
            const el = document.createElement('div');
            expectWarningIfNonStandard(() => {
                expect(el[property]).toBe(null);
            });
        });

        it('should return the right value from the getter', () => {
            const el = document.createElement('div');
            expectWarningIfNonStandard(() => {
                el[property] = 'foo';
            });
            expect(el[property]).toBe('foo');
        });

        it('should reflect the property to the associated attribute', () => {
            const el = document.createElement('div');
            expectWarningIfNonStandard(() => {
                el[property] = 'foo';
            });
            expect(el.getAttribute(attribute)).toBe('foo');
        });

        it('should reflect the attribute to the property', () => {
            const el = document.createElement('div');
            el.setAttribute(attribute, 'foo');
            let value;
            expectWarningIfNonStandard(() => {
                value = el[property];
            });
            expect(value).toBe('foo');
        });

        // Falsy values that are treated as removing the attribute in the native Chromium/WebKit implementations
        [undefined, null].forEach((value) => {
            it(`should remove the attribute if the property is set to ${value}`, () => {
                const el = document.createElement('div');
                el.setAttribute(attribute, 'foo');

                expectWarningIfNonStandard(() => {
                    el[property] = value;
                });
                expect(el.hasAttribute(attribute)).toBe(false);
                expect(el[property]).toBeNull();
            });
        });

        // Falsy values that are _not_ treated as removing the attribute in the native Chromium/WebKit implementations
        [0, false, '', NaN].forEach((value) => {
            it(`should not remove the attribute if the property is set to ${
                value === '' ? 'the empty string' : value
            }`, () => {
                const el = document.createElement('div');
                el.setAttribute(attribute, 'foo');

                expectWarningIfNonStandard(() => {
                    el[property] = value;
                });
                expect(el.hasAttribute(attribute)).toBe(true);
                expect(el.getAttribute(attribute)).toBe('' + value);
                expect(el[property]).toBe('' + value);
            });
        });
    });
}

if (!window.lwcRuntimeFlags.DISABLE_ARIA_REFLECTION_POLYFILL) {
    for (const [ariaProperty, ariaAttribute] of Object.entries(ariaPropertiesMapping)) {
        testAriaProperty(ariaProperty, ariaAttribute);
    }
}
