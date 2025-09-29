import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  useMediaQuery,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Download } from "@mui/icons-material";

import theme from "theme";
import { EyeIcon } from "uiKit";
import { useStudentsStore } from "store/useStudents.store";
import { useDashboardStore } from "store/useDashboard.store";
import { groupStatusMap, PersianConvertDate, studentStatusMap } from "core/utils";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { LineChartKitDollar } from "uiKit/LineChartKitDollar";

type Props = {
  open: boolean;
  studentCustomData?: any;
  handleClose: (item: boolean) => void;
};

export const DrawerStudents: React.FC<Props> = ({ open, studentCustomData, handleClose }) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { fetchingStudent, studentData, fetchStudentData } = useStudentsStore();
  const { fetchSummaryByIdData } = useDashboardStore();

  useEffect(() => {
    fetchStudentData(studentCustomData?.fullName?.id);
    fetchSummaryByIdData(studentCustomData?.fullName?.uuid);
  }, [studentCustomData?.fullName?.id, studentCustomData?.fullName?.uuid]);

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #EDF0EF",
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      border: "1px solid #EDF0EF",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  }));

  // safe access to group status
  const statusValueGpLancing = studentCustomData?.groupStatus?.status;
  const statusConfigGpLancing = groupStatusMap[statusValueGpLancing] || {
    color: theme.palette.grey[500],
    bgcolor: theme.palette.grey[100],
    borderColor: theme.palette.grey[300],
    label: "-",
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={isMobile ? "bottom" : "right"}
      sx={{
        "& .MuiDrawer-paper": {
          left: "0% !important",
          right: "unset !important",
          top: "15%",
          height: "85%",
          borderRadius: "10px",
          [theme.breakpoints.down("sm")]: {
            right: "0% !important",
            bottom: "0%",
            top: "16%",
            height: "84%",
            borderRadius: "unset",
          },
        },
      }}
    >
      {fetchingStudent ? (
        <Box
          sx={{
            border: `1px solid ${theme.palette.grey[400]}`,
            boxShadow: 24,
            p: "18px 25px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: { borderRadius: "unset", p: "18px 0px" },
          }}
          minWidth={400}
          minHeight={"100%"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            border: `1px solid ${theme.palette.grey[400]}`,
            boxShadow: 24,
            p: "18px 25px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: { borderRadius: "unset", p: "18px 0px" },
          }}
        >
          {/* HEADER */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ [theme.breakpoints.down("sm")]: { borderRadius: "unset", p: "0px 16px" } }}
          >
            <Box display={"flex"} gap={"7px"} alignItems={"center"}>
              <Badge
                sx={{
                  "& .MuiBadge-badge": {
                    width: "15px",
                    height: "15px",
                    minWidth: "15px",
                    top: "6px",
                    left: "6px",
                    padding: "2px",
                    border: "2px solid",
                  },
                }}
                color={"primary"}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <Box
                  component={"img"}
                  src={studentCustomData?.fullName?.avatar || "https://etekanesh.com/static/panel/media/avatars/blank.png"}
                  width={"51px"}
                  height={"51px"}
                  borderRadius={"50%"}
                />
              </Badge>
              <Box display={"flex"} flexDirection={"column"}>
                <PersianTypography fontSize={"14px"} fontWeight={700} color={theme.palette.grey[500]}>
                  {studentCustomData?.fullName?.fullName || "-"}
                </PersianTypography>
                <Box display={"flex"} gap={"8px"}>
                  <PersianTypography fontSize={"12px"} color={theme.palette.grey[600]}>
                    آخرین بازدید
                  </PersianTypography>
                  <Divider orientation="vertical" sx={{ height: "8px", textAlign: "center", alignSelf: "center" }} />
                  <PersianTypography fontSize={"12px"} fontWeight={700} color={theme.palette.grey[600]}>
                    {PersianConvertDate(studentCustomData?.fullName?.lastActivity) || "-"}
                  </PersianTypography>
                </Box>
              </Box>
            </Box>

            <HtmlTooltip
              title={
                <Box display={"flex"} flexDirection={"column"} gap={"6px"}>
                  <Box display={"flex"} gap={"2px"}>
                    <PersianTypography fontSize={"12px"} color={theme.palette.grey[600]}>
                      وضعیت پرداخت :
                    </PersianTypography>
                    <PersianTypography fontSize={"12px"} fontWeight={700} color={studentData?.order_status ? theme.palette.primary[600] : theme.palette.grey[500]}>
                      {studentData?.order_status || "-"}
                    </PersianTypography>
                  </Box>
                  <Divider />
                  <Box display={"flex"} gap={"2px"}>
                    <PersianTypography fontSize={"12px"} color={theme.palette.grey[600]}>
                      وضعیت اتصال تلگرام :
                    </PersianTypography>
                    <PersianTypography fontSize={"12px"} fontWeight={700} color={studentCustomData?.fullName?.telegramStatus ? theme.palette.primary[600] : theme.palette.error[500]}>
                      {studentCustomData?.fullName?.telegramStatus ? "متصل" : "عدم اتصال"}
                    </PersianTypography>
                  </Box>
                </Box>
              }
              placement="bottom-start"
              arrow
            >
              <InfoOutlinedIcon sx={{ width: "18px", height: "18px", color: theme.palette.grey[600] }} />
            </HtmlTooltip>
          </Box>

          {/* GROUP STATUS */}
          <Box display={"flex"} justifyContent={"space-between"} sx={{ [theme.breakpoints.down("sm")]: { borderRadius: "unset", p: "0px 16px" } }}>
            <PersianTypography fontSize={"12px"} color={theme.palette.grey[600]}>
              وضعیت گروپلنسینگ
            </PersianTypography>
            <Chip
              label={statusConfigGpLancing?.label ?? "-"}
              variant="outlined"
              sx={{
                display: "flex",
                height: "20px",
                padding: "6px",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "12px",
                color: statusConfigGpLancing?.color ?? theme.palette.grey[500],
                bgcolor: statusConfigGpLancing?.bgcolor ?? theme.palette.grey[100],
                borderColor: statusConfigGpLancing?.borderColor ?? theme.palette.grey[300],
                width: "fit-content",
                "& .MuiChip-icon": { margin: 0 },
                "& .MuiChip-label": { padding: 0 },
              }}
            />
          </Box>

          <Divider sx={{ [theme.breakpoints.up("sm")]: { display: "none" } }} />

          {/* STUDENT LEVEL */}
          <Box display={"flex"} padding={"16px"} border={`1px solid ${theme.palette.grey[400]}`} borderRadius={"10px"} flexDirection={"column"} gap={"12px"} sx={{ [theme.breakpoints.down("sm")]: { border: "unset", padding: "0px 16px" } }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                <PersianTypography fontSize={"14px"} color={theme.palette.grey[500]}>
                  سطح دانشجو
                </PersianTypography>
                <Divider orientation="vertical" sx={{ height: "8px", textAlign: "center", alignSelf: "center" }} />
                <Chip
                  label={
                    <Box height={"23px"}>
                      <PersianTypography display={"inline"} fontSize={"18px"} fontWeight={700}>
                        {studentData?.level_status?.current ?? 0}
                      </PersianTypography>
                      <PersianTypography display={"inline"} fontSize={"10px"}>/</PersianTypography>
                      <PersianTypography display={"inline"} fontSize={"14px"}>
                        {studentData?.level_status?.max ?? 0}
                      </PersianTypography>
                    </Box>
                  }
                  icon={<StarRateRoundedIcon sx={{ height: "15px", width: "15px" }} color="warning" />}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    height: "23px",
                    gap: "2px",
                    padding: "4px",
                    alignItems: "center",
                    direction: "ltr",
                    bgcolor: theme.palette.grey[50],
                    borderColor: theme.palette.grey[200],
                    "& .MuiChip-icon": { margin: 0 },
                    "& .MuiChip-label": { padding: 0 },
                  }}
                />
              </Box>
              <Box>
                <PersianTypography fontSize={"12px"} color={theme.palette.grey[600]}>
                  {(studentData?.level_status?.max ?? 0) - (studentData?.level_status?.current ?? 0)} مرحله باقی مانده تا انتهای پروسه
                </PersianTypography>
              </Box>
            </Box>

            <Box sx={{ padding: "4px", backgroundColor: theme.palette.primary[50], borderRadius: "20px", display: "flex", justifyContent: "space-between" }}>
              <Box width={"100%"} position={"relative"}>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={((studentData?.level_status?.current ?? 0) * 100) / ((studentData?.level_status?.max ?? 1))}
                  sx={{
                    height: "24px",
                    borderRadius: "20px",
                    backgroundColor: "unset",
                    "& .MuiLinearProgress-bar": { borderRadius: "20px" },
                  }}
                />
                <Box
                  borderRadius={"50%"}
                  width={"24px"}
                  height={"24px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"absolute"}
                  top={"0%"}
                  left={"93%"}
                  zIndex={1}
                  bgcolor={theme.palette.primary[400]}
                  display={"flex"}
                >
                  <Box
                    borderRadius={"50%"}
                    display={"flex"}
                    width={"16px"}
                    height={"16px"}
                    border={"1.5px solid white"}
                    bgcolor={"transparent"}
                    justifyContent={"center"}
                    alignItems={"baseline"}
                  >
                    <PersianTypography height={"16px"} display={"inline"} fontSize={"12px"}>
                      {studentData?.level_status?.current ?? 0}
                    </PersianTypography>
                  </Box>
                </Box>

                <PersianTypography sx={{ position: "absolute", top: "25%", left: "33%" }} fontSize={"12px"} fontWeight={700} color="white">
                  {studentData?.level_status?.current ?? 0} / {studentData?.level_status?.max ?? 0}
                </PersianTypography>
              </Box>

              <Box borderRadius={"50%"} width={"24px"} height={"24px"} justifyContent={"center"} alignItems={"center"} display={"flex"} border={"4px solid "} borderColor={theme.palette.primary[100]}>
                <Box
                  borderRadius={"50%"}
                  display={"flex"}
                  width={"16px"}
                  height={"16px"}
                  border={"1.5px solid "}
                  borderColor={theme.palette.primary[400]}
                  bgcolor={"transparent"}
                  justifyContent={"center"}
                  alignItems={"baseline"}
                  color={theme.palette.primary[400]}
                >
                  <PersianTypography height={"16px"} display={"inline"} fontSize={"12px"}>
                    {studentData?.level_status?.max ?? 0}
                  </PersianTypography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ [theme.breakpoints.up("sm")]: { display: "none" } }} />

          {/* LINE CHART */}
          <Box display={"flex"} flexDirection={"column"} gap={"7px"} sx={{ [theme.breakpoints.down("sm")]: { padding: "0px 10px" } }}>
            <Box sx={{ background: theme.palette.grey[400], borderRadius: "10px" }}>
              <LineChartKitDollar processId={studentCustomData?.process?.processId ?? ""} />
            </Box>
          </Box>

          {/* LEVELS LIST */}
          {studentData?.levels?.map((item, index) => {
            const statusConfig = studentStatusMap[item?.status] || {
              color: theme.palette.grey[500],
              bgcolor: theme.palette.grey[100],
              borderColor: theme.palette.grey[300],
              label: "-",
              iconColor: "inherit",
            };

            return (
              <Box display={"flex"} gap={"8px"} flexDirection={"column"} sx={{ [theme.breakpoints.down("sm")]: { padding: "0px 16px" } }} key={item?.uuid}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                    <PersianTypography fontSize={"14px"} display={"inline"} color={theme.palette.grey[600]}>
                      {index + 1}
                    </PersianTypography>
                    <PersianTypography fontSize={"14px"} display={"inline"} color={theme.palette.grey[500]}>
                      تکلیف شماره {index + 1}
                    </PersianTypography>
                  </Box>

                  <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                    <Chip
                      label={statusConfig?.label ?? "-"}
                      icon={<ErrorOutlineRoundedIcon color={statusConfig.iconColor as any} sx={{ height: "15px", width: "15px" }} />}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        height: "28px",
                        gap: "4px",
                        padding: "6px",
                        alignItems: "center",
                        fontWeight: 700,
                        fontSize: "12px",
                        color: statusConfig.color ?? theme.palette.grey[500],
                        bgcolor: statusConfig.bgcolor ?? theme.palette.grey[100],
                        borderColor: statusConfig.borderColor ?? theme.palette.grey[300],
                        "& .MuiChip-icon": { margin: 0 },
                        "& .MuiChip-label": { padding: 0 },
                      }}
                    />
                    <Button sx={{ padding: "0px", minWidth: "28px" }}>
                      <Link to={`/teacher/students/${item?.uuid}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <Button sx={{ padding: "0px", minWidth: "28px" }}>
                      <a href={item?.project} download target="_blank" rel="noopener noreferrer">
                        <IconButton disabled={!item?.project} sx={{ padding: 0 }} color={!item?.project ? "default" : "primary"}>
                          <Download />
                        </IconButton>
                      </a>
                    </Button>
                  </Box>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Box>
      )}
    </Drawer>
  );
};
