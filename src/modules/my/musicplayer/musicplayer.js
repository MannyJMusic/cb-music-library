import { LightningElement,api } from 'lwc';

export default class Musicplayer extends LightningElement{
    @api audioUrl;
    title;
    artist;


    @api
    get isPlaying() {
        const player = this.template.querySelector('audio');
        return player !== null && player.paused === false;
    }

    @api
    play() {
        this.audioUrl = event.detail.musicfile;
        this.artist = event.detail.content;
        this.title = event.detail.title;
        const player = this.template.querySelector('audio');
        const canvas = this.template.querySelector('canvas');

        player.src = this.audioUrl;
        if (player){
            player.play();


        }



    }

    @api
    pause() {
        const player = this.template.querySelector('audio');
        if (player) {
            // the player might not be in the DOM just yet
            player.pause();
        }
    }

    // private method for computed value
    get videoType() {
        return 'video/' + this.videoUrl.split('.').pop();
    }

}