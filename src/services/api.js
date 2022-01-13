import axios from 'axios';
let Api = axios.create({
    baseURL : "https://api.canasportsng.com/api/public",
});
Api.defaults.withCredentials = true;
export default Api;