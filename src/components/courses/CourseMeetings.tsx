import React from "react";
import {
  Box,
  Chip,
  Typography,
  useMediaQuery,

} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import theme from "theme";
import {
  CalendarIcon,
  CustomPagination,
  DocumentUploadIcon,
  VideoIcon,
} from "uiKit";

const rows = [
  {
    id: 1,
    number: "۰۱",
    week: "هفته سوم",
    title: "آشنایـــی با پلتفـــــــــرم آپــــورک",
    date: "۲۹ فروردین ماه ۱۴۰۳",
    time: "ســاعت ۱۰:۲۳:۰۰",
    fileName: "mp4.First.video",
    fileSize: "200KB",
    uploaded: false,
    status: "برگزار نشـــــده",
  },
  {
    id: 2,
    number: "۰۲",
    week: "هفته دوم",
    title: "نکـــــاتی در صنعت فریلنســــری",
    date: "۲۹ فروردین ماه ۱۴۰۳",
    time: "ســاعت ۱۰:۲۳:۰۰",
    fileName: "mp4.First.video",
    fileSize: "200KB",
    uploaded: true,
    status: "انجام شده",
  },
  {
    id: 3,
    number: "۰۳",
    week: "هفته اول",
    title: "نحوه ساخت اکانت فیک آبـــــروک برای...",
    date: "۲۹ فروردین ماه ۱۴۰۳",
    time: "ســاعت ۱۰:۲۳:۰۰",
    fileName: "آپلود جلسه ی هفته نهــــم",
    fileSize: "200KB",
    uploaded: false,
    status: "انجام شده",
  },
];

const columns: GridColDef[] = [
  // {
  //   field: "number",
  //   headerName: "",
  //   flex: 0.3,
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography fontWeight="bold">{params.value}</Typography>
  //   ),
  // },
  {
    field: "title",
    headerName: "",
    flex: 1.5,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        display={"flex"}
        flexDirection={"column"}
        textAlign={"right"}
        justifyContent={"flex-start"}
      >
        <Typography fontSize={10} color={theme.palette.grey[600]}>
          {params.row.week}
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={700}
          color={theme.palette.grey[500]}
        >
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "date",
    headerName: "",
    flex: 1.5,
    renderCell: (params: GridRenderCellParams) => (
      <Box display={"flex"} gap={"4px"} alignItems={"center"}>
        <Box
          width={25}
          height={25}
          bgcolor={theme.palette.grey[400]}
          borderRadius={"50%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CalendarIcon />
        </Box>
        <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
          <Typography fontSize={10} color={theme.palette.grey[600]}>
            {params.row.time}
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={700}
            color={theme.palette.grey[500]}
          >
            {params.row.date}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "upload",
    headerName: "",
    flex: 2,
    sortable: false,
    renderCell: (params: GridRenderCellParams) =>
      params.row.uploaded ? (
        <Box
          sx={{
            border: "1px dashed rgba(104, 111, 130, 0.5)",
            width: "100%",
            height: "37px",
            fontSize: "12px",
            borderRadius: "10px",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            gap={"4px"}
            alignItems={"center"}
            padding={"4px"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={theme.palette.grey[400]}
              width={27}
              height={27}
              borderRadius={"50%"}
            >
              <DocumentUploadIcon color="grey" />
            </Box>
            <Typography
              fontSize={12}
              fontWeight={700}
              color={theme.palette.grey[600]}
            >
              آپلود جلسه
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            border: "1px dashed",
            width: "100%",
            height: "37px",
            fontSize: "12px",
            borderRadius: "10px",
            borderColor: theme.palette.primary[600],
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            gap={"4px"}
            alignItems={"center"}
            padding={"4px"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={theme.palette.grey[400]}
              width={27}
              height={27}
              borderRadius={"50%"}
            >
              <VideoIcon
                color={theme.palette.primary[600]}
                width={17}
                height={17}
              />
            </Box>
            <Typography
              fontSize={12}
              fontWeight={700}
              color={theme.palette.primary[600]}
            >
              mp4.First video{" "}
            </Typography>
          </Box>
        </Box>
      ),
  },
  {
    field: "status",
    headerName: "",
    flex: 0.8,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        textAlign={"end"}
        width={"100%"}
      >
        <Chip
          label={params.value}
          variant="outlined"
          sx={{
            fontWeight: "700",
            color:
              params.row.status === "انجام شده"
                ? theme.palette.primary[400]
                : theme.palette.warning[500],
            bgcolor:
              params.row.status === "انجام شده"
                ? theme.palette.primary[50]
                : theme.palette.warning[600],
            borderColor:
              params.row.status === "انجام شده"
                ? theme.palette.primary[200]
                : theme.palette.warning[500],
          }}
        />
      </Box>
    ),
  },
];

export const CourseMeetings: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      {isMobile ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
          m={"0 -10px"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <Typography fontSize={"10px"} color={theme.palette.grey[600]}>
              هفتــــــه نهــــــم{" "}
            </Typography>
            <Typography
              fontSize={"12px"}
              color={theme.palette.grey[500]}
              fontWeight={700}
            >
              پتانسیل درآمدزایـــــــــی دلاری{" "}
            </Typography>
          </Box>

          <Box display={"flex"} gap={"11px"} alignItems={"center"}>
            <Box
              width={25}
              height={25}
              bgcolor={theme.palette.grey[400]}
              borderRadius={"50%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CalendarIcon />
            </Box>
            <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
              <Typography fontSize={10} color={theme.palette.grey[600]}>
                ســــــاعت ۱۰:۲۳:۰۰{" "}
              </Typography>
              <Typography
                fontSize={14}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                ۲۹ فروردین ماه ۱۴۰۳{" "}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} gap={"11px"} alignItems={"center"}>
            <Typography fontSize={12} color={theme.palette.grey[600]}>
              وضعیت جلسه{" "}
            </Typography>
            <Chip
              label={"برگزارشده"}
              variant="outlined"
              sx={{
                fontWeight: "700",
                color: theme.palette.primary[400],
                bgcolor: theme.palette.primary[50],
                borderColor: theme.palette.primary[200],
                fontSize: "12px",
                minWidth: "100px"
              }}
            />
          </Box>
          <Box
            sx={{
              border: "1px dashed rgba(104, 111, 130, 0.5)",
              width: "100%",
              height: "37px",
              fontSize: "12px",
              borderRadius: "10px",
            }}
            display={"flex"}
            textAlign={"center"}
            justifyItems={"center"}
            alignItems={"center"}
            padding={"4px"}
          >

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={theme.palette.grey[400]}
              width={27}
              height={27}
              borderRadius={"50%"}
            >
              <DocumentUploadIcon color="grey" />
            </Box>
            <Typography
              fontSize={12}
              fontWeight={700}
              color={theme.palette.grey[600]}
            >
              آپلود جلسه
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ height: 500, width: "100%", direction: "rtl" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooterSelectedRowCount
            disableColumnMenu
            disableRowSelectionOnClick
            hideFooter={false}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                display: "none",
              },

              fontFamily: "inherit",

              border: 0,
              direction: "rtl",
              "& .MuiDataGrid-row": {
                paddingBottom: "8px",
              },
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
                alignItems: "center",
                justifyContent: "right",
                display: "flex",
              },
              "& .MuiDataGrid-columnHeader": {
                height: "40px !important",
              },
            }}
            slots={{ pagination: CustomPagination }}
          />
        </Box>
      )}
    </>
  );
};
