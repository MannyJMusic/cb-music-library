import { LightningElement,api } from 'lwc';

export default class Termslist extends LightningElement{
    @api terms;
    @api header;
    @api taxonomy;
    _selected = [];
    value = 'inProgress';

    get options() {
        var termList = [];
        for(let term of this.terms ){
            var option = {'label':term.name, 'value':term.name}
            termList.push(option);
        }
        return termList;
    }
    get selected() {
        return this._selected.length ? this._selected : 'none';
    }

    handleChange(event) {
        this.value = event.detail.value;
        this._selected.push(this.value);
    }
}