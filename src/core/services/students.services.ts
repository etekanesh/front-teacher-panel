import axiosInstance from "core/config/axios.config";
import { ApiParams, StudentsFilterParams, StudentsApiResponse } from "core/types";

export const getStudents = async (params?: StudentsFilterParams | undefined): Promise<StudentsApiResponse> => {
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

export const postStudentsLevel = async (studentId: string | undefined, data: string , action: string) => {
    const response = await axiosInstance.post(`/account/teacher/students/levels/${studentId}/`, { data, action });
    return response.data;
};
