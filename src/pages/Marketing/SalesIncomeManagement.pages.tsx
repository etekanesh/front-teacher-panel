import React from "react";
import { Box, Paper, Typography } from "@mui/material";

import { HeaderLayout } from "layouts";
import theme from "theme";
import { BreadCrumbsModel } from "core/types";
import { MarketingIcons, NoteIcon } from "uiKit";

import {
  PieChartMarketing,
  SalesIncomeManagementWebinar,
  SalsIncomeManagementInfo,
} from "components/marketing";

const breadcrumbData: BreadCrumbsModel[] = [
  {
    title: "فروش و مارکتینگ",
    link: "/teacher/marketing",
    id: "0",
    color: theme.palette.grey[600],
    active: false,
  },
  {
    title: "مدیریت فروش و درآمـد",
    link: "/teacher/marketing/sales-income-management",
    id: "1",
    color: theme.palette.grey[600],
    active: true,
  },
];

export const SalesIncomeManagementPage: React.FC = () => {
  return (
    <>
      <HeaderLayout title="فروش و مارکتینگ" breadcrumb={breadcrumbData} />

      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px",
            [theme.breakpoints.down("sm")]: {
              padding: "15px 10px 18px",
              border: "none",
              borderRadius: "unset",
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <MarketingIcons color={theme.palette.primary[600]} />
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                مدیریت فروش و درآمـد
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                fontSize={"14px"}
                fontWeight={500}
                color={theme.palette.grey[500]}
              >
                نمودار درآمدی به تفکیک تاریخ وبـینــــــــــــــــار
              </Typography>
              <Box display={"flex"} alignItems={"center"} gap={"13px"}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={500}
                  color={theme.palette.grey[600]}
                >
                  ۲۹ دی ماه ۱۴۰۳
                </Typography>
                <NoteIcon color={theme.palette.grey[600]} />
              </Box>
            </Box>
            <Box display={"flex"} gap={"16px"}>
              <SalsIncomeManagementInfo />
              <PieChartMarketing />
              <SalesIncomeManagementWebinar />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
