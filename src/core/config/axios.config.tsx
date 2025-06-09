import axios from "axios";

const getBaseURL = () => {
    const isLocalhost = window.location.hostname === "localhost";

    if (isLocalhost) {
        return import.meta.env.VITE_API_BASE_URL;
    }

    return `${window.location.origin}/api`;
};

const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;

        if (response) {
            if (response.status === 401) {
                window.location.href = "/account/auth/";
            } else if (response.status === 403) {
                window.location.href = "/access-denied";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
