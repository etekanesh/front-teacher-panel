import React, { useEffect, useMemo, useState } from "react";
import { Badge, Box, Chip, Typography, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";

import theme from "theme";
import {
  CustomButton,
  CustomPagination,
  MessagesMainIcons,
  StudentsTableFilterKit,
} from "uiKit";
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

  const {
    studentsListData,
    totalObjects,
    fetchStudentsListData,
    fetching,
    filterItems,
  } = useStudentsStore();
  const { userData } = useUsersStore();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("");
  const [selectedGrouplancingStatus, setSelectedGrouplancingStatus] =
    useState("");
  const [selectedCurrentLevel, setSelectedCurrentLevel] = useState("");

  // Debounce search query to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Map frontend field names to backend field names
  const getBackendFieldName = (frontendField: string): string => {
    const fieldMapping: { [key: string]: string } = {
      fullName: "first_name",
      currentGrade: "current_level",
      studentIncome: "student_income",
      groupStatus: "kyc_status",
      studentStatus: "current_level_status",
    };
    return fieldMapping[frontendField] || frontendField;
  };

  // Get unique filter options from API response
  const taskStatusOptions = useMemo(() => {
    if (!filterItems?.level_statuses) return [-3, -2, -1, 0, 1, 2];
    return Object.keys(filterItems.level_statuses).map(Number);
  }, [filterItems]);

  const grouplancingStatusOptions = useMemo(() => {
    if (!filterItems?.kyc_statuses) return [-1, 0, 1, 2, 3];
    return Object.keys(filterItems.kyc_statuses).map(Number);
  }, [filterItems]);

  // Get level options from filter_items.max_level
  const levelOptions = useMemo(() => {
    const maxLevel = filterItems?.max_level || 8;
    return Array.from({ length: maxLevel }, (_, i) => i + 1);
  }, [filterItems]);

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
      headerAlign: "left",
      align: "right",
      flex: 1,
      minWidth: isMobile ? 0 : 160,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box
          display={"flex"}
          gap={isMobile ? "2px" : "7px"}
          alignItems={"center"}
          height={"100%"}
          justifySelf={"self-start"}
          padding={0}
        >
          <PersianTypography
            fontSize={"14px"}
            color={theme.palette.grey[600]}
            padding={0}
          >
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
            fontSize={isMobile ? "12px" : "14px"}
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
          label={isMobile ? params?.value?.grade?.split(":")[0] : params?.value?.grade}
          variant="outlined"
          sx={{
            display: "flex",
            height: "20px",
            padding: "6px",
            alignItems: "center",
            fontWeight: 500,
            fontSize: "12px",
            color: theme.palette.grey[600],
            bgcolor: "rgba(104, 111, 130, 0.1)",
            borderColor: "rgba(104, 111, 130, 0.3)",
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
      sortable: true, // Enable sorting for student income amount
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
      headerName: "وضعیت اکانت",
      headerAlign: "center",
      flex: 1,
      minWidth: 120,
      sortable: false,
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
              fontWeight: 500,
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
      sortable: false,
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
              fontWeight: 500,
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
      minWidth: isMobile ? 0 : 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={isMobile ? "1px" : "4px"}>
          <CustomButton
            onClick={() => {
              navigate(
                `/teacher/messages?${userData?.uuid?.replace(/-/g, "") +
                "-" +
                params.row.fullName.uuid.replace(/-/g, "")
                },name=${params.row.fullName.fullName}`
              );
            }}
            sx={{
              height: "24px",
              fontSize: "12px",
              fontWeight: 500,
              width: "fit-Content",
              bgcolor: "#108B62",
              minWidth: "unset",
              padding: "5px",
            }}
          >
            <MessagesMainIcons color="white" />
          </CustomButton>

          <CustomButton
            onClick={() => {
              navigate(`/teacher/students/${params.row.lastLevel}`);
            }}
            variant="outlined"
            sx={{
              height: "24px",
              fontSize: "12px",
              fontWeight: 500,
              maxWidth: "101px",
              minWidth: "unset",
              padding: "5px",

              color: theme.palette.primary[600],
              borderColor: "#EDF0EF",
            }}
          >
            آخرین تکلیف
          </CustomButton>

          <CustomButton
            onClick={() => handleOpen(params?.row)}
            variant="outlined"
            sx={{
              height: "24px",
              maxWidth: "28px",
              minWidth: "28px",
              fontSize: "15px",
              fontWeight: 700,
              color: theme.palette.primary[600],
              borderColor: "#EDF0EF",
            }}
          >
            ...
          </CustomButton>
        </Box>
      ),
    },
  ];

  const mobileColumns = useMemo(() => {
    if (!isMobile) return columns; // برای دسکتاپ همه ستون‌ها
    return columns.filter((col) =>
      ["fullName", "currentGrade", "action"].includes(col.field)
    );
  }, [isMobile, columns]);
  useEffect(() => {
    const params: any = { page: paginationModel.page + 1 };

    if (sortModel.length > 0) {
      const sort = sortModel[0];
      const backendFieldName = getBackendFieldName(sort.field);
      params.ordering =
        sort.sort === "desc" ? `-${backendFieldName}` : backendFieldName;
    }

    // Add debounced search query
    if (debouncedSearchQuery.trim()) {
      params.search = debouncedSearchQuery.trim();
    }

    // Add filters
    if (
      selectedTaskStatus !== "" &&
      selectedTaskStatus !== null &&
      selectedTaskStatus !== undefined
    ) {
      params.current_level_status = selectedTaskStatus;
    }

    if (
      selectedGrouplancingStatus !== "" &&
      selectedGrouplancingStatus !== null &&
      selectedGrouplancingStatus !== undefined
    ) {
      params.kyc_status = selectedGrouplancingStatus;
    }

    if (
      selectedCurrentLevel !== "" &&
      selectedCurrentLevel !== null &&
      selectedCurrentLevel !== undefined
    ) {
      params.current_level = selectedCurrentLevel;
    }

    fetchStudentsListData(params);
  }, [
    paginationModel.page,
    sortModel,
    debouncedSearchQuery,
    selectedTaskStatus,
    selectedGrouplancingStatus,
    selectedCurrentLevel,
  ]);

  // Reset to first page when sorting, search, or filters change
  useEffect(() => {
    if (
      (sortModel.length > 0 ||
        debouncedSearchQuery ||
        selectedTaskStatus ||
        selectedGrouplancingStatus ||
        selectedCurrentLevel) &&
      paginationModel.page > 0
    ) {
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }
  }, [
    sortModel,
    debouncedSearchQuery,
    selectedTaskStatus,
    selectedGrouplancingStatus,
    selectedCurrentLevel,
  ]);

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTaskStatus("");
    setSelectedGrouplancingStatus("");
    setSelectedCurrentLevel("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery ||
    selectedTaskStatus ||
    selectedGrouplancingStatus ||
    selectedCurrentLevel;

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
      gap={"14px"}
    >
      {/* Search and Filters in Single Row */}
      <StudentsTableFilterKit
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTaskStatus={selectedTaskStatus}
        setSelectedTaskStatus={setSelectedTaskStatus}
        selectedGrouplancingStatus={selectedGrouplancingStatus}
        setSelectedGrouplancingStatus={setSelectedGrouplancingStatus}
        selectedCurrentLevel={selectedCurrentLevel}
        setSelectedCurrentLevel={setSelectedCurrentLevel}
        taskStatusOptions={taskStatusOptions}
        grouplancingStatusOptions={grouplancingStatusOptions}
        levelOptions={levelOptions}
        triggerSearch={() => setDebouncedSearchQuery(searchQuery)}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
        filterItems={filterItems}
      />

      <DataGrid
        rows={rows}
        columns={mobileColumns}
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
