import axiosInstance from "core/config/axios.config";

export const getOverviewStatus = async () => {
  const response = await axiosInstance.get(
    "account/teacher/dashboard/?action=overview_stat"
  );
  return response.data;
};

export const getSummaryStatus = async () => {
  const response = await axiosInstance.get(
    "account/teacher/dashboard/?action=summary_stat"
  );
  return response.data;
};

export const getMonthlyStatus = async (year: number, month: number) => {
  const response = await axiosInstance.get(
    `account/teacher/dashboard/?action=monthly_stat&year=${year}&month=${month}`
  );
  return response.data;
};
