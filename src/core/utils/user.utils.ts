import { UsersData, UsersMappingResults, UsersStatistics } from "core/types";

export const UserMapping = (users: UsersData[]): UsersMappingResults => {
  const countries = new Set<string>();

  users.forEach((user) => countries.add(user.location.country));
  return {
    availableCountries: [...countries],
    statistics: [...countries].map((country) => ({
      id: country,
      label: country,
      value: users.filter((i) => i.location.country === country).length,
    })),
  };
};
export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const getPieChartMapping = (statistics: UsersStatistics[]) => {
  const lableList: string[] = [];
  const dataList: number[] = [];
  const colorList: string[] = [];

  statistics.forEach((i) => {
    lableList.push(i.label);
    dataList.push(i.value);
    colorList.push(getRandomColor());
  });

  return {
    labels: lableList,
    datasets: [
      {
        data: dataList,
        backgroundColor: colorList,
        hoverBackgroundColor: colorList,
      },
    ],
  };
};
