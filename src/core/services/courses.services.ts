import axiosInstance from "core/config/axios.config";

export const getCoursesList = async () => {
    const response = await axiosInstance.get(
        "account/teacher/courses/"
    );
    return response.data;
};