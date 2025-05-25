import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

import {
  ForumIcons,
  InsightIcon,
  MarketingWebinarIcons,
  PeopleIcons,
} from "uiKit";
import theme from "theme";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { useCoursesStore } from "store/useCourses.store";
import { RatingRow } from "./RatingRow";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { ClockIcon } from "@mui/x-date-pickers/icons";

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
const dataLow = dataset.map((d) => (d.value < 27 ? d.value : null));

// داده‌ها برای سری دوم (رنگ معمولی): فقط مقادیر 27 یا بالاتر، بقیه null
const dataHigh = dataset.map((d) => (d.value >= 27 ? d.value : null));

// محور x که سطوح رو مشخص می‌کنه
const levels = dataset.map((d) => d.level);

export const CourseStatus: React.FC = () => {
  const { fetchCoursesFeedbackData, coursesFeedbackData } = useCoursesStore();

  useEffect(() => {
    fetchCoursesFeedbackData();
  }, []);

  return (
    <Box display={"flex"} gap={"8px"}>
      <Box flex={2}>
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
      </Box>
      <Box
        flex={1.5}
        display={"flex"}
        flexDirection={"column"}
        gap={"8px"}
        border={"1px solid #EDF0EF"}
        borderRadius={"10px"}
        padding={"17px"}
      >
        <Box display={"flex"} gap={"4px"} alignItems={"center"}>
          <Box
            bgcolor={theme.palette.grey[400]}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={25}
            height={25}
            borderRadius={"50%"}
          >
            <PeopleIcons />
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography color={theme.palette.grey[600]} fontSize={12}>
              تعداد دانشجویانی که در نظرسنجی شرکت داشتند
            </Typography>
            <PersianTypography fontSize={18} color={theme.palette.grey[500]}>
              {coursesFeedbackData?.count} نفر
            </PersianTypography>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={"9px"}>
          <RatingRow
            label="بازخورد مدرس برای پیشرفت"
            value={
              coursesFeedbackData?.summary?.["بازخورد مدرس برای پیشرفت"]
                ?.rate ?? 0
            }
            color="rgba(239, 83, 83, 0.8)"
            icon={<MarketingWebinarIcons color="#fff" />}
          />
          <RatingRow
            label={"توانایی برقراری ارتباط"}
            value={
              coursesFeedbackData?.summary?.["توانایی برقراری ارتباط"]?.rate ?? 0
            }
            color="#F5A623"
            icon={<SentimentSatisfiedAltIcon />}
          />{" "}
          <RatingRow
            label={"دانش تخصصی مدرس"}
            value={coursesFeedbackData?.summary?.["دانش تخصصی مدرس"]?.rate ?? 0}
            color="rgba(77, 178, 210, 1)"
            icon={<ForumIcons color="#fff"/>}
          />{" "}
          <RatingRow
            label={"قدرت انتقال محتوای مدرس"}
            value={
              coursesFeedbackData?.summary?.["قدرت انتقال محتوای مدرس"]?.rate ?? 0
            }
            color="rgba(119, 222, 178, 1)"
            icon={<ClockIcon />}
          />{" "}
          <RatingRow
            label={"کاربردی بودن مفاهیم"}
            value={coursesFeedbackData?.summary?.["کاربردی بودن مفاهیم"]?.rate}
            color="indigo"
            icon={<InsightIcon color="#fff"/>}
          />{" "}
        </Box>
      </Box>
    </Box>
  );
};
