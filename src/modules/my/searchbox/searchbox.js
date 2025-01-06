import { LightningElement,track } from 'lwc';
import fetchWPData from '../app/fetchWPData'
export default class LightningExampleInputSearch extends LightningElement {
    @track queryTerm;
    @track showSpinner = false;

    handleKeyUp(evt) {
        this.showSpinner = true;
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            const searchEvent = new CustomEvent('search', { detail: evt.target.value });
            this.dispatchEvent(searchEvent);
            this.showSpinner = false;
        }
        this.showSpinner =false;
    }

    clearSearch(evt){
        this.template.querySelector('input').value = null;
        const searchEvent = new CustomEvent('search', { detail: evt.target.value });
        this.dispatchEvent(searchEvent);
        this.showSpinner = false;
    }
}
