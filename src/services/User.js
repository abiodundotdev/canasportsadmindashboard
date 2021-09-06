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
        await this.getCookie();
        return Api.post(url,formData);
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
        return Api.get("/user");
    },
    getUserData(url){
        return Api.get(url);
    },
    getServerData(url){
        return Api.get(url);
    },
    deleteDatafromServerUsingId(url){
        return Api.get(url);
    }
};