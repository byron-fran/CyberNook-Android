import axios from "axios";
import { API_URL } from "@env";
import { StorageAdapter } from "../adapters/storgeAdapter";

export const cybernookApi = axios.create({
    baseURL : API_URL,
    headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      
    
    },
    withCredentials : true
});

cybernookApi.interceptors.request.use(
    async config => {
        const token = await StorageAdapter.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    }
)