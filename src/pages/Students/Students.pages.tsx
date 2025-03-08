import React, { useState } from "react";
import {
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { chartsGridClasses, LineChart, SparkLineChart } from "@mui/x-charts";

import { HeaderLayout } from "layouts";
import theme from "theme";
import { BreadCrumbsModel } from "types";
import {
  CardCoinIcons,
  CustomButton,
  ListIcons,
  PeopleIcons,
  ProfileTickIcons,
  SearchInput,
} from "uiKit";

import avatar from "assets/avatar-Image.png";

export const StudentsPage: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState("1");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

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

  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "مدیریت دانشجویان",
      link: "/students",
      id: "0",
      color: theme.palette.grey[600],
      active: false,
    },
    {
      title: "لیست دانشجویان",
      link: "/students",
      id: "1",
      color: theme.palette.grey[600],
      active: true,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "نام و نام خانوادگی",
      headerAlign: "center",
      flex: 1,
      minWidth: 160,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box
          display={"flex"}
          gap={"7px"}
          alignItems={"center"}
          height={"100%"}
          justifySelf={"self-start"}
        >
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params.value.id}
          </Typography>
          <Badge
            badgeContent={
              params?.value?.status === 1 ? (
                <DoneIcon sx={{ width: "8px", height: "8px" }} />
              ) : params?.value?.status === 2 ? (
                <PriorityHighRoundedIcon sx={{ width: "8px", height: "8px" }} />
              ) : (
                <CloseRoundedIcon sx={{ width: "8px", height: "8px" }} />
              )
            }
            sx={{
              "& .MuiBadge-badge": {
                width: "10px",
                height: "10px",
                minWidth: "10px",
                top: "5px",
                left: "5px",
                padding: "2px",
                border: "1px solid",
              },
            }}
            color={
              params?.value?.status === 1
                ? "primary"
                : params?.value?.status === 2
                  ? "warning"
                  : "error"
            }
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box
              component={"img"}
              src={params?.value.imageSrc}
              width={"33px"}
              height={"33px"}
            />
          </Badge>

          <Typography
            fontSize={"14px"}
            color={theme.palette.grey[500]}
            fontWeight={600}
          >
            {params?.value?.fullName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "currentGrade",
      headerName: "سطح فعلی",
      headerAlign: "center",
      flex: 1,
      minWidth: 70,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params?.value?.grade}
          variant="outlined"
          sx={{
            display: "flex",
            height: "20px",
            padding: "6px",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "12px",
            color: theme.palette.grey[600],
            bgcolor: theme.palette.grey[400],
            borderColor: theme.palette.grey[600],
            width: "fit-content",

            "& .MuiChip-icon": {
              margin: 0,
            },
            "& .MuiChip-label": {
              padding: 0,
            },
          }}
        />
      ),
    },

    {
      field: "studentIncome",
      headerName: "میزان درآمد کلی دانشجو",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Box
            display={"flex"}
            color={theme.palette.primary[600]}
            gap={"2px "}
            alignItems={"center"}
          >
            <NorthRoundedIcon
              sx={{
                width: "10px",
                height: "12px",
                strokeWidth: 2,
                stroke: theme.palette.primary[600],
              }}
            />
            <Typography fontSize={"12px"} fontWeight={700}>
              ({params?.value?.percent})
            </Typography>
          </Box>
          <Typography fontSize={"14px"}>
            {params?.value?.income} تومان
          </Typography>
        </Box>
      ),
    },
    {
      field: "groupStatus",
      headerName: "وضعیت گروپلنسینگ",
      headerAlign: "center",
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params?.value?.status}
          variant="outlined"
          sx={{
            display: "flex",
            height: "20px",
            padding: "6px",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "12px",
            color: theme.palette.primary[400],
            bgcolor: theme.palette.primary[50],
            borderColor: theme.palette.primary[200],
            width: "fit-content",
            "& .MuiChip-icon": {
              margin: 0,
            },
            "& .MuiChip-label": {
              padding: 0,
            },
          }}
        />
      ),
    },
    {
      field: "studentStatus",
      headerName: "وضعیت تکلیف دانشجو",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params?.value?.status}
          variant="outlined"
          sx={{
            display: "flex",
            height: "20px",
            padding: "6px",
            alignItems: "center",

            fontWeight: 600,
            fontSize: "12px",
            color: theme.palette.primary[400],
            bgcolor: theme.palette.primary[50],
            borderColor: theme.palette.primary[200],
            width: "fit-content",
            "& .MuiChip-icon": {
              margin: 0,
            },
            "& .MuiChip-label": {
              padding: 0,
            },
          }}
        />
      ),
    },
    {
      field: "action",
      headerName: "جزئیـــــــــات",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"4px"}>
          <CustomButton
            onClick={handleOpen}
            sx={{
              height: "24px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: theme.palette.primary[600],
              maxWidth: "81px",
            }}
          >
            پیام به دانشجو
          </CustomButton>
          <CustomButton
            variant="outlined"
            sx={{
              height: "24px",
              maxWidth: "28px",
              minWidth: "28px",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            ...
          </CustomButton>
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      fullName: {
        id: 1,
        imageSrc: avatar,
        fullName: "تیدا گودرزی",
        status: 1,
      },
      currentGrade: {
        grade: "سطح ۲",
      },
      studentIncome: {
        income: "۵۰۰٬۰۰۰",
        percent: "+25%",
      },
      groupStatus: {
        status: "در حال کسب درآمد",
      },
      studentStatus: {
        status: "تایید شده",
      },
      action: 1,
    },
    {
      id: 2,
      fullName: {
        id: 2,
        imageSrc: avatar,
        fullName: "مرتضی پاک سرشت",
        status: 2,
      },
      currentGrade: {
        grade: "سطح ۲",
      },
      studentIncome: {
        income: "۵۰۰٬۰۰۰",
        percent: "+25%",
      },
      groupStatus: {
        status: "در حال کسب درآمد",
      },
      studentStatus: {
        status: "تایید شده",
      },
      action: 1,
    },
    {
      id: 3,
      fullName: {
        id: 3,
        imageSrc: avatar,
        fullName: "سپهــــــــر رسولی",
        status: 3,
      },
      currentGrade: {
        grade: "سطح ۲",
      },
      studentIncome: {
        income: "۵۰۰٬۰۰۰",
        percent: "+25%",
      },
      groupStatus: {
        status: "در حال کسب درآمد",
      },
      studentStatus: {
        status: "تایید شده",
      },
      action: 1,
    },
  ];

  return (
    <>
      <HeaderLayout title="مدیریت دانشجویان" breadcrumb={breadcrumbData} />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "700px",
          bgcolor: "white",
          [theme.breakpoints.up("sm")]: {
            borderRadius: "10px",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            height: "70px",
            bgcolor: "white",
            borderRadius: "10px 10px 0 0",
            boxShadow: "-12px 0px 67.1px 0px #6B857E17",
            display: "flex",
            gap: 15,
            alignItems: "center",
            padding: "18px 28px",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              gap: "8px",
              height: "100px",
              alignItems: "flex-start",
              padding: "15px 16px 20px",
              boxShadow: "none",
            },
          }}
        >
          <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
            <ListIcons
              color={theme.palette.primary[600]}
              width={22}
              height={22}
            />
            <Typography
              fontSize={16}
              fontWeight={700}
              color={theme.palette.grey[500]}
            >
              لیست دانشجــــــــویان
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flex={1}
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            <SearchInput />
          </Box>
        </Paper>

        <Box
          display={"flex"}
          p={"28px"}
          flexDirection={"column"}
          gap={"40px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              padding: "0",
              gap: "20px",
            },
          }}
        >
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
              minWidth={"300px"}
              maxWidth={"350px"}
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
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "18px",
                        },
                      }}
                    >
                      ۵۶۳
                    </Typography>
                    <Chip
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
              <Box
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
                    <linearGradient
                      id="gradiant1"
                      gradientTransform="rotate(90)"
                    >
                      <stop offset="35%" stop-color="#40C79259" />
                      <stop offset="100%" stop-color="#FFFFFF00" />
                    </linearGradient>
                  </defs>
                </SparkLineChart>
              </Box>
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
              minWidth={"300px"}
              maxWidth={"350px"}
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
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "18px",
                        },
                      }}
                    >
                      ۵٬۶۰۰٬۰۰۰٬۰۰۰
                    </Typography>
                    <Chip
                      label="(-55٪)"
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
                        padding: "2px",
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
              <Box
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
                    <linearGradient
                      id="gradiant2"
                      gradientTransform="rotate(90)"
                    >
                      <stop offset="0%" stop-color="#EF5353" />
                      <stop offset="100%" stop-color="#FFFFFF00" />
                    </linearGradient>
                  </defs>
                </SparkLineChart>
              </Box>
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
              minWidth={"300px"}
              maxWidth={"350px"}
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
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "18px",
                        },
                      }}
                    >
                      ۵۳
                    </Typography>
                    <Chip
                      label="(+۵٪)"
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
                        padding: "2px",
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
              <Box
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
                    <linearGradient
                      id="gradiant3"
                      gradientTransform="rotate(90)"
                    >
                      <stop offset="35%" stop-color="#40C79259" />
                      <stop offset="100%" stop-color="#FFFFFF00" />
                    </linearGradient>
                  </defs>
                </SparkLineChart>
              </Box>
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              direction: "rtl",
              height: "230px",

              [theme.breakpoints.down("sm")]: {
                padding: "0 6px",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              disableColumnMenu
              sx={{
                border: 0,
                direction: "rtl",
                "& .MuiDataGrid-columnSeparator": { display: "none" },
                "& .MuiDataGrid-row--borderBottom": {
                  border: "1px solid",
                  borderRadius: "10px",
                  borderColor: theme.palette.grey[400],
                  fontSize: "12px",
                  color: theme.palette.grey[600],
                  height: "40px",

                  [theme.breakpoints.down("sm")]: {
                    border: "none",
                    borderBottom: "1px solid",
                    borderColor: theme.palette.grey[400],
                    borderRadius: "unset",
                  },
                },
                "--DataGrid-rowBorderColor": "unset",
                "& .MuiDataGrid-cell": {
                  textAlign: "center",
                  alignContent: "center",
                  justifyItems: "center",
                },
                "& .MuiDataGrid-columnHeader": {
                  height: "40px !important",
                },
              }}
              autosizeOptions={{ includeHeaders: true }}
              disableColumnSorting
              disableColumnFilter
              hideFooter
              disableColumnResize
            />
          </Box>
        </Box>
      </Paper>
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
                badgeContent={
                  <DoneIcon sx={{ width: "12px", height: "12px" }} />
                }
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
                  src={avatar}
                  width={"51px"}
                  height={"51px"}
                />
              </Badge>

              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={700}
                  color={theme.palette.grey[500]}
                >
                  تیدا گودرزی
                </Typography>
                <Box display={"flex"} gap={"8px"}>
                  <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                    آخرین بازدید{" "}
                  </Typography>
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: "8px",
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  />
                  <Typography
                    fontSize={"12px"}
                    fontWeight={700}
                    color={theme.palette.grey[600]}
                  >
                    ۲۹ دی ماه ۱۴۰۳
                  </Typography>
                </Box>
              </Box>
            </Box>
            <>
              <HtmlTooltip
                title={
                  <Box display={"flex"} flexDirection={"column"} gap={"6px"}>
                    <Box display={"flex"} gap={"2px"}>
                      <Typography
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                        display={"inline"}
                      >
                        وضعیت پرداخت :
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.primary[600]}
                        display={"inline"}
                      >
                        پرداخت قسطی (تسویه شده)
                      </Typography>
                    </Box>
                    <Divider />
                    <Box display={"flex"} gap={"2px"}>
                      <Typography
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                        display={"inline"}
                      >
                        وضعیت اتصال دانشجو به ربات :
                      </Typography>
                      <Typography
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.primary[600]}
                        display={"inline"}
                      >
                        متصل
                      </Typography>
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
            <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
              وضعیت گروپلنسینگ
            </Typography>
            <Chip
              label={"در حال کسب درآمد"}
              variant="outlined"
              sx={{
                display: "flex",
                height: "20px",
                padding: "6px",
                alignItems: "center",
                fontWeight: 600,
                fontSize: "12px",
                color: theme.palette.primary[400],
                bgcolor: theme.palette.primary[50],
                borderColor: theme.palette.primary[200],
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
                <Typography fontSize={"14px"} color={theme.palette.grey[500]}>
                  سطح دانشجو
                </Typography>
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
                      <Typography
                        display={"inline"}
                        fontSize={"18px"}
                        fontWeight={700}
                      >
                        2
                      </Typography>
                      <Typography display={"inline"} fontSize={"10px"}>
                        /
                      </Typography>
                      <Typography display={"inline"} fontSize={"14px"}>
                        10
                      </Typography>
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
                <Typography
                  fontSize={"12px"}
                  color={theme.palette.grey[600]}
                  display={"inline"}
                >
                  سه مرحله باقی مانده تا سطح{" "}
                </Typography>
                <Typography
                  fontSize={"14px"}
                  fontWeight={700}
                  color={theme.palette.grey[600]}
                  display={"inline"}
                >
                  {" "}
                  3
                </Typography>
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
                  value={70}
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
                    <Typography
                      height={"16px"}
                      display={"inline"}
                      fontSize={"12px"}
                    >
                      2
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    position: "absolute",
                    top: "25%",
                    left: "33%",
                  }}
                  fontSize={"12px"}
                  fontWeight={700}
                  color="white"
                >
                  27/30
                </Typography>
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
                  <Typography
                    height={"16px"}
                    display={"inline"}
                    fontSize={"12px"}
                  >
                    3
                  </Typography>
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
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                padding={"18px 15px 0 15px"}
                alignItems={"center"}
              >
                <Typography fontSize={"16px"} color={theme.palette.grey[500]}>
                  درآمد کلی دانشجو
                </Typography>

                <Select
                  value={month}
                  onChange={handleChange}
                  variant="standard"
                  IconComponent={() => <KeyboardArrowDownRoundedIcon />}
                  MenuProps={{
                    sx: {
                      "& .MuiPaper-root": {
                        borderRadius: "10px",
                      },
                      "& .MuiList-root": {
                        padding: "8px 5px !important",
                        gap: "2px !important",
                      },
                      "& .MuiMenuItem-root": {
                        borderRadius: "10px",
                        fontSize: "11px",
                        color: theme.palette.grey[500],
                      },
                    },
                  }}
                  sx={{
                    minWidth: "108px",
                    border: "none",
                    "::before": { border: "none" },
                    ":hover:not(.Mui-disabled, .Mui-error):before": {
                      border: "none",
                    },
                    "::after": { border: "none" },

                    "& .MuiSelect-select": {
                      padding: "0px !important",
                      color: theme.palette.grey[600],
                      fontSize: "12px",
                    },
                    "& .MuiSvgIcon-root": {
                      right: "unset",
                      left: "7px",
                      fill: theme.palette.grey[600],
                      opacity: 0.5,
                      width: "13px",
                      height: "13px",
                    },
                  }}
                  displayEmpty
                >
                  <MenuItem value={1}>۶ ماهه اول سال ۱۴۰۳</MenuItem>
                  <MenuItem value={2}>۶ ماهه دوم سال ۱۴۰۳</MenuItem>
                </Select>
              </Box>

              <LineChart
                colors={[theme.palette.grey[600]]}
                xAxis={[
                  {
                    scaleType: "band",
                    disableLine: true,
                    disableTicks: true,
                    hideTooltip: true,
                    data: [
                      "فروردین",
                      "اردیبهشت",
                      "خرداد",
                      "تیر",
                      "مرداد",
                      "شهریور",
                    ],
                  },
                ]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    valueFormatter: (v) => `${v} میلیون تومان`,
                  },
                ]}
                yAxis={[
                  {
                    disableLine: true,
                    disableTicks: true,
                    valueFormatter: (value) => `${value} $`,
                  },
                ]}
                tooltip={{
                  trigger: "axis",
                }}
                grid={{ horizontal: true }}
                height={321}
                axisHighlight={{
                  x: "band",
                }}
                sx={{
                  [`& .${chartsGridClasses.line}`]: {
                    strokeDasharray: "4 4",
                    strokeWidth: 1,
                  },

                  [theme.breakpoints.up("sm")]: {
                    width: "390px !important",
                  },
                }}
                slotProps={{
                  popper: {
                    sx: {
                      "& .MuiChartsTooltip-paper": {
                        backgroundColor: theme.palette.primary[600],
                        borderRadius: "10px",

                        "& .MuiTypography-root": {
                          color: "white",
                        },
                      },
                      "& .MuiChartsTooltip-mark": {
                        display: "none",
                      },
                    },
                  },
                }}
              />
            </Box>
            <Box
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
            </Box>
          </Box>

          <Box
            display={"flex"}
            gap={"8px"}
            flexDirection={"column"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                padding: "0px 16px",
              },
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                <Typography
                  fontSize={"14px"}
                  display={"inline"}
                  color={theme.palette.grey[600]}
                >
                  1
                </Typography>
                <Typography
                  fontSize={"14px"}
                  display={"inline"}
                  color={theme.palette.grey[500]}
                >
                  تکلیف شماره ۱
                </Typography>
              </Box>
              <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                <Chip
                  label="تایید شده"
                  icon={
                    <ErrorOutlineRoundedIcon
                      sx={{ height: "15px", width: "15px" }}
                    />
                  }
                  color="primary"
                  variant="outlined"
                  sx={{
                    display: "flex",
                    height: "28px",
                    gap: "4px",
                    padding: "6px",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: "12px",
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
                <CustomButton
                  variant="outlined"
                  sx={{
                    height: "24px",
                    maxWidth: "28px",
                    minWidth: "28px",
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  ...
                </CustomButton>
              </Box>
            </Box>
            <Divider />
          </Box>

          <CustomButton
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
          </CustomButton>
        </Box>
      </Drawer>
    </>
  );
};
