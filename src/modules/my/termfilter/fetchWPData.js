import axios from 'axios';







export default function fetchWPData(taxonomy) {
     return axios.get('https://creativebox.studio/wp-json/wp/v2/'+taxonomy+'?per_page=99');



}


