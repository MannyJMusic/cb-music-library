/* eslint-disable vars-on-top */
/* eslint-disable no-console */
import { LightningElement, wire,track,api } from 'lwc';
import fetchWPData from "./fetchWPData";
import axios from "axios";


export default class Termfilter extends LightningElement {
    @api terms;
    @api header;
    @api taxonomy;
    @track options=[];
    @track error;
    @track dropdown = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track dataList;
    @track dropdownList = 'slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta';
    @track selectedValue = 'Select Filter';
    @track selectedListOfValues='';

    async connectedCallback() {

        const data = await fetchWPData(this.taxonomy)
            .then(response =>{
                if (this.taxonomy == 'tempo'){
                    this.options =
                        [
                            {label:"Slowest",value:"Slowest"},
                            {label:"Slow",value:"Slow"},
                            {label:"Medium",value:"Medium"},
                            {label: "Fast",value: "Fast"},
                            {label: "Very Fast",value: "Very Fast"}
                        ]
                }
                else {
                    for (let term of response.data){
                        var newTerm = {};
                        newTerm.label = term.name;
                        newTerm.value = term.name;
                        this.options.push(newTerm);
                    }
                }

             //    this.dataList = response.data;

            });

        //this.data = data;
    }
    openDropdown(){
        this.dropdown =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
    }
    closeDropDown(){
        this.dropdown =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    }
    selectOption(event){

        var isCheck = event.currentTarget.dataset.id;
        var label = event.currentTarget.dataset.name;
        var selectedListData=[];
        var selectedOption='';
        var allOptions = this.options;
        var count=0;
        for(let i=0;i<allOptions.length;i++){
            if(allOptions[i].label===label)
            {
                if(isCheck==='true')
                {
                    allOptions[i].isChecked = false;
                    allOptions[i].class = this.dropdownList;
                }
                else
                {
                    allOptions[i].isChecked = true;
                    allOptions[i].class = 'slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center slds-is-selected';
                }
            }
            if(allOptions[i].isChecked)
            {
                selectedListData.push(allOptions[i].label);
                count++;
            }
        }
        if(count === 1){
            selectedOption = count+' Filter Selected';
        }
        else if(count>1){
            selectedOption = count+' Filters Selected';
        }

        this.options = allOptions;
        this.selectedValue = selectedOption;
        this.selectedListOfValues = selectedListData;

        const searchEvent = new CustomEvent('selected',{detail: selectedListData});
        this.dispatchEvent(searchEvent);

    }

    removeRecord(event){
        var value = event.detail.name;
        var removedOptions = this.options;
        var count = 0;
        var selectedListData=[];
        for(let i=0; i < removedOptions.length; i++){
            if(removedOptions[i].label === value){
                removedOptions[i].isChecked = false;
                removedOptions[i].class = this.dropdownList;
            }
            if(removedOptions[i].isChecked){
                selectedListData.push(removedOptions[i].label);
                count++;
            }
        }
        var selectedOption;
        if(count === 1){
            selectedOption = count+' Category Selected';
        }
        else if(count>1){
            selectedOption = count+' Categories Selected';
        }
        else if(count === 0){
            selectedOption = 'Select Category';
            selectedListData = "";
        }
        this.selectedListOfValues = selectedListData;
        this.selectedValue = selectedOption;
        this.options = removedOptions;
        const searchEvent = new CustomEvent('selected',{detail: selectedListData});
        this.dispatchEvent(searchEvent);

    }



}