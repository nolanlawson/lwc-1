import { LightningElement } from 'lwc';
import stylesV1 from './tweedledum.css';
import stylesV2 from './tweedledum2.css';

export default class extends LightningElement {
    static renderMode = 'light';
    static stylesV1 = stylesV1;
    static stylesV2 = stylesV2;
}
