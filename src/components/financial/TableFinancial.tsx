import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Chip,
  Tooltip,
  Typography,
  useMediaQuery,
  CircularProgress,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import theme from "theme";
import { useFinancialStore } from "store/useFinancial.store";
import { PersianConvertDate } from "core/utils";
import { CustomPagination } from "uiKit";
import "../../styles/datepicker.css";

// Create rtl cache - moved inside component to avoid SSR issues

interface FinancialData {
  id: number;
  invoiceID: { id: number };
  auditID: number ;
  totalPaid: string;
  MonthlyInvoiceDate: { date: string };
  customerName: string;
  packageName: string ;
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
      'auditID': 'id',
      'customerName': 'customer_name',
      'MonthlyInvoiceDate': 'pay_datetime',
      'packageName': 'package_name',
      'groupLancingContribution': 'grouplancing_share',
      'teacherContribution': 'teacher_share',
      'typeLabel': 'type_label',
      'Status': 'course_name'
    };
    return fieldMapping[frontendField] || frontendField;
  };

  // Get filter options from API response
  const packageNameOptions = useMemo(() => {
    if (!auditFilterItems?.packages) return [];
    return auditFilterItems.packages.map(pkg => ({
      title: pkg.package_title,
      uuid: pkg.package_uuid
    }));
  }, [auditFilterItems]);

  const courseNameOptions = useMemo(() => {
    if (!auditFilterItems?.courses) return [];
    return auditFilterItems.courses.map(course => ({
      title: course.course_title,
      uuid: course.course_uuid
    }));
  }, [auditFilterItems]);

  useEffect(() => {
    const params: any = { page: paginationModel.page + 1 };
    
    if (sortModel.length > 0) {
      const sort = sortModel[0];
      const backendFieldName = getBackendFieldName(sort.field);
      params.ordering = sort.sort === 'desc' ? `-${backendFieldName}` : backendFieldName;
    }
    
    // Add debounced search query
    if (debouncedSearchQuery.trim()) {
      params.search = debouncedSearchQuery.trim();
    }
    
    // Add filters
    if (selectedPackageName) {
      // Find the package UUID from the selected package title
      const selectedPackage = packageNameOptions.find(pkg => pkg.title === selectedPackageName);
      if (selectedPackage) {
        params.packages = selectedPackage.uuid;
      }
    }
    
    if (selectedCourseName) {
      // Find the course UUID from the selected course title
      const selectedCourse = courseNameOptions.find(course => course.title === selectedCourseName);
      if (selectedCourse) {
        params.course_uuid = selectedCourse.uuid;
      }
    }
    
    // Add date filters
    if (fromDate) {
      // Convert Persian numerals to English numerals and format as YYYY-MM-DD
      const persianDate = fromDate.format('YYYY-MM-DD');
      const englishDate = persianDate.replace(/[۰-۹]/g, (digit: string) => 
        String.fromCharCode(digit.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0))
      );
      params.from_date = englishDate;
    }
    
    if (toDate) {
      // Convert Persian numerals to English numerals and format as YYYY-MM-DD
      const persianDate = toDate.format('YYYY-MM-DD');
      const englishDate = persianDate.replace(/[۰-۹]/g, (digit: string) => 
        String.fromCharCode(digit.charCodeAt(0) - '۰'.charCodeAt(0) + '0'.charCodeAt(0))
      );
      params.to_date = englishDate;
    }
    
    fetchSalesIncomeListData(params);
  }, [paginationModel.page, sortModel, debouncedSearchQuery, selectedPackageName, selectedCourseName, fromDate, toDate]);

  // Reset to first page when sorting, search, or filters change
  useEffect(() => {
    if ((sortModel.length > 0 || debouncedSearchQuery || selectedPackageName || selectedCourseName || fromDate || toDate) && paginationModel.page > 0) {
      setPaginationModel(prev => ({ ...prev, page: 0 }));
    }
  }, [sortModel, debouncedSearchQuery, selectedPackageName, selectedCourseName, fromDate, toDate]);

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
              color: params.value != "فاکتور قسط"
                  ? theme.palette.primary[600]
                  : "#2c3e50",
              display: "flex",
              height: "26px",
              gap: "4px",
              padding: "0px 8px",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "12px",
              bgcolor: params.value != "فاکتور قسط"
                  ? theme.palette.primary[50]
                  : "#e8f4f8",
              borderColor: params.value != "فاکتور قسط"
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
    []
  );

  const rows: FinancialData[] = useMemo(
    () =>
      salesIncomeList.map((item, index) => {
        const teacher = item.shares.teacher;
        const groupLancing = item.shares.grouplancing;
        const totalPaid = item.invoice.total_paid;
        console.log(item.id);
        return {
          id: index + 1,
          auditID : item?.id,
          invoiceID: { id: index + 1 },
          totalPaid: totalPaid.toLocaleString("fa"),
          MonthlyInvoiceDate: {
            date: PersianConvertDate(item.invoice.pay_datetime),
          },
          packageName : item?.package?.name ,
          customerName: `${item?.customer?.first_name} ${item?.customer?.last_name}`,
          teacherContribution: { amount: teacher.toLocaleString("fa") },
          groupLancingContribution: {
            amount: groupLancing.toLocaleString("fa"),
          },
          Status: { status: 1, text: item.course_name },
          typeLabel: item?.invoice.type_label,
        };
      }),
    [salesIncomeList, paginationModel.page, paginationModel.pageSize]
  );

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPackageName("");
    setSelectedCourseName("");
    setFromDate(null);
    setToDate(null);
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedPackageName || selectedCourseName || fromDate || toDate;

  return (
    <>
      {/* Beautiful Search and Filter Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)'
          }
        }}
      >
          {/* Search and Filters in Single Row */}
          <Stack 
            direction={{ xs: 'column', lg: 'row' }} 
            spacing={3} 
            alignItems={{ xs: 'stretch', lg: 'center' }}
            sx={{ 
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: 2,
              '& > *': {
                flex: '0 0 auto',
                marginBottom: { xs: 1, lg: 0 }
              }
            }}
          >
            {/* Search Input with Arrow Button */}
            <Box sx={{ flex: 1, minWidth: 0, maxWidth: { xs: '100%', lg: '400px' } }}>
              <TextField
                fullWidth
                placeholder="جستجو بر اساس نام دانشجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 20 }} />
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Stack direction="row" spacing={0.5}>
                        {searchQuery && (
                          <IconButton
                            size="small"
                            onClick={() => setSearchQuery("")}
                            sx={{
                              bgcolor: 'rgba(239, 68, 68, 0.1)',
                              color: '#ef4444',
                              '&:hover': {
                                bgcolor: 'rgba(239, 68, 68, 0.2)',
                              }
                            }}
                          >
                            <ClearIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => {
                            // Trigger search immediately
                            setDebouncedSearchQuery(searchQuery);
                          }}
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                              bgcolor: theme.palette.primary.dark,
                              transform: 'scale(1.05)',
                            }
                          }}
                        >
                          <ArrowBackIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'white',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '2px solid transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
                    },
                    '&.Mui-focused': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
                    }
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                    fontSize: '14px',
                    fontWeight: 500,
                  }
                }}
              />
            </Box>

            {/* Package Name Filter */}
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: { xs: '100%', sm: 200 },
                maxWidth: { xs: '100%', sm: 280 },
                width: { xs: '100%', sm: 'auto' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                  '&.Mui-focused': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 0 3px ${theme.palette.primary.main}15`,
                    transform: 'translateY(-1px)',
                  }
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                  color: theme.palette.grey[700],
                  fontSize: '13px',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  }
                },
                '& .MuiSelect-select': {
                  py: 1.2,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.palette.grey[800],
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '250px'
                }
              }}
            >
              <InputLabel>نام محصول</InputLabel>
              <Select
                value={selectedPackageName}
                onChange={(e) => setSelectedPackageName(e.target.value)}
                label="نام محصول"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                      mt: 1,
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        py: 1,
                        px: 2,
                        '&:hover': {
                          bgcolor: 'rgba(25, 118, 210, 0.08)',
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.3 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.grey[400] 
                    }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500} fontSize="13px">
                      همه محصولات
                    </Typography>
                  </Box>
                </MenuItem>
                {packageNameOptions.map((pkg) => (
                  <MenuItem key={pkg.uuid} value={pkg.title}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5, 
                      py: 0.5,
                      width: '100%',
                      minWidth: 0
                    }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.info.main,
                        boxShadow: `0 0 6px ${theme.palette.info.main}40`,
                        flexShrink: 0
                      }} />
                      <Typography 
                        fontWeight={500} 
                        fontSize="13px"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                          lineHeight: 1.4
                        }}
                        title={pkg.title}
                      >
                        {pkg.title}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Course Name Filter */}
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: { xs: '100%', sm: 200 },
                maxWidth: { xs: '100%', sm: 280 },
                width: { xs: '100%', sm: 'auto' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                  '&.Mui-focused': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 0 3px ${theme.palette.primary.main}15`,
                    transform: 'translateY(-1px)',
                  }
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                  color: theme.palette.grey[700],
                  fontSize: '13px',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  }
                },
                '& .MuiSelect-select': {
                  py: 1.2,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.palette.grey[800],
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '250px'
                }
              }}
            >
              <InputLabel>نام دوره</InputLabel>
              <Select
                value={selectedCourseName}
                onChange={(e) => setSelectedCourseName(e.target.value)}
                label="نام دوره"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                      mt: 1,
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        py: 1,
                        px: 2,
                        '&:hover': {
                          bgcolor: 'rgba(25, 118, 210, 0.08)',
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.3 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.grey[400] 
                    }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500} fontSize="13px">
                      همه دوره‌ها
                    </Typography>
                  </Box>
                </MenuItem>
                {courseNameOptions.map((course) => (
                  <MenuItem key={course.uuid} value={course.title}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5, 
                      py: 0.5,
                      width: '100%',
                      minWidth: 0
                    }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.info.main,
                        boxShadow: `0 0 6px ${theme.palette.info.main}40`,
                        flexShrink: 0
                      }} />
                      <Typography 
                        fontWeight={500} 
                        fontSize="13px"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                          lineHeight: 1.4
                        }}
                        title={course.title}
                      >
                        {course.title}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Persian Date Pickers with RTL Support */}
            <Box sx={{ 
              width: { xs: '100%', sm: '180px' },
              flexShrink: 0,
              flexGrow: 0,
              marginTop: 2
            }}>
              <DatePicker
                value={fromDate}
                onChange={(date) => {
                  if (date) {
                    setFromDate(date);
                  }
                }}
                calendar={persian}
                locale={persian_fa}
                inputClass="custom-date-input"
                containerStyle={{
                  width: '100%',
                }}
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)',
                  padding: '0 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.palette.grey[800],
                  fontFamily: 'yekanBakh, Arial, sans-serif',
                }}
                placeholder="از تاریخ"
              />
            </Box>

            <Box sx={{ 
              width: { xs: '100%', sm: '180px' },
              flexShrink: 0,
              flexGrow: 0,
              marginTop: 2
            }}>
              <DatePicker
                value={toDate}
                onChange={(date) => {
                  if (date) {
                    setToDate(date);
                  }
                }}
                calendar={persian}
                locale={persian_fa}
                inputClass="custom-date-input"
                containerStyle={{
                  width: '100%',
                }}
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)',
                  padding: '0 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.palette.grey[800],
                  fontFamily: 'yekanBakh, Arial, sans-serif',
                }}
                placeholder="تا تاریخ"
              />
            </Box>

            {/* Active Filter Chip */}
            {hasActiveFilters && (
              <Chip
                label={`${[searchQuery, selectedPackageName, selectedCourseName, fromDate, toDate].filter(Boolean).length} فیلتر`}
                size="small"
                color="primary"
                variant="filled"
                onDelete={clearAllFilters}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '12px',
                  height: '32px',
                  minWidth: 'fit-content',
                  '& .MuiChip-label': {
                    px: 1.5,
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.2
                  },
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    fontSize: '14px',
                    margin: '0 4px 0 0',
                    padding: '2px',
                    borderRadius: '50%',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.25)',
                      transform: 'scale(1.1)',
                    }
                  },
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                }}
              />
            )}
          </Stack>
      </Paper>

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
