import axios from 'axios';

const instance = axios.create({
     baseURL: 'http://127.0.0.1:5000'
    // baseURL: 'http://45.56.118.207'
});


export default instance;

