import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import { CustomButton } from "uiKit";

export const DashboardPage: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (

    <Box
      display={"flex"}
      gap={2}
      alignItems={"flex-start"}
      sx={{ flexDirection: { xs: "column-reverse", md: "row", lg: "row" } }}
    >
      <CustomButton>ssdasd</CustomButton>
    </Box>

  );
};
