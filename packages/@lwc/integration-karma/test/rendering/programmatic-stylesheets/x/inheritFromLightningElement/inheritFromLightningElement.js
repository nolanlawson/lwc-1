import { LightningElement } from 'lwc';
import stylesheet from './inheritFromLightningElement.css';

export default class extends LightningElement {
    // super.stylesheets is undefined in LightningElement
    static stylesheets = [...(super.stylesheets || []), stylesheet];
}
