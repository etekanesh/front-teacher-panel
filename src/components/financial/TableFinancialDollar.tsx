import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnMenuProps,
  GridColumnMenuSortItem,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import theme from "theme";
import { useFinancialStore } from "store/useFinancial.store";
import { PersianConvertDate } from "core/utils";
import { CustomPagination, FinancialTableFilterKit } from "uiKit";

export const TableFinancialDollar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const {
    studentsIncomeList,
    totalObjects,
    fetchStudentsIncomeListData,
    fetchingList,
  } = useFinancialStore();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
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
      MonthlyInvoiceDate: "datetime",
      studentName: "student_name",
      teacherContribution: "amount",
      teacherIncome: "teacher_share",
      status: "is_completed",
    };
    return fieldMapping[frontendField] || frontendField;
  };

  const columns: GridColDef[] = [
    {
      field: "number",
      headerName: "شماره درخواست",
      headerAlign: "center",
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
          {/* {params.value.date} */}
        </Typography>
      ),
    },
    {
      field: "studentName",
      headerName: "نام دانشجو",
      headerAlign: "center",
      flex: 1,
      minWidth: 140,
      sortable: true, // Enable sorting for student name
      renderCell: (params: GridRenderCellParams<any>) => (
        <>
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params?.value?.name}
          </Typography>
        </>
      ),
    },
    {
      field: "platform",
      headerName: "پلتفرم",
      headerAlign: "center",
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              component="img"
              src={params?.value?.icon}
              alt="Platform"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: "white",
                padding: 0.5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "2px solid rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "accountConfirmed",
      headerName: "تاریخ ساخت اکانت",
      headerAlign: "center",
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
          {/* {params.value.account_confirmed_date} */}
        </Typography>
      ),
    },
    {
      field: "MonthlyInvoiceDate",
      headerName: "تاریخ ثبت درآمد",
      headerAlign: "center",
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
          {params.value.date}
        </Typography>
      ),
    },

    {
      field: "teacherContribution",
      headerName: "میزان درامد دانشجو",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      sortable: true, // Enable sorting for registered income amount
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params?.value?.amount} دلار
          </Typography>
        </Box>
      ),
    },
    {
      field: "teacherIncome",
      headerName: "سهم مدرس",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      sortable: true, // Enable sorting for teacher income amount
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params?.value?.share} $
          </Typography>
        </Box>
      ),
    },

    {
      field: "status",
      headerName: "وضعیت درخواست",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any>) => (
        <>
          <Chip
            label={
              params.value.text
                ? params.value.step + "تکمیل شده"
                : params.value.step + "تکمیل نشده"
            }
            icon={
              params.value.text ? (
                <CheckCircleOutlineRoundedIcon
                  sx={{ height: "15px", width: "15px" }}
                  color="success"
                />
              ) : (
                <InfoOutlinedIcon
                  sx={{ height: "15px", width: "15px" }}
                  color="warning"
                />
              )
            }
            variant="outlined"
            sx={{
              color: params.value.text
                ? theme.palette.primary[600]
                : theme.palette.warning[500],
              display: "flex",
              height: "26px",
              gap: "4px",
              padding: "0px 8px",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "12px",
              bgcolor: params.value.text
                ? theme.palette.primary[50]
                : theme.palette.warning[600],
              borderColor: params.value.text
                ? theme.palette.primary[200]
                : theme.palette.warning[500],
              "& .MuiChip-icon": {
                margin: 0,
              },
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        </>
      ),
    },
  ];

  const rows = useMemo(
    () =>
      studentsIncomeList.map((item, index) => {
        const amount = item.amount;

        // Debug logging
        console.log("Full item data:", item);
        console.log("Platform detail for item:", item.platform_detail);
        console.log("Platform name:", item.platform_detail?.name);
        console.log("Platform icon URL:", item.platform_detail?.icon);

        return {
          id: index + 1,
          invoiceID: {
            id: index + 1,
          },
          MonthlyInvoiceDate: {
            date: PersianConvertDate(item.datetime, "short"),
          },
          studentName: {
            name: item.student.first_name + " " + item.student.last_name,
          },
          platform: {
            name: item.platform_detail?.name || "نامشخص",
            icon: item.platform_detail?.icon || "",
          },
          teacherContribution: {
            amount: amount.toFixed(0),
          },
          teacherIncome: {
            share: item.teacher_share,
          },
          status: {
            status: 1,
            text: item.is_completed,
            step: item.current_step,
          },
        };
      }),
    [studentsIncomeList, paginationModel.page, paginationModel.pageSize],
  );
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

    // Add status filter
    if (selectedStatus) {
      params.is_completed = selectedStatus;
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

    fetchStudentsIncomeListData(params);
  }, [
    paginationModel.page,
    sortModel,
    debouncedSearchQuery,
    selectedStatus,
    fromDate,
    toDate,
  ]);

  // Reset to first page when sorting, search, or filters change
  useEffect(() => {
    if (
      (sortModel.length > 0 ||
        debouncedSearchQuery ||
        selectedStatus ||
        fromDate ||
        toDate) &&
      paginationModel.page > 0
    ) {
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }
  }, [sortModel, debouncedSearchQuery, selectedStatus, fromDate, toDate]);

  function CustomColumnMenu(props: GridColumnMenuProps) {
    const itemProps = {
      colDef: props.colDef,
      onClick: props.hideMenu,
    };
    return (
      <React.Fragment>
        <Stack px={0.5} py={0.5}>
          <GridColumnMenuSortItem {...itemProps} />
        </Stack>
      </React.Fragment>
    );
  }
  return (
    <>
      <FinancialTableFilterKit
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        triggerSearch={() => setDebouncedSearchQuery(searchQuery)}
      />

      {isMobile ? (
        <Box display={"flex"} flexDirection={"column"}>
          {studentsIncomeList?.map((item, index) => (
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              key={item?.id}
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
                  {PersianConvertDate(item?.datetime)}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  height={"95px"}
                  padding={"0px 16px"}
                >
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      justifyContent="center"
                      mb={1}
                    >
                      <Box
                        component="img"
                        src="https://play-lh.googleusercontent.com/WxEXyqBk_Z2lDMbkwMDWQID6rFg-G1XBNt9UkZnvDeCM_OPO3iTL9XGKeD_pzR3KWc8=s94-rw"
                        alt="Platform"
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          objectFit: "cover",
                          backgroundColor: "white",
                          padding: 0.25,
                          boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                          border: "2px solid rgba(0,0,0,0.1)",
                        }}
                        onLoad={() =>
                          console.log("Mobile test image loaded successfully")
                        }
                        onError={() => {
                          console.log("Mobile test image failed to load");
                        }}
                      />
                    </Box>
                    <Box display={"flex"}>
                      <Typography
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                      >
                        میزان در آمد ثبت شده{" "}
                      </Typography>
                      <Typography
                        fontSize={"14px"}
                        color={theme.palette.grey[600]}
                      >
                        {item?.amount} دلار
                      </Typography>
                    </Box>
                    <Box display={"flex"}>
                      <Typography
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                      >
                        میزان در آمد مدرس از درآمد ثبت شده
                      </Typography>
                      <Typography
                        fontSize={"14px"}
                        color={theme.palette.grey[600]}
                      >
                        10 %
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Tooltip
                  title={item.is_completed}
                  arrow
                  style={{
                    maxWidth: "100px",
                  }}
                >
                  <Chip
                    label={truncateFromFourthChar(
                      item.is_completed
                        ? item?.current_step + "تکمیل شده"
                        : item?.current_step + "تکمیل نشده",
                    )}
                    icon={
                      item.is_completed ? (
                        <CheckCircleOutlineRoundedIcon
                          sx={{ height: "15px", width: "15px" }}
                        />
                      ) : (
                        <InfoOutlinedIcon
                          sx={{ height: "15px", width: "15px" }}
                          color="warning"
                        />
                      )
                    }
                    variant="outlined"
                    sx={{
                      color: item.is_completed
                        ? theme.palette.primary[50]
                        : theme.palette.warning[500],
                      display: "flex",
                      height: "26px",
                      gap: "4px",
                      padding: "0px 8px",
                      alignItems: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                      bgcolor: item.is_completed
                        ? theme.palette.primary[50]
                        : theme.palette.warning[600],
                      borderColor: item.is_completed
                        ? theme.palette.primary[200]
                        : theme.palette.warning[500],
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
                height: "100%",
                overflow: "hidden",
              }}
            >
              <DataGrid
                columns={columns}
                rows={rows}
                // disableColumnMenu
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
                }}
                autosizeOptions={{ includeHeaders: true }}
                disableColumnFilter
                disableColumnResize
                slots={{
                  columnMenu: CustomColumnMenu,
                  pagination: CustomPagination,
                }}
                localeText={{
                  columnMenuSortAsc: "بیشترین",
                  columnMenuSortDesc: "کمترین",
                  columnMenuUnsort: "حذف ترتیب نمایش",
                  columnMenuLabel: "فیلتر",
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
