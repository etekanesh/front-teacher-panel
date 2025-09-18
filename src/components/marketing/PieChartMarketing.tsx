import React from "react";

import { Box, styled, Typography } from "@mui/material";
import { pieArcLabelClasses, PieChart, useDrawingArea } from "@mui/x-charts";

import theme from "theme";
import { useMarketingStore } from "store/useMarketing.store";

export const PieChartMarketing: React.FC = () => {
  const { webinarsByIdData } = useMarketingStore();

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
      display={"flex"}
      flex={1}
      flexDirection={"column"}
      padding={"23px 17px 17px"}
      border={`1px solid ${theme.palette.grey[400]}`}
      borderRadius={"10px"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          padding: "19px 15px",
        },
      }}
    >
      <Typography
        textAlign={"center"}
        fontSize={"16px"}
        fontWeight={500}
        color={theme.palette.grey[500]}
      >
        وبـینـــــــار کسب درآمد دلاری از فریلنسری
      </Typography>
      <Box display={"flex"}>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: webinarsByIdData?.total_teacher_share,
                  label: "مجموع درامد فروش وبینارها",
                  color: theme.palette.primary[300],
                },
                {
                  id: 1,
                  value: webinarsByIdData?.total_teacher_refunded_share,
                  label: "درصد کسر شده از سهم فروش",
                  color: theme.palette.error[500],
                },
              ],
              innerRadius: 70,
              cornerRadius: 10,
              paddingAngle: 4,

              arcLabel: (item) =>
                `${Math.round(
                  (item.value /
                    (webinarsByIdData?.total_teacher_share +
                      webinarsByIdData?.total_teacher_refunded_share
                    )) *
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
              {webinarsByIdData?.total_teacher_share.toLocaleString()}
            </tspan>
            </PieCenterLabel>
            <PieCenterLabel>
            <tspan
              fontSize={"13px"}
              fontWeight={700}
              dy={"25px"}
              dx={63}
              dominantBaseline={"central"}
              fill={theme.palette.grey[600]}
              style={{
                marginTop: "1400px"
              }}
            >
              میلیون تومان
            </tspan>
          </PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
};
