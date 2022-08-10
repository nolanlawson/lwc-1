# @lwc/scoped-registry

A tool for allowing [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to share the same tag name without conflicts. In a sense, it can be thought of as a polyfill for [Scoped Custom Element Registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md).

## Installation

```sh
npm install @lwc/scoped-registry
```

## Usage

Import the library:

```js
import { createScopedRegistry } from '@lwc/scoped-registry';
```

Create a scoped registry:

```js
const defineScopedElement = createScopedRegistry();
```

Now you can define two custom elements with the same tag name:

```js
const elm1 = defineScopedElement(
    'x-foo',
    class extends HTMLElement {
        connectedCallback() {
            console.log('I am x-foo!');
        }
    }
);

const elm2 = defineScopedElement(
    'x-foo',
    class extends HTMLElement {
        connectedCallback() {
            console.log('I am also x-foo!');
        }
    }
);

document.body.appendChild(elm1);
document.body.appendChild(elm2);
```

## How it works

The core concept behind this library is ["pivots"](https://github.com/caridy/redefine-custom-elements), based on [an implementation in Polymer's web components polyfills](https://github.com/webcomponents/polyfills/blob/ee1db33d70400c89f0c7255f78d889c9b8eb88a7/packages/scoped-custom-element-registry/src/scoped-custom-element-registry.js). Essentially the idea is twofold:

1. Have a mechanism to register a class extending `HTMLElement` that can dynamically change its behavior on-demand.
2. Patch all relevant globals (`customElements.define`, `customElements.get`, `HTMLElement`) so that, to the outside observer, native custom element registry behavior is still respected.

So for example, custom elements defined _outside_ of the scoped registry will still conflict:

```js
customElements.define('x-bar', class extends HTMLElement {});
customElements.define('x-bar', class extends HTMLElement {}); // Error
```

... but elements defined within the scoped registry can conflict with those outside of it:

```js
defineScopedElement('x-bar', class extends HTMLElement {});
customElements.define('x-bar', class extends HTMLElement {}); // This is fine
```

## Drawbacks

### Partial leakage of private components

In a sense, components created inside of the scoped registry are "invisible" to the outside observer. The abstraction does leak in some places – for instance, calling `document.createElement('x-foo')` when `x-foo` is registered by the scoped registry will necessarily create a custom element:

```js
defineScopedElement('x-baz', class extends HTMLElement {});

const elm = document.createElement('x-baz');
console.log(elm.constructor); // class extends HTMLElement
```

However, such an element is not completely upgraded (i.e. the scoped `constructor`/`connectedCallback`/`disconnectedCallback`/etc will not apply), so it is effectively inert from the outside observer's perspective. In this way, elements defined inside of the scoped registry are still private to a degree.

### Global patches

In order to preserve native custom element semantics to the outside world, many globals (e.g. `customElements.define`, `customElements.get`, `HTMLElement`) need to be patched. This introduces the potential for conflicts with native browser behavior, and in some cases the native browser behavior cannot be perfectly emulated.

One example is `observedAttributes` and `attributeChangedCallback`. Because a component only has one chance to communicate its `observedAttributes` to the browser (at `customElements.define()`), a second scoped element with its own `observedAttributes` cannot truly register those attributes to be observed. However, we can emulate the native browser behavior by overriding `setAttribute` and `removeAttribute` on the second element. It's not a perfect emulation, but it works in most cases.

### Not a "true" polyfill

The goal of this library is not to implement the [Scoped Custom Element Registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md) spec one-to-one. Instead, it tries to provide the minimum API surface necessary to support custom elements that share the same global tag name.
