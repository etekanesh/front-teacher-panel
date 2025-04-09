import axiosInstance from "core/config/axios.config";

export const getUsers = async () => {
    const response = await axiosInstance.get("/account/detail/",{withCredentials:true});
    return response.data.results;
};