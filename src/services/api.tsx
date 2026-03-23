import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers:{
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

api.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

export default api;