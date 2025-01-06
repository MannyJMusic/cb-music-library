import { LightningElement,api,track } from 'lwc';

export default class TileList extends LightningElement {
    @api tracks;
    @track playState = false;
    @track toggleIconName = 'utility:play';
    handlePlayRow(event){
        this.playState = !this.playState;
        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent('selected', { detail: event.target.value });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);

    }


}
