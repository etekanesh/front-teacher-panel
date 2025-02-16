import axios from "axios";
import { ApiParams } from "core/types";

export const getAllUsers = async (params?: ApiParams) => {
    const response = await axios.get("https://randomuser.me/api/", {params});
    return response.data.results;
};