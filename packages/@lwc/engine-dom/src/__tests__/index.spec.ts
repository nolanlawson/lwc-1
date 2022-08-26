import { createScopedRegistry } from '../patches/global-registry';

describe('engine-dom jest tests', () => {
    it('can use the scoped registry', () => {
        const defineScopedElement = createScopedRegistry();

        const Ctor = defineScopedElement('x-foo', class extends HTMLElement {});

        const UserCtor = class extends HTMLElement {
            constructor() {
                super();
                this.innerHTML = '<h1>One</h1>';
            }
        };

        const elm = new Ctor(UserCtor);

        document.body.appendChild(elm);

        expect(elm.querySelector('h1')!.textContent).toEqual('One');
    });

    it('can load multiple copies of the pivot registry at same time', async () => {
        const defineScopedElement1 = createScopedRegistry();
        const defineScopedElement2 = createScopedRegistry();

        const Ctor1 = defineScopedElement1('x-foo', class extends HTMLElement {});

        const Ctor2 = defineScopedElement2(
            'x-foo',
            class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = '<h1>Two</h1>';
                }
            }
        );

        const elm1 = new Ctor1(
            class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = '<h1>One</h1>';
                }
            }
        );
        const elm2 = new Ctor2(
            class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = '<h1>Two</h1>';
                }
            }
        );

        document.body.appendChild(elm1);
        document.body.appendChild(elm2);

        expect(elm1.querySelector('h1')!.textContent).toEqual('One');
        expect(elm2.querySelector('h1')!.textContent).toEqual('Two');
    });

    it('can define an element in one registry, create another registry, and define another element', async () => {
        const defineScopedElement1 = createScopedRegistry();

        const Ctor1 = defineScopedElement1('x-foo', class extends HTMLElement {});
        const elm1 = new Ctor1(
            class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = '<h1>One</h1>';
                }
            }
        );
        document.body.appendChild(elm1);
        expect(elm1.querySelector('h1')!.textContent).toEqual('One');

        const defineScopedElement2 = createScopedRegistry();
        const Ctor2 = defineScopedElement2(
            'x-foo',
            class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = '<h1>Two</h1>';
                }
            }
        );
        const elm2 = new Ctor2(
            class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = '<h1>Two</h1>';
                }
            }
        );
        document.body.appendChild(elm2);
        expect(elm2.querySelector('h1')!.textContent).toEqual('Two');
    });
});
