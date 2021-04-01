import axios from "axios";


const instance = axios.create({
    //THE API ( cloud function ) URL
    baseURL: 'https://us-central1-clone-4283f.cloudfunctions.net/api'


   //Local link  'http://localhost:5001/clone-4283f/us-central1/api'


});

export default instance;