import React, { useState } from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
// import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

import theme from "theme";
import { MessageTimeIcon, NoteIcon, WalletIcon } from "uiKit";
import teacherWithoutLabel from "assets/teacher-without-label.png";
import bestContentTeacherLabel from "assets/best-content-teacher-label.png";
import effectiveTeacherLabel from "assets/effective-teacher-label.png";
import professionalTeacherLabel from "assets/professional-teacher-label.png";
import regularTeacherLabel from "assets/regular-teacher-label.png";
import responsibleTeacherLabel from "assets/responsible-teacher-label.png";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { useDashboardStore } from "store/useDashboard.store";

export const InfoDashboard: React.FC = () => {
  const [status] = useState(2);

  const bgColor = (status: number) => {
    switch (status) {
      case 1:
        return theme.palette.grey[900];
      case 2:
        return theme.palette.error[700];
      case 3:
        return theme.palette.warning[800];
      case 4:
        return "#4DB2D280";
      case 5:
        return theme.palette.primary[300];
      case 6:
        return theme.palette.primary[500];
      default:
        return theme.palette.grey[900];
    }
  };

  const { dashOverviewData } = useDashboardStore();
  return (
    <Box
      display={"flex"}
      gap={"12px"}
      flexWrap={"wrap"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          gap: "8px",
        },
      }}
    >
      <Box
        borderRadius={"10px"}
        bgcolor={() => bgColor(status)}
        padding={"12px 14px"}
        // width={237}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
        sx={{
          [theme.breakpoints.down("sm")]: {
            padding: "12px 22px",
          },
        }}
      >
        <Box
          display={"flex"}
          gap={"18px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              justifyContent: "space-between",
              width: "100%",
            },
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"5px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
              },
            }}
          >
            {status == 1 && (
              <Typography
                fontSize={"12px"}
                fontWeight={700}
                color={theme.palette.grey[700]}
                sx={{ textShadow: " 0px 1px  0px #FFFFFF" }}
              >
                لیبل فصلی مدرس
              </Typography>
            )}
            {status == 2 && (
              <Typography
                fontSize={"12px"}
                fontWeight={700}
                color={"white"}
                sx={{ textShadow: " 0px 1px  0px #EF5353" }}
              >
                لیبل فصلی مدرس
              </Typography>
            )}
            {status == 3 && (
              <Typography
                fontSize={"12px"}
                fontWeight={700}
                color={"white"}
                sx={{ textShadow: " 0px 1px  0px #F59202" }}
              >
                لیبل فصلی مدرس
              </Typography>
            )}
            {status == 4 && (
              <Typography
                fontSize={"12px"}
                fontWeight={700}
                color={"white"}
                sx={{ textShadow: " 0px 1px  0px #3993AF" }}
              >
                لیبل فصلی مدرس
              </Typography>
            )}
            {status == 5 && (
              <Typography
                fontSize={"12px"}
                fontWeight={700}
                color={"white"}
                sx={{ textShadow: " 0px 1px  0px #108B6299" }}
              >
                لیبل فصلی مدرس
              </Typography>
            )}
            {status == 6 && (
              <Typography
                fontSize={"12px"}
                fontWeight={700}
                color={"white"}
                sx={{ textShadow: " 0px 1px  0px #108B62" }}
              >
                لیبل فصلی مدرس
              </Typography>
            )}

            {status == 1 && (
              <Chip
                label={"لیبلی ندارید :("}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "18px",
                  padding: "0px 14px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "white",
                  border: "none",
                  bgcolor: theme.palette.grey[800],

                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            )}

            {status == 2 && (
              <Chip
                label={"مدرس پاسخگو"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "18px",
                  padding: "0px 14px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "white",
                  border: "none",
                  bgcolor: theme.palette.error[800],

                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            )}

            {status == 3 && (
              <Chip
                label={"مدرس تاثیرگذار"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "18px",
                  padding: "0px 14px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "white",
                  border: "none",
                  bgcolor: theme.palette.warning[800],

                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            )}

            {status == 4 && (
              <Chip
                label={"با کیفیت ترین محتوا"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "18px",
                  padding: "0px 14px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "white",
                  border: "none",
                  bgcolor: "#4DB2D2",

                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            )}

            {status == 5 && (
              <Chip
                label={"مدرس منظم و متعهد"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "18px",
                  padding: "0px 14px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "white",
                  border: "none",
                  bgcolor: theme.palette.primary[400],

                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            )}

            {status == 6 && (
              <Chip
                label={"مدرس حرفه ای"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "18px",
                  padding: "0px 14px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "10px",
                  color: "white",
                  border: "none",
                  bgcolor: theme.palette.primary[600],

                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            )}
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: "16px",
              width: "2px",
              borderColor: "white",
              textAlign: "center",
              alignSelf: "center",
            }}
          />
          {status == 1 && <Box component={"img"} src={teacherWithoutLabel} />}
          {status == 2 && (
            <Box component={"img"} src={responsibleTeacherLabel} />
          )}
          {status == 3 && <Box component={"img"} src={effectiveTeacherLabel} />}
          {status == 4 && (
            <Box component={"img"} src={bestContentTeacherLabel} />
          )}
          {status == 5 && <Box component={"img"} src={regularTeacherLabel} />}
          {status == 6 && (
            <Box component={"img"} src={professionalTeacherLabel} />
          )}
        </Box>
      </Box>
      <Box
        borderRadius={"10px"}
        bgcolor={"white"}
        padding={"12px 14px"}
        // width={237}
        display={"flex"}
        alignItems={"center"}
        flex={1}
        sx={{
          [theme.breakpoints.down("sm")]: {
            background: theme.palette.grey[400],
            padding: "12px 22px",
          },
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography fontSize={"10px"} color={theme.palette.grey[600]}>
              مجموع درآمد از دانشجویان
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={"5px"}>
              <Box display={"flex"} alignItems={"center"}>
                <PersianTypography
                  fontSize={"20px"}
                  color={theme.palette.grey[500]}
                >
                  {Number(
                    dashOverviewData?.students_total_income ?? 0
                  ).toLocaleString("fa")}
                  $
                </PersianTypography>
              </Box>

              {/* <Chip
                label="(+۵٪)"
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
                  padding: "2px",
                  alignItems: "center",
                  fontWeight: 700,
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
              /> */}
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.primary[50]}
            width={44}
            height={44}
          >
            <WalletIcon color={theme.palette.primary[400]} />
          </Box>
        </Box>
      </Box>

      <Box
        borderRadius={"10px"}
        bgcolor={"white"}
        padding={"12px 14px"}
        // width={237}
        display={"flex"}
        alignItems={"center"}
        flex={1}
        sx={{
          [theme.breakpoints.down("sm")]: {
            background: theme.palette.grey[400],
            padding: "12px 22px",
          },
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography fontSize={"10px"} color={theme.palette.grey[600]}>
              تکالیف نیازمند بازخورد
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={"5px"}>
              <PersianTypography fontSize={"20px"} color={"error"}>
                {(dashOverviewData?.in_review ?? 0).toLocaleString("fa-IR")}
              </PersianTypography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.error[600]}
            width={44}
            height={44}
          >
            <NoteIcon />
          </Box>
        </Box>
      </Box>

      <Box
        borderRadius={"10px"}
        bgcolor={"white"}
        padding={"12px 14px"}
        // width={237}
        display={"flex"}
        alignItems={"center"}
        flex={1}
        sx={{
          [theme.breakpoints.down("sm")]: {
            background: theme.palette.grey[400],
            padding: "12px 22px",
          },
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography fontSize={"10px"} color={theme.palette.grey[600]}>
              پیام های نیازمند پاسخ
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={"5px"}>
              <PersianTypography fontSize={"20px"} color={"warning"}>
                {(dashOverviewData?.unanswered_messages ?? 0).toLocaleString("fa-IR")}
              </PersianTypography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.warning[600]}
            width={44}
            height={44}
          >
            <MessageTimeIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
