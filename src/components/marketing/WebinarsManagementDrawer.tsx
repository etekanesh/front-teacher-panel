import React from "react";
import { Box, Chip, Drawer, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import theme from "theme";
import MarketingImage from "assets/markting.png";
import {
  ClipboardTextIcon,
  CustomPagination,
  ListIcons,
  PeopleIcons,
} from "uiKit";

type Props = {
  open: boolean;
  setOpen: (item: boolean) => void;
};
export const WebinarsManagementDrawer: React.FC<Props> = ({
  open,
  setOpen,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const columns = [
    {
      field: "fullName",
      headerName: "نام و نام خانوادگی",
      flex: 1,
      minWidth: isMobile ? 110 : 120,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography
          fontSize={isMobile ? "12px" : "14px"}
          color={theme.palette.grey[500]}
        >
          {params.value.name}
        </Typography>
      ),
    },
    {
      field: "amount",
      headerName: "مبلغ پرداختی",
      flex: 1,
      minWidth: isMobile ? 90 : 120,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography
          fontSize={isMobile ? "12px" : "14px"}
          color={theme.palette.grey[600]}
        >
          {params.value.amount}
        </Typography>
      ),
    },
    {
      field: "teacherContribution",
      headerName: "سهم مدرس",
      flex: 1,
      minWidth: isMobile ? 90 : 120,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography
          fontSize={isMobile ? "12px" : "14px"}
          color={theme.palette.primary[600]}
        >
          {params.value.amount}
        </Typography>
      ),
    },

    {
      field: "status",
      headerName: "وضعیت پرداخت",
      flex: 1,
      minWidth: isMobile ? 90 : 100,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params.value.status}
          variant="outlined"
          sx={{
            display: "flex",
            height: "20px",
            padding: "0 6px",
            alignItems: "center",
            fontWeight: 500,
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
  ];

  const rows = [
    {
      id: 1,
      fullName: {
        name: "تیـــــــــــدا گودرزی",
      },
      amount: {
        amount: "۲٬۵۰۰٬۰۰۰  تومان",
      },
      teacherContribution: {
        amount: "۲۵۰٬۰۰۰ تومان",
      },
      status: {
        status: "تسویه شده",
      },
    },
    {
      id: 2,
      fullName: {
        name: "مرتضی پاک سرشت",
      },
      amount: {
        amount: "۲٬۵۰۰٬۰۰۰  تومان",
      },
      teacherContribution: {
        amount: "۲۵۰٬۰۰۰ تومان",
      },
      status: {
        status: "تسویه شده",
      },
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
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
        display={"flex"}
        flexDirection={"column"}
        gap={"18px"}
        p={"20px"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            padding: "20px 15px",
            gap: "13px",
          },
        }}
      >
        <Box
          component={"img"}
          borderRadius={"15px"}
          width={isMobile ? "100%" : "398px"}
          height={"221px"}
          src={MarketingImage}
        />
        <Box display={"flex"} flexDirection={"column"} gap={"6px"}>
          <Typography
            fontSize={"16px"}
            fontWeight={"700"}
            color={theme.palette.grey[500]}
          >
            واقعیت ها و پشت پرده های درآمد از پلتفرم های فریلنسری
          </Typography>
          <Chip
            label={
              "چالش های ساخت اکانت +  بررسی درآمد   + انتقال درآمد به ایران"
            }
            sx={{
              height: "24px",
              width: "325px",
              padding: "0px 32px",
              alignItems: "center",
              fontWeight: 500,
              fontSize: "12px",
              color: theme.palette.grey[600],
              border: "none",
              bgcolor: theme.palette.grey[400],

              "& .MuiChip-icon": {
                margin: 0,
              },
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        </Box>
        <Box gap={"5px"} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} gap={"5px"} alignItems={"center"}>
            <ListIcons />
            <Typography
              fontSize={"14px"}
              fontWeight={700}
              color={theme.palette.grey[600]}
            >
              ۲۰۰ نفر شرکت کننده
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={"5px"} alignItems={"center"}>
              <ClipboardTextIcon />
              <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
                تعداد فرم های پر شده از وبینار
              </Typography>
            </Box>
            <Typography
              fontSize={"14px"}
              fontWeight={700}
              color={theme.palette.grey[500]}
            >
              ۲۰۰ فرم پرشده
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={"5px"} alignItems={"center"}>
              <PeopleIcons />
              <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
                تعداد کل خریدها
              </Typography>
            </Box>
            <Typography
              fontSize={"14px"}
              fontWeight={700}
              color={theme.palette.grey[500]}
            >
              ۲۰۰ نفــــــــــر
            </Typography>
          </Box>
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
          disableColumnSorting
          disableColumnFilter
          disableColumnResize
          pagination
          // paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          slots={{ pagination: CustomPagination }}
        />
      </Box>
    </Drawer>
  );
};
