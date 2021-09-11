import axios from 'axios';
let Api = axios.create({
    baseURL : "https://canaapi.maryrose.com.ng/public/api",
});
Api.defaults.withCredentials = true;
export default Api;