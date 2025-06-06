import React, { useMemo, useState } from "react";
import { Badge, Box, Chip, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
// import DoneIcon from "@mui/icons-material/Done";
// import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import NorthRoundedIcon from "@mui/icons-material/NorthRounded";

import theme from "theme";
import { CustomButton, CustomPagination } from "uiKit";
import { useStudentsStore } from "store/useStudents.store";
import { MapStudentsToRows } from "core/utils";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";

type Props = {
  handleOpen: (studentData: GridRenderCellParams) => void;
};

export const TableStudents: React.FC<Props> = ({ handleOpen }) => {
  const { studentsListData } = useStudentsStore();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const rows = useMemo(
    () => MapStudentsToRows(studentsListData),
    [studentsListData]
  );

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
          <PersianTypography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params.id}
          </PersianTypography>
          <Badge
            // badgeContent={
            //   params?.value?.status === 1 ? (
            //     <DoneIcon sx={{ width: "8px", height: "8px" }} />
            //   ) : params?.value?.status === 2 ? (
            //     <PriorityHighRoundedIcon sx={{ width: "8px", height: "8px" }} />
            //   ) : (
            //     <CloseRoundedIcon sx={{ width: "8px", height: "8px" }} />
            //   )
            // }
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
              borderRadius={"50%"}
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
          {/* <Box
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
          </Box> */}
          <Typography fontSize={"14px"}>
            {params?.value?.income}
            {/* تومان */}
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
        <>
          <Box display={"flex"} gap={"4px"}>
            {/* <CustomButton
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
          </CustomButton> */}
            <CustomButton
              onClick={() => handleOpen(params?.row)}
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
        </>
      ),
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     fullName: {
  //       id: 1,
  //       imageSrc: avatar,
  //       fullName: "تیدا گودرزی",
  //       status: 1,
  //     },
  //     currentGrade: {
  //       grade: "سطح ۲",
  //     },
  //     studentIncome: {
  //       income: "۵۰۰٬۰۰۰",
  //       percent: "+25%",
  //     },
  //     groupStatus: {
  //       status: "در حال کسب درآمد",
  //     },
  //     studentStatus: {
  //       status: "تایید شده",
  //     },
  //     action: 1,
  //   },
  //   {
  //     id: 2,
  //     fullName: {
  //       id: 2,
  //       imageSrc: avatar,
  //       fullName: "مرتضی پاک سرشت",
  //       status: 2,
  //     },
  //     currentGrade: {
  //       grade: "سطح ۲",
  //     },
  //     studentIncome: {
  //       income: "۵۰۰٬۰۰۰",
  //       percent: "+25%",
  //     },
  //     groupStatus: {
  //       status: "در حال کسب درآمد",
  //     },
  //     studentStatus: {
  //       status: "تایید شده",
  //     },
  //     action: 1,
  //   },
  //   {
  //     id: 3,
  //     fullName: {
  //       id: 3,
  //       imageSrc: avatar,
  //       fullName: "سپهــــــــر رسولی",
  //       status: 3,
  //     },
  //     currentGrade: {
  //       grade: "سطح ۲",
  //     },
  //     studentIncome: {
  //       income: "۵۰۰٬۰۰۰",
  //       percent: "+25%",
  //     },
  //     groupStatus: {
  //       status: "در حال کسب درآمد",
  //     },
  //     studentStatus: {
  //       status: "تایید شده",
  //     },
  //     action: 1,
  //   },
  // ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      sx={{
        direction: "rtl",
        [theme.breakpoints.down("sm")]: {
          padding: "0 6px",
        },
      }}
    >
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
            justifyItems: "center",
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
        disableRowSelectionOnClick
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{ pagination: CustomPagination }}
      />
    </Box>
  );
};
