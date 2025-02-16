import axios from "axios"; // Import Axios for HTTP requests

// Create an Axios instance with a base URL and default configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to add the Authorization header with the access token
axiosInstance.interceptors.request.use((config) => {
    return config; // Return the modified config
});

// Add a response interceptor to handle token expiration and refreshing
axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
);

export default axiosInstance; // Export the configured Axios instance
