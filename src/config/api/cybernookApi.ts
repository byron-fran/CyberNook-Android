import axios from "axios";
import { API_URL } from "@env";

export const cybernookApi = axios.create({
    baseURL : API_URL,
    headers : {
        'Content-Type' : 'application/json'
    },
    withCredentials : true
})