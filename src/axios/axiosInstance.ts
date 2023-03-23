import axios from "axios";
import GlobalFunctions from "../services/globalFuntions";
const { REACT_APP_BASE_URL } = process.env;

const API = axios.create({
    baseURL: REACT_APP_BASE_URL,
});

//Request interceptor
API.interceptors.request.use(function (config) {
    const token = GlobalFunctions.getCookie("token");

    if (token !== null) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

export { API };
