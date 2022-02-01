import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_HOST_ENV,
    // baseURL: `http://localhost:8080/`,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
export default instance