import { LightningElement } from 'lwc';
import stylesV1 from './staleProp.css';
import stylesV2 from './stylesV2.css';

export default class extends LightningElement {
    static stylesV1 = stylesV1;
    static stylesV2 = stylesV2;
}
