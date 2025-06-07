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
import {
  groupStatusMap,
  PersianConvertDate,
  studentStatusMap,
} from "core/utils";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { useDashboardStore } from "store/useDashboard.store";
import { LineChartKitDollar } from "uiKit/LineChartKitDollar";

type Props = {
  open: boolean;
  studentCustomData?: any;
  handleClose: (item: boolean) => void;
};

export const DrawerStudents: React.FC<Props> = ({
  open,
  studentCustomData,
  handleClose,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { fetchingStudent, studentData, fetchStudentData } = useStudentsStore();
  const { fetchSummaryByIdData } = useDashboardStore();

  useEffect(() => {
    fetchStudentData(studentCustomData?.fullName?.id);
    fetchSummaryByIdData(studentCustomData?.fullName?.uuid);
  }, []);

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      // color: "rgba(0, 0, 0, 0.87)",
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

  const statusValueGpLancing = studentCustomData?.groupStatus?.status;
  const statusConfigGpLancing = groupStatusMap[statusValueGpLancing];

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
            justifyContent: "center ",
            gap: "14px",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
              borderRadius: "unset",
              p: "18px 0px",
            },
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
            [theme.breakpoints.down("sm")]: {
              borderRadius: "unset",
              p: "18px 0px",
            },
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                borderRadius: "unset",
                p: "0px 16px",
              },
            }}
          >
            <Box display={"flex"} gap={"7px"} alignItems={"center"}>
              <Badge
                // badgeContent={<DoneIcon sx={{ width: "12px", height: "12px" }} />}
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
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Box
                  component={"img"}
                  src={
                    "https://etekanesh.com/static/panel/media/avatars/blank.png"
                  }
                  width={"51px"}
                  height={"51px"}
                  borderRadius={"50%"}
                />
              </Badge>

              <Box display={"flex"} flexDirection={"column"}>
                <PersianTypography
                  fontSize={"14px"}
                  fontWeight={700}
                  color={theme.palette.grey[500]}
                >
                  {studentCustomData?.fullName?.fullName}
                </PersianTypography>
                <Box display={"flex"} gap={"8px"}>
                  <PersianTypography
                    fontSize={"12px"}
                    color={theme.palette.grey[600]}
                  >
                    آخرین بازدید{" "}
                  </PersianTypography>
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: "8px",
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  />
                  <PersianTypography
                    fontSize={"12px"}
                    fontWeight={700}
                    color={theme.palette.grey[600]}
                  >
                    {PersianConvertDate(
                      studentCustomData?.fullName?.lastActivity
                    )}
                  </PersianTypography>
                </Box>
              </Box>
            </Box>
            <>
              <HtmlTooltip
                title={
                  <Box display={"flex"} flexDirection={"column"} gap={"6px"}>
                    <Box display={"flex"} gap={"2px"}>
                      <PersianTypography
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                        display={"inline"}
                      >
                        وضعیت پرداخت :
                      </PersianTypography>
                      <PersianTypography
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.primary[600]}
                        display={"inline"}
                      >
                        {studentData?.order_status}
                      </PersianTypography>
                    </Box>
                    <Divider />
                    <Box display={"flex"} gap={"2px"}>
                      <PersianTypography
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                        display={"inline"}
                      >
                        وضعیت اتصال تلگرام :
                      </PersianTypography>
                      <PersianTypography
                        fontSize={"12px"}
                        fontWeight={700}
                        color={
                          studentCustomData?.fullName?.telegramStatus
                            ? theme.palette.primary[600]
                            : theme.palette.error[500]
                        }
                        display={"inline"}
                      >
                        {studentCustomData?.fullName?.telegramStatus
                          ? "متصل"
                          : "عدم اتصال"}
                      </PersianTypography>
                    </Box>
                  </Box>
                }
                placement="bottom-start"
                arrow
                sx={{
                  "& .MuiTooltip-popper": {
                    backgroundColor: "white",
                  },
                }}
              >
                <InfoOutlinedIcon
                  sx={{
                    width: "18px",
                    height: "18px",
                    color: theme.palette.grey[600],
                  }}
                />
              </HtmlTooltip>
            </>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                borderRadius: "unset",
                p: "0px 16px",
              },
            }}
          >
            <PersianTypography
              fontSize={"12px"}
              color={theme.palette.grey[600]}
            >
              وضعیت گروپلنسینگ
            </PersianTypography>
            <Chip
              label={statusConfigGpLancing?.label}
              variant="outlined"
              sx={{
                display: "flex",
                height: "20px",
                padding: "6px",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "12px",
                color: statusConfigGpLancing.color,
                bgcolor: statusConfigGpLancing.bgcolor,
                borderColor: statusConfigGpLancing.borderColor,
                width: "fit-content",
                "& .MuiChip-icon": {
                  margin: 0,
                },
                "& .MuiChip-label": {
                  padding: 0,
                },
              }}
            />
          </Box>

          <Divider
            sx={{
              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            }}
          />

          <Box
            display={"flex"}
            padding={"16px"}
            border={`1px solid ${theme.palette.grey[400]}`}
            borderRadius={"10px"}
            flexDirection={"column"}
            gap={"12px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                border: "unset",
                padding: "0px 16px",
              },
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                <PersianTypography
                  fontSize={"14px"}
                  color={theme.palette.grey[500]}
                >
                  سطح دانشجو
                </PersianTypography>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "8px",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                />
                <Chip
                  label={
                    <Box height={"23px"}>
                      <PersianTypography
                        display={"inline"}
                        fontSize={"18px"}
                        fontWeight={700}
                      >
                        {studentData?.level_status?.current}
                      </PersianTypography>
                      <PersianTypography display={"inline"} fontSize={"10px"}>
                        /
                      </PersianTypography>
                      <PersianTypography display={"inline"} fontSize={"14px"}>
                        {studentData?.level_status?.max}
                      </PersianTypography>
                    </Box>
                  }
                  icon={
                    <StarRateRoundedIcon
                      sx={{ height: "15px", width: "15px" }}
                      color="warning"
                    />
                  }
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
                    "& .MuiChip-icon": {
                      margin: 0,
                    },
                    "& .MuiChip-label": {
                      padding: 0,
                    },
                  }}
                />
              </Box>
              <Box>
                <PersianTypography
                  fontSize={"12px"}
                  color={theme.palette.grey[600]}
                  display={"inline"}
                >
                  {studentData?.level_status?.max -
                    studentData?.level_status?.current}{" "}
                  مرحله باقی مانده تا انتهای پروسه{" "}
                </PersianTypography>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "4px",
                backgroundColor: theme.palette.primary[50],
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box width={"100%"} position={"relative"}>
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={
                    (studentData?.level_status?.current * 100) /
                    studentData?.level_status?.max
                  }
                  sx={{
                    height: "24px",
                    borderRadius: "20px",
                    backgroundColor: "unset",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: "20px",
                    },
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
                    color={"white"}
                  >
                    <PersianTypography
                      height={"16px"}
                      display={"inline"}
                      fontSize={"12px"}
                    >
                      {studentData?.level_status?.current}
                    </PersianTypography>
                  </Box>
                </Box>

                <PersianTypography
                  sx={{
                    position: "absolute",
                    top: "25%",
                    left: "33%",
                  }}
                  fontSize={"12px"}
                  fontWeight={700}
                  color="white"
                >
                  {studentData?.level_status?.current} /{" "}
                  {studentData?.level_status?.max}
                </PersianTypography>
              </Box>

              <Box
                borderRadius={"50%"}
                width={"24px"}
                height={"24px"}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                border={"4px solid "}
                borderColor={theme.palette.primary[100]}
              >
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
                  <PersianTypography
                    height={"16px"}
                    display={"inline"}
                    fontSize={"12px"}
                  >
                    {studentData?.level_status?.max}
                  </PersianTypography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider
            sx={{
              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            }}
          />

          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"7px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                padding: "0px 10px",
              },
            }}
          >
            <Box
              sx={{
                background: theme.palette.grey[400],
                borderRadius: "10px",
              }}
            >
              <LineChartKitDollar
                processId={studentCustomData?.process?.processId}
              />
            </Box>
            {/* <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"2px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                padding: "0px 6px",
              },
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                مجموع برگشتی ها
              </Typography>
              <Typography fontSize={"14px"} color={"error"}>
                -۵٬۰۰۰٬۰۰۰ تومان
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                مجموع فاکتور های دستی کسر شده
              </Typography>
              <Typography fontSize={"14px"} color={"error"}>
                0 تومان
              </Typography>
            </Box>
          </Box> */}
          </Box>
          {studentData?.levels?.map((item, index) => {
            const statusConfig = studentStatusMap[item?.status];
            return (
              <Box
                display={"flex"}
                gap={"8px"}
                flexDirection={"column"}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    padding: "0px 16px",
                  },
                }}
                key={item?.uuid}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                    <PersianTypography
                      fontSize={"14px"}
                      display={"inline"}
                      color={theme.palette.grey[600]}
                    >
                      {index + 1}
                    </PersianTypography>
                    <PersianTypography
                      fontSize={"14px"}
                      display={"inline"}
                      color={theme.palette.grey[500]}
                    >
                      تکلیف شماره {index + 1}
                    </PersianTypography>
                  </Box>
                  <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                    <Chip
                      label={statusConfig?.label}
                      icon={
                        <ErrorOutlineRoundedIcon
                          sx={{ height: "15px", width: "15px" }}
                        />
                      }
                      variant="outlined"
                      sx={{
                        display: "flex",
                        height: "28px",
                        gap: "4px",
                        padding: "6px",
                        alignItems: "center",
                        fontWeight: 700,
                        fontSize: "12px",
                        color: statusConfig.color,
                        bgcolor: statusConfig.bgcolor,
                        borderColor: statusConfig.borderColor,
                        "& .MuiChip-icon": {
                          margin: 0,
                        },
                        "& .MuiChip-label": {
                          padding: 0,
                        },
                      }}
                    />
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      sx={{ padding: "0px", minWidth: "28px" }}
                    >
                      <Link to={`/teacher/students/${item?.uuid}`}>
                        <EyeIcon />
                      </Link>
                    </Button>
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      sx={{ padding: "0px", minWidth: "28px" }}
                    >
                      <a
                        href={item?.project}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton
                          disabled={!item?.project}
                          sx={{ padding: 0 }}
                          color={!item?.project ? "default" : "primary"}
                        >
                          <PersianTypography
                            fontSize={"12px"}
                            color={theme.palette.grey[500]}
                          >
                            <Download />
                          </PersianTypography>
                        </IconButton>
                      </a>
                    </Button>
                  </Box>
                </Box>
                <Divider />
              </Box>
            );
          })}

          {/* <CustomButton
          sx={{
            height: "24px",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: theme.palette.primary[600],

            [theme.breakpoints.down("sm")]: {
              margin: "0px 16px",
            },
          }}
        >
          پیام به دانشجو
        </CustomButton> */}
        </Box>
      )}
    </Drawer>
  );
};
