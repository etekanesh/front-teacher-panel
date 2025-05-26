import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { ClockIcon } from "@mui/x-date-pickers/icons";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOffAltOutlined";

import { ForumIcons, MarketingWebinarIcons, PeopleIcons } from "uiKit";
import theme from "theme";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { useCoursesStore } from "store/useCourses.store";
import { RatingRow } from "./RatingRow";
import yellow from "assets/yellow-chart.png";
import green from "assets/green-chart.png";
import primary from "assets/primary-chart.png";
import red from "assets/red-chart.png";
import blue from "assets/blue-chart.png";
import { CustomBarChart } from "./CustomBarChart";

export const CourseStatus: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const {
    fetchCoursesFeedbackData,
    coursesFeedbackData,
    fetchCoursesLevelAcademyData,
    coursesLevelAcademy,
    fetching,
  } = useCoursesStore();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    fetchCoursesFeedbackData();
    fetchCoursesLevelAcademyData();
  }, []);

  useEffect(() => {
    if (!selectedCourse && Object.keys(coursesLevelAcademy).length > 0) {
      setSelectedCourse(Object.keys(coursesLevelAcademy)[0]);
    }
  }, [coursesLevelAcademy]);

  const selectedUuid = Object.keys(coursesLevelAcademy)[0];

  const levelsDispersion = selectedUuid
    ? coursesLevelAcademy[selectedUuid]?.LevelsDispersion
    : undefined;

  const courseList = Object.entries(coursesLevelAcademy).map(
    ([uuid, data]) => ({
      uuid,
      title: data.title,
    })
  );

  return (
    <Box
      display={"flex"}
      gap={"8px"}
      flexDirection={isMobile ? "column" : "row"}
    >
      <Box
        flex={2}
        borderRadius={"10px"}
        bgcolor={"rgba(237, 240, 239, 0.5)"}

      >
        {!fetching && selectedCourse && (
          <CustomBarChart
            levelsDispersion={levelsDispersion}
            courseList={courseList}
            selectedCourse={selectedCourse}
            onChangeCourse={setSelectedCourse}
          />
        )}
      </Box>

      <Box
        flex={1}
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
            chart={red}
            value={
              coursesFeedbackData?.summary?.["بازخورد مدرس برای پیشرفت"]
                ?.rate ?? 0
            }
            color="rgba(239, 83, 83, 0.8)"
            icon={<MarketingWebinarIcons color="#fff" />}
          />
          <RatingRow
            label={"توانایی برقراری ارتباط"}
            chart={yellow}
            value={
              coursesFeedbackData?.summary?.["توانایی برقراری ارتباط"]?.rate ??
              0
            }
            color="#F5A623"
            icon={<SentimentSatisfiedAltIcon />}
          />
          <RatingRow
            label={"دانش تخصصی مدرس"}
            chart={blue}
            value={coursesFeedbackData?.summary?.["دانش تخصصی مدرس"]?.rate ?? 0}
            color="rgba(77, 178, 210, 1)"
            icon={<ForumIcons color="#fff" />}
          />
          <RatingRow
            label={"قدرت انتقال محتوای مدرس"}
            value={
              coursesFeedbackData?.summary?.["قدرت انتقال محتوای مدرس"]?.rate ??
              0
            }
            chart={green}
            color="rgba(119, 222, 178, 1)"
            icon={<ClockIcon />}
          />
          <RatingRow
            label={"کاربردی بودن مفاهیم"}
            value={coursesFeedbackData?.summary?.["کاربردی بودن مفاهیم"]?.rate}
            chart={primary}
            color="#40C792"
            icon={<ThumbUpIcon sx={{ color: "fff" }} />}
          />
        </Box>
      </Box>
    </Box>
  );
};
