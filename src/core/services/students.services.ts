import axiosInstance from "core/config/axios.config";
import { ApiParams } from "core/types";

export const getStudents = async (params?: ApiParams | undefined) => {
    const response = await axiosInstance.get(`/account/teacher/students/`, {
        params,
    });
    return response.data;
};

export const getStudentsById = async (id: string, params?: ApiParams | undefined) => {
    const response = await axiosInstance.get(`/account/teacher/students/${id}/`, {
        params,
    });
    return response.data;
};

export const getStudentsSummaryStats = async () => {
    const response = await axiosInstance.get(`/account/teacher/students/?action=summary_stats`);
    return response.data;
};

export const getStudentsLevel = async (studentId: string | undefined) => {
    const response = await axiosInstance.get(`/account/teacher/students/levels/${studentId}/`);
    return response.data;
};

export const postStudentsLevel = async (studentId: string | undefined, data: string | string[], action: string) => {
    const response = await axiosInstance.post(`/account/teacher/students/levels/${studentId}/`, { data: (Array.isArray(data) ? data : [data]).map(text => ({ text })), action });
    return response.data;
};
