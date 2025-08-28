import { config } from "@/config";
import axios, { type AxiosRequestConfig } from "axios";



const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials:true
})


axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
},

);


let isRefreshing = false;

let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];


const processQueue = (error: unknown) => {
    pendingQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(null);
        }
    })
    pendingQueue = [];
}




// Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
},
    async (error) => {

        const originalRequest = error.config as AxiosRequestConfig & {
            _retry: boolean
        }

        if (error.response.status === 500 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry) {
            console.log("Your token is expired");
            originalRequest._retry = true;
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject })
                })
            }
        }
        isRefreshing = true;

        try {
            const res = await axiosInstance.post("auth/refresh-token")
            console.log("New Token arrived", res);
            processQueue(null);
            return axiosInstance(originalRequest);
        } catch (error) {
            processQueue(error);
            return Promise.reject(error);
        } finally {
            isRefreshing = false
        }

        return Promise.reject(error);
    }


);
