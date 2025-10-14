import React, { useEffect, useMemo, useState } from "react";
import { Badge, Box, Chip, Typography, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import { Message } from "@mui/icons-material";
// import DoneIcon from "@mui/icons-material/Done";
// import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import NorthRoundedIcon from "@mui/icons-material/NorthRounded";

import theme from "theme";
import { CustomButton, CustomPagination, DocumentIcon } from "uiKit";
import { useNavigate } from "react-router-dom";
import { useStudentsStore } from "store/useStudents.store";
import {
  groupStatusMap,
  MapStudentsToRows,
  studentStatusMap,
} from "core/utils";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { useUsersStore } from "store/useUsers.store";

type Props = {
  handleOpen: (studentData: GridRenderCellParams) => void;
};

export const TableStudents: React.FC<Props> = ({ handleOpen }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  const { studentsListData, totalObjects, fetchStudentsListData, fetching } =
    useStudentsStore();
  const { userData } = useUsersStore();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // Map frontend field names to backend field names
  const getBackendFieldName = (frontendField: string): string => {
    const fieldMapping: { [key: string]: string } = {
      'fullName': 'first_name',
      'currentGrade': 'grade',
      'studentIncome': 'income',
      'groupStatus': 'group_status',
      'studentStatus': 'student_status'
    };
    return fieldMapping[frontendField] || frontendField;
  };

  const rows = useMemo(
    () =>
      MapStudentsToRows(
        studentsListData,
        paginationModel.page,
        paginationModel.pageSize
      ),
    [studentsListData, paginationModel.page, paginationModel.pageSize]
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
                : params?.value?.status === -1
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
      renderCell: (params: GridRenderCellParams<any>) => {
        const statusValue = params?.value?.status;
        const statusConfig = groupStatusMap[statusValue] || {
          label: "نامشخص",
          color: theme.palette.grey[600] || "#757575",
          bgcolor: theme.palette.grey[100] || "#f5f5f5",
          borderColor: theme.palette.grey[300] || "#e0e0e0",
        };

        return (
          <Chip
            label={statusConfig.label}
            variant="outlined"
            sx={{
              display: "flex",
              height: "20px",
              padding: "6px",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "12px",
              color: statusConfig.color,
              bgcolor: statusConfig.bgcolor,
              borderColor: statusConfig.borderColor,
              width: "fit-content",
              "& .MuiChip-icon": {
                margin: 0,
              },
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        );
      },
    },
    {
      field: "studentStatus",
      headerName: "وضعیت تکلیف دانشجو",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<any>) => {
        const statusValue = params?.value?.status;
        const statusConfig = studentStatusMap[statusValue] || {
          label: "نامشخص",
          color: theme.palette.grey[600] || "#757575",
          bgcolor: theme.palette.grey[100] || "#f5f5f5",
          borderColor: theme.palette.grey[300] || "#e0e0e0",
        };

        return (
          <Chip
            label={statusConfig.label}
            variant="outlined"
            sx={{
              display: "flex",
              height: "20px",
              padding: "6px",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "12px",
              color: statusConfig.color,
              bgcolor: statusConfig.bgcolor,
              borderColor: statusConfig.borderColor,
              width: "fit-content",
              "& .MuiChip-icon": {
                margin: 0,
              },
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "جزئیـــــــــات",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"4px"}>
          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
              onClick={() => {
                navigate(
                  `/teacher/messages?${userData?.uuid?.replace(/-/g, "") +
                  "-" +
                  params.row.fullName.uuid.replace(/-/g, "")
                  },name=${params.row.fullName.fullName}`
                );
              }}
            >
              <Message color="primary" />
            </div>
          ) : (
            <CustomButton
              onClick={() => {
                navigate(
                  `/teacher/messages?${userData?.uuid?.replace(/-/g, "") +
                  "-" +
                  params.row.fullName.uuid.replace(/-/g, "")
                  },name=${params.row.fullName.fullName}`
                );
              }}
              color="primary"
              sx={{
                height: "24px",
                fontSize: "12px",
                fontWeight: 500,
                maxWidth: "101px",
              }}
            >
              ارسال پیام
            </CustomButton>
          )}
          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
              onClick={() => {
                navigate(`/teacher/students/${params.row.lastLevel}`);
              }}
            >
              <DocumentIcon />
            </div>
          ) : (
            <CustomButton
              onClick={() => {
                navigate(`/teacher/students/${params.row.lastLevel}`);
              }}
              sx={{
                height: "24px",
                fontSize: "12px",
                fontWeight: 500,
                backgroundColor: theme.palette.secondary[600],
                maxWidth: "101px",
              }}
            >
              آخرین تکلیف
            </CustomButton>
          )}

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
      ),
    },
  ];

  useEffect(() => {
    const params: any = { page: paginationModel.page + 1 };
    
    if (sortModel.length > 0) {
      const sort = sortModel[0];
      params.sort_by = getBackendFieldName(sort.field);
      params.sort_order = sort.sort;
    }
    
    fetchStudentsListData(params);
  }, [paginationModel.page, sortModel]);

  // Reset to first page when sorting changes
  useEffect(() => {
    if (sortModel.length > 0 && paginationModel.page > 0) {
      setPaginationModel(prev => ({ ...prev, page: 0 }));
    }
  }, [sortModel]);

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
        rowCount={totalObjects}
        loading={fetching}
        disableColumnMenu
        autoHeight
        autosizeOptions={{ includeHeaders: true }}
        disableColumnFilter
        disableColumnResize
        disableRowSelectionOnClick
        pagination
        paginationMode="server"
        sortingMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        slots={{
          pagination: CustomPagination,
        }}
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
      />
    </Box>
  );
};
