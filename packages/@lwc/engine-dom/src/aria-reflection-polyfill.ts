import features from '@lwc/features';
import { applyAriaReflectionPolyfill } from '@lwc/aria-reflection-polyfill';

if (!features.DISABLE_ARIA_REFLECTION_POLYFILL) {
    applyAriaReflectionPolyfill();
}
