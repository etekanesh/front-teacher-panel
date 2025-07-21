import React from "react";
import { Box, Chip, Divider, Typography, useMediaQuery } from "@mui/material";
// import { SparkLineChart } from "@mui/x-charts";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";


import theme from "theme";
import { CardCoinIcons, PeopleIcons, ProfileTickIcons } from "uiKit";
import { useStudentsStore } from "store/useStudents.store";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";

export const InfoStudents: React.FC = () => {
  const { studentsStatsData } = useStudentsStore();

  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
      gap={"10px"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          gap: "6px",
          padding: "0 16px",
        },
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        flex={1}
        justifyContent={"space-between"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Box
          minWidth={"40%"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
        >
          <Box
            width={"25px"}
            height={"25px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"100%"}
            borderColor={theme.palette.grey[400]}
            bgcolor={theme.palette.grey[400]}
          >
            <PeopleIcons />
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"10px"}
              fontWeight={600}
              color={theme.palette.grey[600]}
            >
              تعداد کل دانشجـــــــویان
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "2px",
                },
              }}
            >
              <PersianTypography
                fontSize={"20px"}
                fontWeight={600}
                color={theme.palette.grey[500]}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                  },
                }}
              >
                {studentsStatsData?.staudents_count?.count}
              </PersianTypography>
              <Chip
                label={
                  <PersianTypography fontWeight={600} fontSize={8}>
                    ( {studentsStatsData?.staudents_count?.difference} %)
                  </PersianTypography>
                }
                icon={
                  <ArrowCircleUpRoundedIcon
                    sx={{ height: "10px", width: "10px" }}
                  />
                }
                color="primary"
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "13px",
                  gap: "3px",
                  padding: "8px",
                  alignItems: "center",
                  bgcolor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-root": {
                    padding: "8px",
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* <Box
          display={"flex"}
          maxWidth={"100%"}
          minWidth={"30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NorthRoundedIcon
            sx={{
              width: "12px",
              height: "12px",
              strokeWidth: 1,
              stroke: theme.palette.primary[400],
              color: theme.palette.primary[400],
            }}
          />
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={32}
            curve="natural"
            area
            colors={["#40C792"]}
            sx={{
              "& .MuiAreaElement-root": {
                fill: "url(#gradiant1)",
              },
            }}
          >
            <defs>
              <linearGradient id="gradiant1" gradientTransform="rotate(90)">
                <stop offset="35%" stopColor="#40C79259" />
                <stop offset="100%" stopColor="#FFFFFF00" />
              </linearGradient>
            </defs>
          </SparkLineChart>
        </Box> */}
      </Box>
      <Divider
        orientation={isMobile ? "horizontal" : "vertical"}
        sx={{
          height: "16px",
          textAlign: "center",
          alignSelf: "center",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "1px",
          },
        }}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        flex={1}
        justifyContent={"space-between"}

        sx={{
          [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Box
          minWidth={"40%"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
        >
          <Box
            width={"25px"}
            height={"25px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"100%"}
            borderColor={theme.palette.grey[400]}
            bgcolor={theme.palette.grey[400]}
          >
            <CardCoinIcons />
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"10px"}
              fontWeight={600}
              color={theme.palette.grey[600]}
            >
              درآمد تجمیعــــــی
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "2px",
                },
              }}
            >
              <PersianTypography
                fontSize={"20px"}
                fontWeight={600}
                color={theme.palette.grey[500]}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                  },
                }}
              >
                {studentsStatsData?.total_income?.income.toLocaleString("fa")}
              </PersianTypography>
              <Chip
                label={
                  <PersianTypography fontWeight={600} fontSize={8}>
                    ( {studentsStatsData?.total_income?.difference} %)
                  </PersianTypography>
                }
                icon={
                  <ArrowCircleDownRoundedIcon
                    sx={{ height: "10px", width: "10px" }}
                  />
                }
                color={"error"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "13px",
                  gap: "3px",
                  padding: "8px",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "8px",
                  bgcolor: theme.palette.error[50],
                  borderColor: theme.palette.error[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* <Box
          display={"flex"}
          maxWidth={"100%"}
          minWidth={"30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SouthRoundedIcon
            sx={{
              width: "12px",
              height: "12px",
              strokeWidth: 1,
              stroke: theme.palette.error[500],
              color: theme.palette.error[500],
            }}
          />
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={32}
            curve="natural"
            area
            colors={["#EF5353"]}
            sx={{
              "& .MuiAreaElement-root": {
                fill: "url(#gradiant2)",
              },
            }}
          >
            <defs>
              <linearGradient id="gradiant2" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#EF5353" />
                <stop offset="100%" stopColor="#FFFFFF00" />
              </linearGradient>
            </defs>
          </SparkLineChart>
        </Box> */}
      </Box>
      <Divider
        orientation={isMobile ? "horizontal" : "vertical"}
        sx={{
          height: "16px",
          textAlign: "center",
          alignSelf: "center",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "1px",
          },
        }}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        flex={1}
        justifyContent={"space-between"}

        sx={{
          [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Box
          minWidth={"40%"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
        >
          <Box
            width={"25px"}
            height={"25px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"100%"}
            borderColor={theme.palette.grey[400]}
            bgcolor={theme.palette.grey[400]}
          >
            <ProfileTickIcons />
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"10px"}
              fontWeight={600}
              color={theme.palette.grey[600]}
            >
              دانشجـــــــویان در حال کسب درآمد
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "2px",
                },
              }}
            >
              <PersianTypography
                fontSize={"20px"}
                fontWeight={600}
                color={theme.palette.grey[500]}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                  },
                }}
              >
                {studentsStatsData?.earning_students?.count}
              </PersianTypography>
              <Chip
                label={
                  <PersianTypography fontWeight={600} fontSize={8}>
                    ( {studentsStatsData?.earning_students?.difference} %)
                  </PersianTypography>
                }
                icon={
                  <ArrowCircleUpRoundedIcon
                    sx={{ height: "10px", width: "10px" }}
                  />
                }
                color={"primary"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "13px",
                  gap: "3px",
                  padding: "8px",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "8px",
                  bgcolor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* <Box
          display={"flex"}
          maxWidth={"100%"}
          minWidth={"30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NorthRoundedIcon
            sx={{
              width: "12px",
              height: "12px",
              strokeWidth: 1,
              stroke: theme.palette.primary[400],
              color: theme.palette.primary[400],
            }}
          />
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={32}
            curve="natural"
            area
            colors={["#40C792"]}
            sx={{
              "& .MuiAreaElement-root": {
                fill: "url(#gradiant3)",
              },
            }}
          >
            <defs>
              <linearGradient id="gradiant3" gradientTransform="rotate(90)">
                <stop offset="35%" stopColor="#40C79259" />
                <stop offset="100%" stopColor="#FFFFFF00" />
              </linearGradient>
            </defs>
          </SparkLineChart>
        </Box> */}
      </Box>
    </Box>
  );
};
