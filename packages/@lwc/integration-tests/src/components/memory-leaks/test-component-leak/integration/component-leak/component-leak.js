import { LightningElement, track } from 'lwc';

export default class extends LightningElement {

  @track children = []

  addChild() {
    this.children.push(Math.random())
  }

  removeChild() {
    this.children.pop()
  }
}
