import { LightningElement, api } from "lwc";

export default class extends LightningElement {
  @api array
  @api object
  @api deep

  result

  connectedCallback() {

    let result = []
    
    try {
      this.array.push('bar')
    } catch (err) {
      result.push('array: error hit during mutation')
    }

    try {
      this.object.foo = 'baz'
    } catch (err) {
      result.push('object: error hit during mutation')
    }
    
    try {
      this.deep.foo[0].quux = 'quux'
      result += '${name}: No error'
    } catch (err) {
      result.push('deep: error hit during mutation')
    }

    this.result = '\n' + result.join('\n')
  }
}
