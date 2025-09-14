import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://streamchat-backend-6ltp.onrender.com/api",
    withCredentials: true
});

