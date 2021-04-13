import axios from 'axios';

let BaseApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

let token = localStorage.getItem("jwt");
if(token){
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default BaseApi;
