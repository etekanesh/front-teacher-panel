import axiosInstance from "core/config/axios.config";

export const getCoursesList = async () => {
    const response = await axiosInstance.get(
        "account/teacher/courses/"
    );
    return response.data;
};

export const getCoursesById = async (id: string) => {
    const response = await axiosInstance.get(
        `account/teacher/courses/${id}/`
    );
    return response.data;
};

export const getCoursesMeetings = async () => {
    const response = await axiosInstance.get(
        "account/teacher/courses/meethings/"
    );
    return response.data;
};