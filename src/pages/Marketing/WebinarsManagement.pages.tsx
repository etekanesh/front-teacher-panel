import React, { useEffect, useState } from "react";
import { Box, Chip, Paper, Typography, useMediaQuery } from "@mui/material";
// import { SparkLineChart } from "@mui/x-charts";
import { DataGrid, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";

import { BreadCrumbsModel } from "core/types";
import { HeaderLayout } from "layouts/header.layout";
import theme from "theme";
import {
  ChartMarketingIcon,
  CustomButton,
  CustomPagination,
  MarketingWebinarIcons,
} from "uiKit";
import { WebinarsManagementDrawer } from "components/marketing";
import { useMarketingStore } from "store/useMarketing.store";
import { PersianConvertDate } from "core/utils";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";

const breadcrumbData: BreadCrumbsModel[] = [
  {
    title: "فروش و مارکتینگ",
    link: "/teacher/marketing",
    id: "0",
    color: theme.palette.grey[600],
    active: false,
  },
  {
    title: "مدیریت وبینارها",
    link: "/teacher/marketing/webinars-management",
    id: "1",
    color: theme.palette.grey[600],
    active: true,
  },
];

export const WebinarsManagementPages: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const [open, setOpen] = useState(false);

  const {
    fetching,
    fetchWebinarsHeldData,
    webinarsHeldData,
    fetchWebinarsHeldDetailData,
  } = useMarketingStore();

  const handleOpenDrawer = (webinarId: string, webinarDate: string) => {
    setOpen(true);
    const date = new Date(webinarDate);
    const formatted = date.toISOString().split("T")[0];
    fetchWebinarsHeldDetailData(webinarId, formatted);
  };

  useEffect(() => {
    fetchWebinarsHeldData();
  }, []);

  const columns = [
    {
      field: "webinar",
      headerName: "وبینار ها",
      flex: 1,
      minWidth: isMobile ? 200 : 300,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography
          textAlign={"right"}
          fontSize={isMobile ? "12px" : "14px"}
          color={theme.palette.grey[500]}
        >
          {params.value.webinar}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "تاریخ و ساعت برگزاری",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"11px"} alignItems={"center"}>
          <Box
            borderRadius={"50%"}
            bgcolor={theme.palette.grey[400]}
            height={25}
            width={25}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ChartMarketingIcon />
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"10px"}
              fontWeight={700}
              color={theme.palette.grey[600]}
            >
              ساعت
              {params.value.time}
            </Typography>
            <PersianTypography
              fontSize={"12px"}
              color={theme.palette.grey[500]}
            >
              {params.value.date}
            </PersianTypography>
          </Box>
        </Box>
      ),
    },

    {
      field: "status",
      headerName: "وضعیت وبینار",
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={
            params.value.status === "completed" ? "برگزار شده" : "در انتظار"
          }
          variant="outlined"
          sx={{
            display: "flex",
            height: "20px",
            padding: "0 6px",
            alignItems: "center",
            fontWeight: 500,
            fontSize: "12px",
            color:
              params.value.status === "completed"
                ? theme.palette.primary[400]
                : theme.palette.warning[500],
            bgcolor:
              params.value.status === "completed"
                ? theme.palette.primary[50]
                : theme.palette.warning[600],
            borderColor:
              params.value.status === "completed"
                ? theme.palette.primary[200]
                : theme.palette.warning[500],
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
      field: "convert",
      headerName: "نرخ تبدیل مدرس از حاضرین به فروش",
      flex: 1,
      minWidth: isMobile ? 200 : 300,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"12px"} alignItems={"center"}>
          <Box display={"flex"} gap={"4px"} alignItems={"center"}>
            <PersianTypography
              fontSize={"12px"}
              color={theme.palette.primary[600]}
            >
              ({params?.value?.percent ?? " "})
            </PersianTypography>
            <PersianTypography
              fontSize={"12px"}
              fontWeight={700}
              color={theme.palette.grey[600]}
            >
              {params.value.text}
            </PersianTypography>
          </Box>
          {/* <Box display={"flex"} justifyContent={"center"} alignItems={"center"}> */}
          {/* <NorthRoundedIcon
              sx={{
                width: "12px",
                height: "12px",
                strokeWidth: 1,
                stroke: theme.palette.primary[400],
                color: theme.palette.primary[400],
              }}
            />{" "} */}
          {/* <SparkLineChart
              width={100}
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
            </SparkLineChart> */}
          {/* </Box> */}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      minWidth: 50,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"12px"} alignItems={"center"}>
          <CustomButton
            onClick={() =>
              handleOpenDrawer(params.value.webinarId, params.value.webinarDate)
            }
            variant="outlined"
            color="primary"
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

  const rows = webinarsHeldData.map((item, index) => {
    const dateObj = new Date(item.date);
    return {
      id: index,
      webinar: { webinar: item.title },
      date: {
        time: dateObj.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: PersianConvertDate(item?.date),
      },
      status: {
        status: item.status,
      },
      convert: {
        percent: `${item.rate}`,
        text: `${item.participants} شرکت‌کننده`,
      },
      action: {
        webinarId: `${item.uuid}`,
        webinarDate: `${item.date}`,
      },
    };
  });

  return (
    <>
      <HeaderLayout title="فروش و مارکتینگ" breadcrumb={breadcrumbData} />

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: "10px",
          padding: "24px 28px",
          [theme.breakpoints.down("sm")]: {
            padding: "15px 10px 18px",
            border: "none",
            borderRadius: "unset",
          },
        }}
      >
        {!fetching && (
          <Box display={"flex"} flexDirection={"column"} gap={"25px"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <MarketingWebinarIcons />
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                مدیریت وبینــــــارها
              </Typography>
            </Box>

            <DataGrid
              rows={rows}
              columns={columns}
              disableColumnMenu
              autoHeight
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
                },
                "& .MuiDataGrid-columnHeader": {
                  height: "40px !important",
                },
                "& .MuiDataGrid-virtualScroller": {
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                },
              }}
              autosizeOptions={{ includeHeaders: true }}
              disableColumnFilter
              disableColumnResize
              disableRowSelectionOnClick
              disableColumnSelector
              disableMultipleRowSelection
              pagination
              sortModel={sortModel}
              onSortModelChange={setSortModel}
              // paginationModel={paginationModel}
              // onPaginationModelChange={setPaginationModel}
              slots={{ pagination: CustomPagination }}
            />
          </Box>
        )}
      </Paper>
      <WebinarsManagementDrawer open={open} setOpen={setOpen} />
    </>
  );
};
