import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { chartsGridClasses, LineChart } from "@mui/x-charts";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import theme from "theme";
import { useDashboardStore } from "store/useDashboard.store";

export const LineChartKit: React.FC = () => {
  const [income, setIncome] = useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    setIncome(event.target.value);
  };

  const { fetchDashboardSummaryData, dashboardSummaryData } =
    useDashboardStore();

  useEffect(() => {
    fetchDashboardSummaryData();
  }, []);

  return (
    <Box
      flexGrow={1}
      sx={{
        background: theme.palette.grey[400],
        borderRadius: "10px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        padding={"18px 15px 0 15px"}
        alignItems={"center"}
      >
        <Typography
          fontSize={"16px"}
          color={theme.palette.grey[500]}
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
              padding: "13px 15px 0 15px",
            },
          }}
        >
          {income == "1" ? "درآمد کلی مدرس" : "تعداد افراد خریدار دوره"}
        </Typography>

        <Select
          value={income}
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
          }}
          displayEmpty
        >
          <MenuItem value={1}>درآمد کلی مدرس ماهانه</MenuItem>
          <MenuItem value={2}>تعداد افراد خریدار دوره</MenuItem>
          {/* <MenuItem value={3}>نمودار درامد از وبینارها </MenuItem> */}
        </Select>
      </Box>
      <LineChart
        colors={[theme.palette.grey[600]]}
        xAxis={[
          {
            scaleType: "band",
            disableLine: true,
            disableTicks: true,
            hideTooltip: true,
            data: [
              "فروردین",
              "اردیبهشت",
              "خرداد",
              "تیر",
              "مرداد",
              "شهریور",
              "مهر",
              "آبان",
              "آذر",
              "دی",
              "بهمن",
              "اسفند",
            ],
          },
        ]}
        series={[
          {
            data:
              income == "1"
                ? dashboardSummaryData?.map((item) => item?.income / 1000000)
                : dashboardSummaryData?.map((item) => item?.sold),
            valueFormatter: (v) =>
              income == "1" ? `${v} میلیون تومان` : `${v} نفر`,
          },
        ]}
        yAxis={[
          {
            disableLine: true,
            disableTicks: true,
            valueFormatter:
              income == "1"
                ? (value) => `${value} میلیون`
                : (value) => `${value} نفر`,
          },
        ]}
        tooltip={{
          trigger: "axis",
        }}
        grid={{ horizontal: true }}
        // width={594}
        height={422}
        axisHighlight={{
          x: "band",
        }}
        sx={{
          padding: "16px",
          [`& .${chartsGridClasses.line}`]: {
            strokeDasharray: "4 4",
            strokeWidth: 1,
          },
        }}
        slotProps={{
          popper: {
            sx: {
              "& .MuiChartsTooltip-paper": {
                backgroundColor: theme.palette.primary[600],
                borderRadius: "10px",

                "& .MuiTypography-root": {
                  color: "white",
                },
              },
              "& .MuiChartsTooltip-mark": {
                display: "none",
              },
            },
          },
        }}
      />
    </Box>
  );
};
