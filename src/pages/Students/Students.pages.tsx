import React from "react";
import { Badge, Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";

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
import Image from "../../assets/chart.png";
import Image2 from "../../assets/chart2.png";
import avatar from "../../assets/avatar-Image.png";

const StudentsPage: React.FC = () => {
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
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Box
            display={"flex"}
            color={theme.palette.primary[600]}
            gap={"2px "}
            alignItems={"center"}
          >
            <NorthRoundedIcon sx={{ width: "10px", height: "12px" }} />
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
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"4px"}>
          <CustomButton>پیام به دانشجو</CustomButton>
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
          borderRadius: "10px",
          bgcolor: "white",
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
          <Box display={"flex"} flex={1}>
            <SearchInput />
          </Box>
        </Paper>

        <Box display={"flex"} p={"28px"} flexDirection={"column"} gap={"40px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={"10px"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              flex={1}
              justifyContent={"space-between"}
              maxWidth={"300px"}
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
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
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
              >
                <Box component={"img"} src={Image} />
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              flex={1}
              justifyContent={"space-between"}
              maxWidth={"300px"}
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
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
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
                      color={"warning"}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        height: "13px",
                        gap: "3px",
                        padding: "2px",
                        alignItems: "center",
                        fontWeight: 600,
                        fontSize: "8px",
                        bgcolor: theme.palette.warning[50],
                        borderColor: theme.palette.warning[200],
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
                maxWidth={"100%"}
                minWidth={"30%"}
                display={"flex"}
                justifyContent={"center"}
              >
                <Box component={"img"} src={Image2} />
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              flex={1}
              justifyContent={"space-between"}
              maxWidth={"300px"}
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
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
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
                maxWidth={"100%"}
                minWidth={"30%"}
                display={"flex"}
                justifyContent={"center"}
              >
                <Box component={"img"} src={Image} />
              </Box>
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ direction: "rtl", height: "350px", width: "100%" }}
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
    </>
  );
};

export default StudentsPage;
