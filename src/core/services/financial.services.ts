import axiosInstance from "core/config/axios.config";
import { ApiParams } from "core/types";

export const getFinancialOverview = async () => {
    const response = await axiosInstance.get(`/account/teacher/financial/audit-detail/?action=overview_stat`)
    return response.data;
};

export const getFinancialIncomeList = async (params: ApiParams | undefined) => {
    const response = await axiosInstance.get(`/account/teacher/financial/audit-detail/?page=1`, {
        params
    })
    return response.data;
};

export const getFinancialStudentIncomeList = async (params: ApiParams | undefined) => {
    const response = await axiosInstance.get(`/account/teacher/financial/student-income/?page=1`, {
        params
    })
    return response.data;
};

export const getSummaryDollarStatus = async () => {
    const response = await axiosInstance.get(
        "account/teacher/financial/student-income/?action=summary_stat"
    );
    return response.data;
};

export const getMonthlyDollarStatus = async (year: number, month: number) => {
    const response = await axiosInstance.get(
        `account/teacher/financial/student-income/?action=monthly_stat&year=${year}&month=${month}`
    );
    return response.data;
};
