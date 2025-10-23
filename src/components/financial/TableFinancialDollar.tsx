import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Chip,
    CircularProgress,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    IconButton,
} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import theme from "theme";
import { useFinancialStore } from "store/useFinancial.store";
import { PersianConvertDate } from "core/utils";
import { CustomPagination } from "uiKit";
import "../../styles/datepicker.css";

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
            'MonthlyInvoiceDate': 'datetime',
            'studentName': 'student_name',
            'teacherContribution': 'amount',
            'teacherIncome': 'teacher_share',
            'status': 'is_completed'
        };
        return fieldMapping[frontendField] || frontendField;
    };

    // Get status options for filter dropdown
    const statusOptions = useMemo(() => {
        return [
            { value: true, label: "تکمیل شده" },
            { value: false, label: "تکمیل نشده" }
        ];
    }, []);
    const columns: GridColDef[] = [
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
                                borderRadius: '50%',
                                objectFit: 'cover',
                                backgroundColor: 'white',
                                padding: 0.5,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                border: '2px solid rgba(0,0,0,0.1)',
                            }}
                        />
                    </Box>
                );
            },
        },

        {
            field: "teacherContribution",
            headerName: "میزان در آمد ثبت شده",
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
            headerName: "میزان در آمد مدرس از درآمد ثبت شده ",
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
                console.log('Full item data:', item);
                console.log('Platform detail for item:', item.platform_detail);
                console.log('Platform name:', item.platform_detail?.name);
                console.log('Platform icon URL:', item.platform_detail?.icon);

                return {
                    id: index + 1,
                    invoiceID: {
                        id: index + 1,
                    },
                    MonthlyInvoiceDate: {
                        date: PersianConvertDate(item.datetime),
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
        [studentsIncomeList, paginationModel.page, paginationModel.pageSize]
    );
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
        
        // Add status filter
        if (selectedStatus) {
            params.is_completed = selectedStatus;
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
        
        fetchStudentsIncomeListData(params);
    }, [paginationModel.page, sortModel, debouncedSearchQuery, selectedStatus, fromDate, toDate]);

    // Reset to first page when sorting, search, or filters change
    useEffect(() => {
        if ((sortModel.length > 0 || debouncedSearchQuery || selectedStatus || fromDate || toDate) && paginationModel.page > 0) {
            setPaginationModel(prev => ({ ...prev, page: 0 }));
        }
    }, [sortModel, debouncedSearchQuery, selectedStatus, fromDate, toDate]);

    // Clear all filters function
    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedStatus("");
        setFromDate(null);
        setToDate(null);
    };

    // Check if any filters are active
    const hasActiveFilters = searchQuery || selectedStatus || fromDate || toDate;

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

                    {/* Status Filter */}
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
                        <InputLabel>وضعیت درخواست</InputLabel>
                        <Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            label="وضعیت درخواست"
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
                                        همه وضعیت‌ها
                                    </Typography>
                                </Box>
                            </MenuItem>
                            {statusOptions.map((status) => (
                                <MenuItem key={status.value.toString()} value={status.value.toString()}>
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
                                            bgcolor: status.value ? theme.palette.success.main : theme.palette.warning.main,
                                            boxShadow: `0 0 6px ${status.value ? theme.palette.success.main : theme.palette.warning.main}40`,
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
                                            title={status.label}
                                        >
                                            {status.label}
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
                            label={`${[searchQuery, selectedStatus, fromDate, toDate].filter(Boolean).length} فیلتر`}
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
                                        <Box display={"flex"} alignItems="center" justifyContent="center" mb={1}>
                                            <Box
                                                component="img"
                                                src="https://play-lh.googleusercontent.com/WxEXyqBk_Z2lDMbkwMDWQID6rFg-G1XBNt9UkZnvDeCM_OPO3iTL9XGKeD_pzR3KWc8=s94-rw"
                                                alt="Platform"
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    backgroundColor: 'white',
                                                    padding: 0.25,
                                                    boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                                                    border: '2px solid rgba(0,0,0,0.1)',
                                                }}
                                                onLoad={() => console.log('Mobile test image loaded successfully')}
                                                onError={() => {
                                                    console.log('Mobile test image failed to load');
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
                                                : item?.current_step + "تکمیل نشده"
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
                                overflow: "hidden" ,
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
