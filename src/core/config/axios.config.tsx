import axios from "axios"; // Import Axios for HTTP requests

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

// Add a request interceptor to add the Authorization header with the access token
axiosInstance.interceptors.request.use((config) => {
    return config; // Return the modified config
});

// Add a response interceptor to handle token expiration and refreshing
axiosInstance.interceptors.response.use(
    (response) => response // Pass through successful responses
);

export default axiosInstance; // Export the configured Axios instance
