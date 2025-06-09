import React, { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { pieArcLabelClasses, PieChart, useDrawingArea } from "@mui/x-charts";

import theme from "theme";
import { useChartStore } from "store/useChart.store";

export const PieChartKitDollar: React.FC = () => {
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
    const todayMonthIndex = +today.toLocaleDateString("fa-IR-u-nu-latn", { month: "2-digit" });
    const todayYear = +today.toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric" });

    const { fetchDollarMonthlyData, dollarMonthlyData } = useChartStore();

    const [currentMonthIndex, setCurrentMonthIndex] = useState(todayMonthIndex);
    const [currentYear, setCurrentYear] = useState(todayYear);

    const prevMonth = () => {
        setCurrentMonthIndex((prev) => {
            if (prev === 1) {
                setCurrentYear((year) => year - 1);
                return 12;
            }
            return prev - 1;
        });
    };

    const nextMonth = () => {
        setCurrentMonthIndex((prev) => {
            if (prev === 12) {
                setCurrentYear((year) => year + 1);
                return 1;
            }
            return prev + 1;
        });
    };

    const isNextDisabled =
        currentYear > todayYear ||
        (currentYear === todayYear && currentMonthIndex >= todayMonthIndex);

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
        fetchDollarMonthlyData(currentYear, currentMonthIndex);
    }, [currentYear, currentMonthIndex]);

    const totalIncome =
        (dollarMonthlyData?.total_income || 0) +
        (dollarMonthlyData?.student_count || 0) +
        (dollarMonthlyData?.share_of_students || 0);

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
                    onClick={nextMonth}
                    disabled={isNextDisabled}
                    sx={{
                        border: "none",
                        background: "none",
                        cursor: isNextDisabled ? "not-allowed" : "pointer",
                        fontSize: "20px",
                        color: isNextDisabled
                            ? theme.palette.grey[400]
                            : theme.palette.grey[600],
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
                    onClick={prevMonth}
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
                                    value: dollarMonthlyData?.total_income || 0,
                                    label: "مجموع درامد دلاری دانشجویان",
                                    color: theme.palette.primary[300],
                                },
                                {
                                    id: 1,
                                    value: dollarMonthlyData?.student_count || 0,
                                    label: "دانشجویان به درآمد رسیده",
                                    color: theme.palette.primary[400],
                                },
                                {
                                    id: 2,
                                    value: dollarMonthlyData?.share_of_students || 0,
                                    label: "سهم مدرس از درامد دانشجویان",
                                    color: "#4DB2D2",
                                },
                            ],
                            innerRadius: 70,
                            cornerRadius: 10,
                            paddingAngle: 4,

                            arcLabel: (item) =>
                                totalIncome > 0
                                    ? `${Math.round((item.value / totalIncome) * 100)}%`
                                    : "0%",
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
                            {(dollarMonthlyData?.total_income || 0).toFixed(2)}
                        </tspan>
                        <tspan
                            fontSize={"11px"}
                            dy={"15px"}
                            dx={63}
                            dominantBaseline={"central"}
                            fill={theme.palette.grey[600]}
                        >
                            دلار
                        </tspan>
                    </PieCenterLabel>
                </PieChart>
            </Box>
        </Box>
    );
};
