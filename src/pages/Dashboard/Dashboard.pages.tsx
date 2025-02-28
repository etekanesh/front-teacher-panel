import React from "react";
import { Box } from "@mui/material";

export const DashboardPage: React.FC = () => {
  return (
    <Box
      display={"flex"}
      gap={2}
      alignItems={"flex-start"}
      sx={{ flexDirection: { xs: "column-reverse", md: "row", lg: "row" } }}
    >
      Dashboard
    </Box>
  );
};
