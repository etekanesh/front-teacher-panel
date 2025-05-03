import axiosInstance from "core/config/axios.config";
import { UsersDataTypes } from "core/types";

export const getUser = async () => {
    const response = await axiosInstance.get("/account/detail/");
    return response.data;
};

export const postUser = async (data: Partial<UsersDataTypes>) => {
    const response = await axiosInstance.patch("/account/detail/", data);
    return response.data;
};

export const postLogin = async (data: any) => {
    const response = await axiosInstance.post("/account/login/", data);
    return response;
};

export const postOtp = async (data: any) => {
    const response = await axiosInstance.post("/account/otp/send/", data);
    return response;
};