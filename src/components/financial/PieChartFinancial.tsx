import React, { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { pieArcLabelClasses, PieChart, useDrawingArea } from "@mui/x-charts";

import theme from "theme";

export const PieChartFinancial: React.FC = () => {
  const months = [
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
  ];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // شروع از اردیبهشت
  const [currentYear, setCurrentYear] = useState(1403); // شروع از 1403

  const prevMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11; // برگشت به اسفند
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0; // رفتن به فروردین
      }
      return prev + 1;
    });
  };

  const StyledText = styled("text")(() => ({
    textAnchor: "middle",
    dominantBaseline: "central",
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  return (
    <Box
      flexGrow={1}
      padding={"23px 17px 17px"}
      border={`1px solid ${theme.palette.grey[400]}`}
      borderRadius={"10px"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Button
          onClick={prevMonth}
          sx={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: theme.palette.grey[600],
          }}
        >
          <KeyboardArrowRight />
        </Button>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: theme.palette.grey[500],
          }}
        >
          {months[currentMonthIndex]} {currentYear}
        </span>
        <Button
          onClick={nextMonth}
          sx={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: theme.palette.grey[600],
          }}
        >
          <KeyboardArrowLeft />
        </Button>
      </Box>
      <Box display={"flex"}>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: 20,
                  label: "مجموع درامد فروش دوره",
                  color: theme.palette.primary[300],
                },
                {
                  id: 1,
                  value: 65,
                  label: "مجموع درامد فروش وبینارها",
                  color: theme.palette.primary[400],
                },
                {
                  id: 2,
                  value: 15,
                  label: "سهم مدرس از دانشجویان تسویه شده",
                  color: "#4DB2D2",
                },
              ],
              innerRadius: 70,
              cornerRadius: 10,
              paddingAngle: 5,

              arcLabel: (item) => `${item.value}%`,
            },
          ]}
          width={250}
          height={400}
          tooltip={{ trigger: "none" }}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "bottom", horizontal: "right" },
              padding: 0,
            },
          }}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
              fill: "white",
            },
            "& .MuiChartsLegend-series tspan": {
              fill: theme.palette.grey[600],
              fontSize: "12px",
            },
            "& .MuiChartsLegend-mark": {
              rx: "50%",
            },
          }}
          margin={{ top: -50, left: 0 }}
        >
          <PieCenterLabel>
            <tspan
              fontSize={"33px"}
              fontWeight={700}
              dy={"-5px"}
              dx={0}
              dominantBaseline={"central"}
              fill={theme.palette.grey[500]}
            >
              560
            </tspan>
            <tspan
              fontSize={"11px"}
              dy={"15px"}
              dx={50}
              dominantBaseline={"central"}
              fill={theme.palette.grey[600]}
            >
              میلیون تومان
            </tspan>
          </PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
};
