import axios from "axios";
import Cookies from "js-cookie"; 

/**
 * Create axios instance
 */
export const apiClient = axios.create({
    baseURL: "/api"
})

apiClient.interceptors.request.use(
    (config) => {
        const userToken = Cookies.get("userToken");
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)