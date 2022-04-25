import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  withCredentials: true,
  // exposedHeaders: ["set-cookie"],
  // baseURL: 'http://45.56.118.207'
});

//const promise = instance.get("http://127.0.0.1:5000")

export default instance;
