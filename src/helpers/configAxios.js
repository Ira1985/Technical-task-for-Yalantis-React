import * as axios from "axios";

export const API = axios.create({
    //baseURL: 'http://localhost:8083/content',
    baseURL: 'https://yalantis-react-school-api.yalantis.com/api',
    timeout: 1000000
});