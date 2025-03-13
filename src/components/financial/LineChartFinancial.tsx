import React, { useState } from "react";
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

export const LineChartFinancial: React.FC = () => {
  const [income, setIncome] = useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    setIncome(event.target.value);
  };

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
        <Typography fontSize={"16px"} color={theme.palette.grey[500]}>
          درآمد کلی مدرس
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
          <MenuItem value={2}>تعداد افرادی که در ماه دوره رو خریدن</MenuItem>
          <MenuItem value={2}>نمودار درامد از وبینارها </MenuItem>
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
            data: [10, 15, 200, 25, 50, 250, 25, 40, 100, 10, 50, 15],
            valueFormatter: (v) => `${v} میلیون تومان`,
          },
        ]}
        yAxis={[
          {
            disableLine: true,
            disableTicks: true,
            valueFormatter: (value) => `${value} میلیون`,
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
