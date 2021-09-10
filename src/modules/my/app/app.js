import { LightningElement } from 'lwc';
import fetchWPData from "./fetchWPData";

export default class App extends LightningElement {
    data = [];


    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchWPData({ amountOfRecords: 100 });
        this.data = data;
        console.log(this.data);
    }

}
