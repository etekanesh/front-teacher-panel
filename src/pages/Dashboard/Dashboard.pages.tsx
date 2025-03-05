import React from "react";
import { Box } from "@mui/material";

import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "types";
import theme from "theme";

export const DashboardPage: React.FC = () => {
  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "داشبورد",
      link: "/dashboard",
      id: "0",
      color: theme.palette.grey[600],
      active: true,
    },
  ];

  return (
    <>
      <HeaderLayout title="داشبورد" breadcrumb={breadcrumbData} />
      <Box
        display={"flex"}
        gap={2}
        alignItems={"flex-start"}
        sx={{ flexDirection: { xs: "column-reverse", md: "row", lg: "row" } }}
      ></Box>
    </>
  );
};
