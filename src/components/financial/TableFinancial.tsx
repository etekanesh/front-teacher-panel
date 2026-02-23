import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Chip,
  Tooltip,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import theme from "theme";
import { useFinancialStore } from "store/useFinancial.store";
import { PersianConvertDate } from "core/utils";
import { CustomPagination, FinancialTableFilterKit } from "uiKit";

// Create rtl cache - moved inside component to avoid SSR issues

interface FinancialData {
  id: number;
  invoiceID: { id: number };
  auditID: number;
  totalPaid: string;
  MonthlyInvoiceDate: { date: string };
  customerName: string;
  packageName: string;
  teacherContribution: { amount: string };
  groupLancingContribution: { amount: string };
  Status: { status: number; text: string };
  typeLabel: string;
}

export const TableFinancial: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const {
    salesIncomeList,
    totalObjects,
    fetchSalesIncomeListData,
    fetchingList,
    auditFilterItems,
  } = useFinancialStore();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedPackageName, setSelectedPackageName] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);

  // Debounce search query to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const truncateFromFourthChar = (text: string, maxChars = 20) => {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars) + "…";
  };

  // Map frontend field names to backend field names
  const getBackendFieldName = (frontendField: string): string => {
    const fieldMapping: { [key: string]: string } = {
      auditID: "id",
      customerName: "customer_name",
      MonthlyInvoiceDate: "pay_datetime",
      packageName: "package_name",
      groupLancingContribution: "grouplancing_share",
      teacherContribution: "teacher_share",
      typeLabel: "type_label",
      Status: "course_name",
    };
    return fieldMapping[frontendField] || frontendField;
  };

  // Get filter options from API response
  const packageNameOptions = useMemo(() => {
    if (!auditFilterItems?.packages) return [];
    return auditFilterItems.packages.map((pkg) => ({
      title: pkg.package_title,
      uuid: pkg.package_uuid,
    }));
  }, [auditFilterItems]);

  const courseNameOptions = useMemo(() => {
    if (!auditFilterItems?.courses) return [];
    return auditFilterItems.courses.map((course) => ({
      title: course.course_title,
      uuid: course.course_uuid,
    }));
  }, [auditFilterItems]);

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
    if (selectedPackageName) {
      // Find the package UUID from the selected package title
      const selectedPackage = packageNameOptions.find(
        (pkg) => pkg.title === selectedPackageName,
      );
      if (selectedPackage) {
        params.packages = selectedPackage.uuid;
      }
    }

    if (selectedCourseName) {
      // Find the course UUID from the selected course title
      const selectedCourse = courseNameOptions.find(
        (course) => course.title === selectedCourseName,
      );
      if (selectedCourse) {
        params.course_uuid = selectedCourse.uuid;
      }
    }

    // Add date filters
    if (fromDate) {
      // Convert Persian numerals to English numerals and format as YYYY-MM-DD
      const persianDate = fromDate.format("YYYY-MM-DD");
      const englishDate = persianDate.replace(/[۰-۹]/g, (digit: string) =>
        String.fromCharCode(
          digit.charCodeAt(0) - "۰".charCodeAt(0) + "0".charCodeAt(0),
        ),
      );
      params.from_date = englishDate;
    }

    if (toDate) {
      // Convert Persian numerals to English numerals and format as YYYY-MM-DD
      const persianDate = toDate.format("YYYY-MM-DD");
      const englishDate = persianDate.replace(/[۰-۹]/g, (digit: string) =>
        String.fromCharCode(
          digit.charCodeAt(0) - "۰".charCodeAt(0) + "0".charCodeAt(0),
        ),
      );
      params.to_date = englishDate;
    }

    fetchSalesIncomeListData(params);
  }, [
    paginationModel.page,
    sortModel,
    debouncedSearchQuery,
    selectedPackageName,
    selectedCourseName,
    fromDate,
    toDate,
  ]);

  // Reset to first page when sorting, search, or filters change
  useEffect(() => {
    if (
      (sortModel.length > 0 ||
        debouncedSearchQuery ||
        selectedPackageName ||
        selectedCourseName ||
        fromDate ||
        toDate) &&
      paginationModel.page > 0
    ) {
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }
  }, [
    sortModel,
    debouncedSearchQuery,
    selectedPackageName,
    selectedCourseName,
    fromDate,
    toDate,
  ]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "auditID",
        headerName: "شناسه",
        headerAlign: "center",
        flex: 1,
        minWidth: 140,
        renderCell: (params: GridRenderCellParams<any>) => (
          <>
            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
              {params.value}
            </Typography>
          </>
        ),
      },
      {
        field: "customerName",
        headerName: "نام دانشجو",
        headerAlign: "center",
        flex: 1,
        minWidth: 140,
        sortable: false, // Disable sorting for student name
        renderCell: (params: GridRenderCellParams<any>) => (
          <>
            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
              {params.value}
            </Typography>
          </>
        ),
      },
      {
        field: "MonthlyInvoiceDate",
        headerName: "تاریخ خرید",
        headerAlign: "center",
        flex: 1,
        minWidth: 140,
        renderCell: (params: GridRenderCellParams<any>) => (
          <>
            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
              {params.value.date}
            </Typography>
          </>
        ),
      },
      {
        field: "packageName",
        headerName: "نام محصول",
        headerAlign: "center",
        flex: 1,
        minWidth: 140,
        renderCell: (params: GridRenderCellParams<any>) => (
          <>
            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
              {params.value}
            </Typography>
          </>
        ),
      },
      // {
      //   field: "totalPaid",
      //   headerName: "فروش کل",
      //   headerAlign: "center",
      //   flex: 1,
      //   minWidth: 140,
      //   renderCell: (params: GridRenderCellParams<any>) => (
      //     <>
      //       <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
      //         {params?.value} تومان
      //       </Typography>
      //     </>
      //   ),
      // },
      {
        field: "groupLancingContribution",
        headerName: "کسورات",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 150,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <Box display={"flex"} gap={"2px"} alignItems={"center"}>
            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
              {params?.value?.amount} تومان
            </Typography>
          </Box>
        ),
      },
      {
        field: "teacherContribution",
        headerName: "سهم مدرس از فروش",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 150,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => (
          <Box display={"flex"} gap={"2px"} alignItems={"center"}>
            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
              {params?.value?.amount} تومان
            </Typography>
          </Box>
        ),
      },
      {
        field: "typeLabel",
        headerName: "نوع فاکتور",
        headerAlign: "center",
        flex: 1,
        minWidth: 140,
        sortable: true, // Enable sorting for invoice type
        renderCell: (params: GridRenderCellParams<any>) => (
          <Chip
            label={params.value}
            icon={
              <CheckCircleOutlineRoundedIcon
                sx={{ height: "15px", width: "15px" }}
              />
            }
            color="primary"
            variant="outlined"
            sx={{
              color:
                params.value != "فاکتور قسط"
                  ? theme.palette.primary[600]
                  : "#2c3e50",
              display: "flex",
              height: "26px",
              gap: "4px",
              padding: "0px 8px",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "12px",
              bgcolor:
                params.value != "فاکتور قسط"
                  ? theme.palette.primary[50]
                  : "#e8f4f8",
              borderColor:
                params.value != "فاکتور قسط"
                  ? theme.palette.primary[200]
                  : "#b8d4e3",
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
    ],
    [],
  );

  const rows: FinancialData[] = useMemo(
    () =>
      salesIncomeList.map((item, index) => {
        const teacher = item?.shares?.teacher ?? 0;
        const groupLancing = item?.shares?.grouplancing ?? 0;
        const totalPaid = item?.invoice?.total_paid ?? 0;
        console.log(item.id);
        return {
          id: index + 1,
          auditID: item?.id,
          invoiceID: { id: index + 1 },
          totalPaid: totalPaid.toLocaleString("fa"),
          MonthlyInvoiceDate: {
            date: PersianConvertDate(item.invoice.pay_datetime),
          },
          packageName: item?.package?.name,
          customerName: `${item?.customer?.first_name} ${item?.customer?.last_name}`,
          teacherContribution: { amount: teacher.toLocaleString("fa") },
          groupLancingContribution: {
            amount: groupLancing.toLocaleString("fa"),
          },
          Status: { status: 1, text: item.course_name },
          typeLabel: item?.invoice.type_label,
        };
      }),
    [salesIncomeList, paginationModel.page, paginationModel.pageSize],
  );

  return (
    <>
      <FinancialTableFilterKit
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCourseName={setSelectedCourseName}
        selectedCourseName={selectedCourseName}
        fromDate={fromDate}
        courseNameOptions={courseNameOptions}
        packageNameOptions={packageNameOptions}
        setSelectedPackageName={setSelectedPackageName}
        selectedPackageName={selectedPackageName}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        triggerSearch={() => setDebouncedSearchQuery(searchQuery)}
      />

      {isMobile ? (
        <Box display={"flex"} flexDirection={"column"}>
          {salesIncomeList?.map((item, index) => (
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              key={item?.customer?.last_name}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"28px"}
                bgcolor={"#EDF0EF80"}
                padding={"0px 16px"}
              >
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  شناسه {index + 1}
                </Typography>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  {PersianConvertDate(item?.invoice.pay_datetime)}
                </Typography>
              </Box>

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                height={"95px"}
                padding={"0px 16px"}
              >
                <Box flexDirection={"column"} gap={"2px"}>
                  <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                    سهم مدرس از فروش
                  </Typography>
                </Box>
                <Box flexDirection={"column"} gap={"2px"}>
                  <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                    <Box
                      display={"flex"}
                      color={theme.palette.primary[600]}
                      gap={"2px "}
                      alignItems={"center"}
                    ></Box>
                    <Typography
                      fontSize={"14px"}
                      color={theme.palette.grey[600]}
                    >
                      {(item?.shares.teacher / 10000).toFixed(0)} میلیون تومان
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title={item.course_name} arrow>
                  <Chip
                    label={truncateFromFourthChar(item.course_name)}
                    icon={
                      <CheckCircleOutlineRoundedIcon
                        sx={{ height: "15px", width: "15px" }}
                      />
                    }
                    color="primary"
                    variant="outlined"
                    sx={{
                      display: "flex",
                      height: "26px",
                      gap: "4px",
                      padding: "0px 8px",
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
                </Tooltip>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          {fetchingList ? (
            <Box
              display={"flex"}
              sx={{
                direction: "rtl",
                height: "300px",
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              display={"flex"}
              sx={{
                direction: "rtl",
              }}
            >
              <DataGrid
                autoHeight
                columns={columns}
                rows={rows}
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
                disableColumnFilter
                disableColumnResize
                slots={{
                  pagination: CustomPagination,
                }}
                disableColumnMenu
                disableRowSelectionOnClick
                pagination
                paginationMode="server"
                sortingMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
                rowCount={totalObjects}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};
