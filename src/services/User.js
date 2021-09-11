import Api from './api';
export default {
   async register(form){
       await this.getCookie();
       return Api.post("/register",form);
    },
    getCookie(){
        return Api.get("/csrf-cookie")
    },
    async login(form){
        await this.getCookie();
        return Api.post("/admin-login",form);
    },
    async saveDataToServer(formData,url){
        const token = localStorage?.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }; 
        await this.getCookie();
        return Api.post(url,formData, config);
    },
    async uploadFile(formData,url,config){
        await this.getCookie();
        return Api.post(url,formData,config);
    },
    async logout(){
        await this.getCookie();
        return Api.post("/logout");
    },
    getUser(){
        const token = localStorage?.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }; 
        return Api.get("/user", config);
    },
    getUserData(url){
        return Api.get(url);
    },
    getServerData(url){
        const token = localStorage?.getItem("userToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };        
        return Api.get(url, config);
    },
    deleteDatafromServerUsingId(url){
        return Api.get(url);
    }
};