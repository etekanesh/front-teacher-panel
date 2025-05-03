import React, { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { pieArcLabelClasses, PieChart, useDrawingArea } from "@mui/x-charts";

import theme from "theme";
import { useDashboardStore } from "store/useDashboard.store";

export const PieChartKit: React.FC = () => {
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

  const today = new Date();
  const { fetchDashboardMonthlyData, dashboardMonthlyData } =
    useDashboardStore();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    +today.toLocaleDateString("fa-IR-u-nu-latn", { month: "2-digit" })
  );
  const [currentYear, setCurrentYear] = useState(
    +today.toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric" })
  );

  const prevMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 1) {
        setCurrentYear(currentYear - 1);
        return 12; // برگشت به اسفند
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 12) {
        setCurrentYear(currentYear + 1);
        return 1; // رفتن به فروردین
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

  useEffect(() => {
    fetchDashboardMonthlyData(currentYear, currentMonthIndex);
  }, [currentYear, currentMonthIndex]);

  return (
    <Box
      flexGrow={1}
      padding={"23px 17px 17px"}
      border={`1px solid ${theme.palette.grey[400]}`}
      borderRadius={"10px"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          padding: "19px 15px",
        },
      }}
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
          {months[currentMonthIndex - 1]} {currentYear}
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
                  value: dashboardMonthlyData?.sold_income,
                  label: "مجموع درامد فروش دوره",
                  color: theme.palette.primary[300],
                },
                {
                  id: 1,
                  value: dashboardMonthlyData?.webinar_income,
                  label: "مجموع درامد فروش وبینارها",
                  color: theme.palette.primary[400],
                },
                {
                  id: 2,
                  value: dashboardMonthlyData?.share_of_students,
                  label: "سهم مدرس از دانشجویان تسویه شده",
                  color: "#4DB2D2",
                },
              ],
              innerRadius: 70,
              cornerRadius: 10,
              paddingAngle: 4,

              arcLabel: (item) =>
                `${Math.round(
                  (item.value /
                    (dashboardMonthlyData?.share_of_students +
                      dashboardMonthlyData?.sold_income +
                      dashboardMonthlyData?.webinar_income)) *
                    100
                )}%`,
              arcLabelMinAngle: 15,
            },
          ]}
          width={250}
          height={400}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "bottom", horizontal: "right" },
              padding: 0,
            },
            popper: {
              placement: "left-end",
              sx: {
                zIndex: 10001,
                "& .MuiChartsTooltip-valueCell": {
                  paddingLeft: "10px",
                  paddingRight: "0px !important",
                },
                "& .MuiChartsTooltip-labelCell": {
                  paddingLeft: "10px",
                  paddingRight: 0,
                },
                "& .MuiChartsTooltip-markCell": {
                  paddingLeft: "5px !important",
                  paddingRight: "5px !important",
                },
              },
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
              {(
                (dashboardMonthlyData?.share_of_students +
                  dashboardMonthlyData?.sold_income +
                  dashboardMonthlyData?.webinar_income) /
                1000000
              ).toFixed(2)}
            </tspan>
            <tspan
              fontSize={"11px"}
              dy={"15px"}
              dx={63}
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
