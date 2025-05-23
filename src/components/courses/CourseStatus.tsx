import React from "react";
import { BarChart } from "@mui/x-charts";

const dataset = [
    { value: 21, level: "1" },
    { value: 28, level: "2" },
    { value: 41, level: "3" },
    { value: 73, level: "4" },
    { value: 99, level: "5" },
    { value: 65, level: "6" },
    { value: 84, level: "7" },
    { value: 60, level: "8" },
    { value: 49, level: "9" },
    { value: 55, level: "10" },
    { value: 48, level: "11" },
    { value: 25, level: "12" },
];

// داده‌ها برای سری اول (رنگ پررنگ‌تر): فقط مقادیر کمتر از 27، بقیه null
const dataLow = dataset.map(d => (d.value < 27 ? d.value : null));

// داده‌ها برای سری دوم (رنگ معمولی): فقط مقادیر 27 یا بالاتر، بقیه null
const dataHigh = dataset.map(d => (d.value >= 27 ? d.value : null));

// محور x که سطوح رو مشخص می‌کنه
const levels = dataset.map(d => d.level);

export const CourseStatus: React.FC = () => {
    return (
        <BarChart
            dataset={[]}
            xAxis={[
                {
                    scaleType: "band",
                    data: levels,
                    label: "سطح",
                },
            ]}
            yAxis={[
                {
                    label: "درصد پیشرفت",
                    min: 0,
                    max: 100,
                    valueFormatter: (v) => `${v}%`,
                },
            ]}
            series={[
                {
                    data: dataLow,
                    label: "کمتر از ۲۷",
                    color: "#1B7F4C", // رنگ پررنگ‌تر
                    dataKey: "value",
                },
                {
                    data: dataHigh,
                    label: "۲۷ یا بیشتر",
                    color: "#40C792", // رنگ معمولی
                    dataKey: "value",
                },
            ]}
            height={400}
            legend={{ hidden: true }}
            sx={{
                "& .MuiBarElement-root": {
                    rx: 10,
                },
                "& .MuiChartsAxis-directionY .MuiChartsAxis-tickLabel": {
                    fontSize: 12,
                },
                "& .MuiChartsAxis-directionX .MuiChartsAxis-tickLabel": {
                    fontSize: 12,
                },
            }}
        />
    );
};
