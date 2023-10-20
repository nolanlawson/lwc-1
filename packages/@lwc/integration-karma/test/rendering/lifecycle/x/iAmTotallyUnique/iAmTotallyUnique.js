import { LightningElement, api } from 'lwc'

export default class extends LightningElement {

  @api id
  @api idFromConnectedCallback

  connectedCallback() {
    this.idFromConnectedCallback = this.id
  }
}
