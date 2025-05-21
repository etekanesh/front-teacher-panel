import axiosInstance from "core/config/axios.config";

export const getWebinarsHeld = async () => {
    const response = await axiosInstance.get(
        `/account/teacher/marketing/webinars/?action=held_webinars`
    );
    return response.data;
};

export const getWebinarsHeldDetails = async (
    webinarId: string,
    webinarDate: string
) => {
    const response = await axiosInstance.get(
        `/account/teacher/marketing/webinars/${webinarId}/?action=get_held_detail&date=${webinarDate}`
    );
    return response.data;
};
