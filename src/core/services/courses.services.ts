import axiosInstance from "core/config/axios.config";
import { ApiParams } from "core/types";

export const getCoursesList = async (params?: ApiParams | undefined) => {
    const response = await axiosInstance.get("account/teacher/courses/", {
        params
    });
    return response.data;
};

export const getCoursesById = async (id: string) => {
    const response = await axiosInstance.get(`account/teacher/courses/${id}/`);
    return response.data;
};

export const getCoursesMeetings = async () => {
    const response = await axiosInstance.get(
        "account/teacher/courses/meetings/"
    );
    return response.data;
};

export const getCoursesFeedback = async () => {
    const response = await axiosInstance.get(
        "account/teacher/courses/summary/?action=feedback_summary"
    );
    return response.data;
};

export const getCoursesLevelsAcademy = async () => {
    const response = await axiosInstance.get(
        "account/teacher/courses/summary/?action=academy"
    );
    return response.data;
};


export const postEditEpisodeCourse = async (
    levelId: string,
    data: { priority: string; episode: string }
) => {
    const formData = new FormData();
    formData.append("priority", data.priority);
    formData.append("episode", data.episode);

    const response = await axiosInstance.post(
        `account/teacher/courses/${levelId}/?action=edit_episode`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};

export const postNewHeadlineCourse = async (
    levelId: string,
    data: { level: number; display_name: string }
) => {
    const response = await axiosInstance.post(
        `account/teacher/courses/${levelId}/?action=add_headline`,
        {
            level: data.level,
            display_name: data.display_name,
        }
    );
    return response.data;
};

export const postNewEpisodeCourse = async (
    levelId: string,
    data: {
        file: File;
        headline: string;
        title: string;
        priority: number;
        description: string;
    }
) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("headline", data.headline);
    formData.append("title", data.title);
    formData.append("priority", data.priority.toString());
    formData.append("description", data.description);

    const response = await axiosInstance.post(
        `account/teacher/courses/${levelId}/?action=add_episode`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
