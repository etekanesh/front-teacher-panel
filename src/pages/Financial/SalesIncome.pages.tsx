import React from "react";
import { Box, Paper, Typography } from "@mui/material";

import { HeaderLayout } from "layouts/header.layout";
import theme from "theme";
import { BreadCrumbsModel } from "types";
import { FinanceRequestIcons } from "uiKit";
import {
  IncomeDetailFinancial,
  LineChartFinancial,
  PieChartFinancial,
  TableFinancial,
} from "components/financial";

export const SalesIncome: React.FC = () => {
  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "گزارش مالی",
      link: "/financial-reports",
      id: "0",
      color: theme.palette.grey[600],
      active: false,
    },
    {
      title: "جزئیات درآمد فروش",
      link: "/financial-reports/sales-income",
      id: "1",
      color: theme.palette.grey[600],
      active: true,
    },
  ];

  return (
    <>
      <HeaderLayout title="گزارش مالی" breadcrumb={breadcrumbData} />
      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            // height: "560px",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px 15px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
            <IncomeDetailFinancial />

            <Box display={"flex"} gap={"11px"}>
              <PieChartFinancial />
              <LineChartFinancial />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            height: "165px",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Box display={"flex"} gap={"10px"} alignItems={"c"}>
              <FinanceRequestIcons />
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                درخواست های مالی ( ریال )
              </Typography>
            </Box>

            <TableFinancial />
          </Box>
        </Paper>
      </Box>
    </>
  );
};
