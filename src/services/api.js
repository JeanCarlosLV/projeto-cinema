import axios from "axios";
//Base da URL https://api.themoviedb.org/3/

//URL movie/550?api_key=4511172906e4f70a0dd6f160bd4697e2

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;