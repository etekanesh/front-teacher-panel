import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Divider, Skeleton, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

import { useUsersStore } from "store/useUsers.store";
import { getPieChartMapping } from "core/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const StatisticsWidget: React.FC = () => {
  const { userStatistics, fetchedUsersList, fetching } = useUsersStore();

  const data = useMemo(
    () => getPieChartMapping(userStatistics),
    [userStatistics]
  );

  if (fetching)
    return (
      <Box
        padding={"10px"}
        borderRadius={"10px"}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
      >
        <Skeleton variant="circular" width={200} height={200} style={{ margin: '10px auto' }}  />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
      </Box>
    );

  return (
    <Box
      padding={"10px"}
      borderRadius={"10px"}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
    >
      <Typography variant="h6">Statistics</Typography>

      <Divider />

      <Pie data={data} />

      <Box padding="10px 0">
        {userStatistics.map((i) => (
          <Typography fontSize={10}>
            Number of users from the {i.label}: {i.value}
          </Typography>
        ))}

        <Typography>
          Total number of users: {fetchedUsersList.length}
        </Typography>
      </Box>
    </Box>
  );
};
