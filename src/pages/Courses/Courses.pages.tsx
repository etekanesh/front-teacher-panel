import React from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "core/types";
import theme from "theme";
import {
  CalendarIcon,
  ChartIcon,
  DocumentCourseIcon,
  InsightIcon,
  TaskIcons,
} from "uiKit";
import { CourseAds, CourseInfo, } from "components";

function TabPanel(props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index} dir="rtl">
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const CoursesPage: React.FC = () => {
  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "مدیریت دوره ها",
      link: "/teacher/courses",
      id: "0",
      color: theme.palette.grey[600],
      active: true,
    },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <HeaderLayout title="مدیریت دوره ها" breadcrumb={breadcrumbData} />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: "10px",
          padding: "24px 28px",
          [theme.breakpoints.down("sm")]: {
            borderRadius: 0,
            padding: "unset",
          },
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          gap={"24px"}
        >
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <TaskIcons
              color={theme.palette.primary[500]}
              width={22.5}
              height={22.5}
            />
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.grey[500]}
            >
              مدیریت دوره ها
            </Typography>
          </Box>
          <Box sx={{ borderBottom: "none", direction: "rtl" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { display: "none" } }} // hides underline
              sx={{
                minHeight: 48,
                ".MuiTab-root": {
                  minHeight: 48,
                  color: "text.secondary",
                  padding: 0,
                  display: "flex",
                  gap: "6px",
                },
                ".Mui-selected": {
                  color: "primary.main", // selected tab label color
                },
                ".MuiTabs-list": {
                  display: "flex",
                  gap: "24px",
                },
              }}
            >
              <Tab
                icon={
                  <Box
                    sx={{
                      bgcolor: value === 0 ? "primary.main" : "grey.300",
                      color: value === 0 ? "white" : "text.primary",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DocumentCourseIcon />
                  </Box>
                }
                iconPosition="start"
                label="اطلاعـــــــــات دوره هــــــــــا"
              />

              <Tab
                icon={
                  <Box
                    sx={{
                      bgcolor: value === 1 ? "primary.main" : "grey.300",
                      color: value === 1 ? "white" : "text.primary",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InsightIcon />
                  </Box>
                }
                iconPosition="start"
                label="لیست دوره‌های شمـــــــا"
              />

              <Tab
                icon={
                  <Box
                    sx={{
                      bgcolor: value === 2 ? "primary.main" : "grey.300",
                      color: value === 2 ? "white" : "text.primary",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarIcon />
                  </Box>
                }
                iconPosition="start"
                label="جلســـــــــــات هفتگــــــــی"
              />

              <Tab
                icon={
                  <Box
                    sx={{
                      bgcolor: value === 3 ? "primary.main" : "grey.300",
                      color: value === 3 ? "white" : "text.primary",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ChartIcon />
                  </Box>
                }
                iconPosition="start"
                label="گزارش وضعیت دوره‌ها"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box flex={3} maxWidth={750}>
                  <CourseInfo />
                </Box>
                <Box flex={1} maxWidth={315}>
                  <CourseAds />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              محتوای تب دوم - لیست دوره‌های شما
            </TabPanel>
            <TabPanel value={value} index={2}>
              محتوای تب سوم - جلسات هفتگی
            </TabPanel>
            <TabPanel value={value} index={3}>
              محتوای تب چهارم - گزارش وضعیت دوره‌ها
            </TabPanel>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
