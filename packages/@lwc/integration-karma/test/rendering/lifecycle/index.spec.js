import { createElement } from 'lwc'
import IAmTotallyUnique from "x/iAmTotallyUnique";

fdescribe('lifecycle', () => {
  it('has a unique connectedCallback for instances of same tag', async () => {
    const elm1 = createElement('x-i-am-totally-unique', { is: IAmTotallyUnique })
    const elm2 = createElement('x-i-am-totally-unique', { is: IAmTotallyUnique })

    elm1.id = 'foo'
    elm2.id = 'bar'

    elm1.setAttribute('data-id', 'foo')
    elm2.setAttribute('data-id', 'bar')

    document.body.appendChild(elm1)
    document.body.appendChild(elm2)

    await Promise.resolve()

    expect(elm1.idFromConnectedCallback).toBe('foo')
    expect(elm2.idFromConnectedCallback).toBe('bar')
  })
})
