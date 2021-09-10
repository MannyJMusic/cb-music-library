import axios from 'axios';


const recordMetadata = {
    name: 'name',
    email: 'email',
    website: 'url',
    amount: 'currency',
    phone: 'phoneNumber',
    closeAt: 'dateInFuture',
};

export default function fetchWPData({ amountOfRecords }) {



    return axios.get('http://13.56.149.186/wp-json/cb/v1/music_assets')
        .then ((res) => res.data);
}
