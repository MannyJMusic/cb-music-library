import { LightningElement,track,api } from 'lwc';
import axios from "axios";
import fetchWPData from "./fetchWPData";

export default class App extends LightningElement {
    @track data = [];
    @track fullList = [];
    @track trackCount;
    trackcats = [];
    insts = [];
    temps = [];
    @track filtersActive;
    @track catTerms;
    @track instTerms;
    @track tempTerms;
    @track showSpinner = true;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
             await fetchWPData()
            .then (axios.spread((...responses)=> {
                const trackList = responses[0].data;
                this.fullList = responses[0].data;


                for(let track of trackList){
                    var splitContent = track.content.split('[/audio]');
                    if(splitContent[1] != null){
                        track.content = splitContent[1];
                        track.musicfile = splitContent[0].match(/(?:"[^"]*"|^[^"]*$)/)[0]
                            .replace(/"/g, "");

                    }

                      track.trackcat = track.trackcat.join(', ');
                      track.instrument = track.instrument.join(', ');
                      track.tempo = track.tempo.join(', ');


                 }


                this.data = trackList;

                this.trackCount = trackList.length;
                this.showSpinner = false;

        }))
        //this.data = data;
    }
    playTrack(event){
        this.template.querySelector('my-musicplayer').play();
     //   console.log(event.detail);
    }
    async handleSearch(event){
        this.showSpinner = true;
        await fetchWPData(event.detail)
            .then (axios.spread((...responses)=> {
                const trackList = responses[0].data;



                for(let track of trackList){
                    var splitContent = track.content.split('[/audio]');
                    if(splitContent[1] != null){
                        track.content = splitContent[1];
                        track.musicfile = splitContent[0].match(/(?:"[^"]*"|^[^"]*$)/)[0]
                            .replace(/"/g, "");

                    }

                    track.trackcat = track.trackcat.join(', ');
                    track.instrument = track.instrument.join(', ');
                    track.tempo = track.tempo.join(', ');


                }


                this.data = trackList;
                this.trackCount = trackList.length;
                this.showSpinner = false;

            }))
        //this.data = data;
    }
    filterCats(event) {


        switch(event.target.header) {
            case 'Category':
                this.catTerms = event.detail;
                break;
            case 'Instrument':
                this.instTerms = event.detail;
                break;
            case 'Tempo':
                this.tempTerms = event.detail;
                break;
        }

        var urlParams = '';
        if (!this.catTerms == ''){
            urlParams += 'cats='+this.catTerms;
        }
        if (!this.instTerms == ''){
            urlParams += '&insts='+this.instTerms;
        }
        if (!this.tempTerms == ''){
            urlParams += '&temps='+this.tempTerms;
        }
       if (!urlParams == ''){
           this.showSpinner = true;
           axios.get('https://creativebox.studio/wp-json/cb/v1/filter?'+urlParams)
               .then((res)=>{
                      var trackList = [];
                      res.data.posts.forEach(
                          (post) => {
                            this.fullList.forEach(
                                (track) => {
                                    if (track.title == post.post_title){
                                        trackList.push(track);
                                    }
                                }
                              )

                          }
                      )

                   this.data = trackList;
                   this.trackCount = trackList.length;
                   this.showSpinner = false;
               })
       }
       else{
           this.data = this.fullList;
           this.trackCount = this.fullList.length;
           this.showSpinner = false;
       }




    }

}
