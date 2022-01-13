import axios from 'axios';
let Api = axios.create({
    baseURL : "https://api.canasportsng.com/api",
});
Api.defaults.withCredentials = true;
export default Api;