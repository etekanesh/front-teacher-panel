import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  // useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { HeaderLayout } from "layouts";
import theme from "theme";
import { BreadCrumbsModel } from "core/types";
import { FinanceRequestIcons, LineChartKit, PieChartKit } from "uiKit";
import { IncomeDetailFinancial, TableFinancial } from "components";

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

export const SalesIncomePage: React.FC = () => {
  // const isMobile = useMediaQuery("(max-width:768px)");

  const [filter, setFilter] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <HeaderLayout title="گزارش مالی" breadcrumb={breadcrumbData} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"8px"}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            // height: "560px",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px 15px",
            [theme.breakpoints.down("sm")]: {
              padding: "15px 10px 18px",
              border: "none",
              borderRadius: "unset",
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
            <IncomeDetailFinancial />

            <Box
              display={"flex"}
              gap={"11px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "8px",
                  flexDirection: "column",
                },
              }}
            >
              <PieChartKit />
              <LineChartKit />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px",
            [theme.breakpoints.down("sm")]: {
              borderRadius: "unset",
              padding: "19px 0px 80px",
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  padding: "0px 16px",
                },
              }}
            >
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <FinanceRequestIcons />
                <Typography
                  fontSize={"16px"}
                  fontWeight={700}
                  color={theme.palette.grey[500]}
                >
                  درخواست های مالی ( ریال )
                </Typography>
              </Box>

              <Select
                value={filter}
                onChange={handleChange}
                variant="standard"
                IconComponent={() => <KeyboardArrowDownRoundedIcon />}
                MenuProps={{
                  sx: {
                    "& .MuiPaper-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiList-root": {
                      padding: "8px 5px !important",
                      gap: "2px !important",
                    },
                    "& .MuiMenuItem-root": {
                      borderRadius: "10px",
                      fontSize: "11px",
                      color: theme.palette.grey[500],
                    },
                  },
                }}
                sx={{
                  minWidth: "108px",
                  border: "none",
                  "::before": { border: "none" },
                  ":hover:not(.Mui-disabled, .Mui-error):before": {
                    border: "none",
                  },
                  "::after": { border: "none" },

                  "& .MuiSelect-select": {
                    padding: "0px !important",
                    color: theme.palette.grey[600],
                    fontSize: "12px",
                  },
                  "& .MuiSvgIcon-root": {
                    right: "unset",
                    left: "7px",
                    fill: theme.palette.grey[600],
                    opacity: 0.5,
                    width: "13px",
                    height: "13px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    display: "none",
                  },
                }}
                displayEmpty
              >
                <MenuItem value="">تاریخ فاکتور ماهیانه</MenuItem>
                <MenuItem value={1}>بیشترین</MenuItem>
                <MenuItem value={2}>کمترین</MenuItem>
              </Select>
            </Box>

            <TableFinancial />
          </Box>
        </Paper>
      </Box>
    </>
  );
};
