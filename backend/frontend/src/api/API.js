import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:5000'
    baseURL: 'http://127.0.0.1:4999'
});


export default instance;

