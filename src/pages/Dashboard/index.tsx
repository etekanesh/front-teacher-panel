import React from "react";
import { Box } from "@mui/material";

import { CustomButton } from "uiKit";

export const DashboardPage: React.FC = () => {
  return (
    <Box display={"flex"} gap={2} alignItems={"flex-start"} sx={{ flexDirection: { xs: "column-reverse", md: "row", lg: "row" } }}>
      <CustomButton>
        ssdasd
      </CustomButton>
    </Box>
  );
};
