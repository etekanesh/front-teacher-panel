import axiosInstance from "core/config/axios.config";
import { ApiParams } from "core/types";

export const getStudents = async (params?: ApiParams | undefined) => {
    const response = await axiosInstance.get(`/account/teacher/students/`, {
        params,
    });
    return response.data;
};

export const getStudentsSummaryStats = async () => {
    const response = await axiosInstance.get(`/account/teacher/students/?action=summary_stats`);
    return response.data;
};
