import React from "react";
import { Box, Typography } from "@mui/material";
import { chartsGridClasses, LineChart } from "@mui/x-charts";

import theme from "theme";

export const LineChartMarkting: React.FC = () => {
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
          نمودار درآمد مستقیم ماهیانه
        </Typography>
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
            data: [10, 15, 20, 25, 50, 250, 300],

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
