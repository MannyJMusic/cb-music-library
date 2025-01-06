import axios from 'axios';

let one = "https://creativeboxstudio.com/wp-json/cb/v1/music_assets"







export default function fetchWPData(searchKey) {

    if(searchKey != null){
       var tracks = axios.get(one+'?search='+searchKey);
    }
    else {
        var tracks = axios.get(one);

        }



    return axios.all([tracks]);
}


