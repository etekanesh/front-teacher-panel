import React from "react";
import { Box } from "@mui/material";

import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "core/types";
import theme from "theme";

export const CoursesPage: React.FC = () => {
  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "دوره",
      link: "/courses",
      id: "0",
      color: theme.palette.grey[600],
      active: true,
    },
  ];

  return (
    <>
      <HeaderLayout title="دوره ها" breadcrumb={breadcrumbData} />
      <Box
        display={"flex"}
        gap={2}
        alignItems={"flex-start"}
        sx={{ flexDirection: { xs: "column-reverse", md: "row", lg: "row" } }}
        height={"90vh"}
      ></Box>
    </>
  );
};
