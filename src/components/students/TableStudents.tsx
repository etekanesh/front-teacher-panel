import React, { useEffect, useMemo, useState } from "react";
import { 
  Badge, 
  Box, 
  Chip, 
  Typography, 
  useMediaQuery,
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
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import { Message } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("");
  const [selectedGrouplancingStatus, setSelectedGrouplancingStatus] = useState("");
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
      'fullName': 'first_name',
      'currentGrade': 'current_level',
      'studentIncome': 'student_income',
      'groupStatus': 'grouplancing_state',
      'studentStatus': 'current_level_status'
    };
    return fieldMapping[frontendField] || frontendField;
  };

  // Get unique filter options
  const taskStatusOptions = useMemo(() => {
    const uniqueStatuses = [...new Set(studentsListData.map(item => item.process.current_level.status))];
    return uniqueStatuses;
  }, [studentsListData]);

  const grouplancingStatusOptions = useMemo(() => {
    const uniqueStatuses = [...new Set(studentsListData.map(item => item.process.grouplancing_state.state))];
    return uniqueStatuses;
  }, [studentsListData]);

  const currentLevelOptions = useMemo(() => {
    const uniqueLevels = [...new Set(studentsListData.map(item => item.process.current_level.level))];
    return uniqueLevels.sort((a, b) => a - b); // Sort numerically
  }, [studentsListData]);

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
      const backendFieldName = getBackendFieldName(sort.field);
      params.ordering = sort.sort === 'desc' ? `-${backendFieldName}` : backendFieldName;
    }
    
    // Add debounced search query
    if (debouncedSearchQuery.trim()) {
      params.search = debouncedSearchQuery.trim();
    }
    
    // Add filters
    if (selectedTaskStatus) {
      params.current_level_status = selectedTaskStatus;
    }
    
    if (selectedGrouplancingStatus) {
      params.grouplancing_state = selectedGrouplancingStatus;
    }
    
    if (selectedCurrentLevel) {
      params.current_level = selectedCurrentLevel;
    }
    
    fetchStudentsListData(params);
  }, [paginationModel.page, sortModel, debouncedSearchQuery, selectedTaskStatus, selectedGrouplancingStatus, selectedCurrentLevel]);

  // Reset to first page when sorting, search, or filters change
  useEffect(() => {
    if ((sortModel.length > 0 || debouncedSearchQuery || selectedTaskStatus || selectedGrouplancingStatus || selectedCurrentLevel) && paginationModel.page > 0) {
      setPaginationModel(prev => ({ ...prev, page: 0 }));
    }
  }, [sortModel, debouncedSearchQuery, selectedTaskStatus, selectedGrouplancingStatus, selectedCurrentLevel]);

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedTaskStatus("");
    setSelectedGrouplancingStatus("");
    setSelectedCurrentLevel("");
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedTaskStatus || selectedGrouplancingStatus || selectedCurrentLevel;

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

          {/* Task Status Filter */}
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
            <InputLabel>وضعیت تکلیف</InputLabel>
            <Select
              value={selectedTaskStatus}
              onChange={(e) => setSelectedTaskStatus(e.target.value)}
              label="وضعیت تکلیف"
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
              {taskStatusOptions.map((status) => {
                const statusConfig = studentStatusMap[status] || {
                  label: "نامشخص",
                  color: theme.palette.grey[600],
                  bgcolor: theme.palette.grey[100],
                };
                return (
                  <MenuItem key={status} value={status}>
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
                        bgcolor: statusConfig.color,
                        boxShadow: `0 0 6px ${statusConfig.color}40`,
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
                        title={statusConfig.label}
                      >
                        {statusConfig.label}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Grouplancing Status Filter */}
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
            <InputLabel>وضعیت گروپلنسینگ</InputLabel>
            <Select
              value={selectedGrouplancingStatus}
              onChange={(e) => setSelectedGrouplancingStatus(e.target.value)}
              label="وضعیت گروپلنسینگ"
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
              {grouplancingStatusOptions.map((status) => {
                const statusConfig = groupStatusMap[status] || {
                  label: "نامشخص",
                  color: theme.palette.grey[600],
                  bgcolor: theme.palette.grey[100],
                };
                return (
                  <MenuItem key={status} value={status}>
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
                        bgcolor: statusConfig.color,
                        boxShadow: `0 0 6px ${statusConfig.color}40`,
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
                        title={statusConfig.label}
                      >
                        {statusConfig.label}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Current Level Filter */}
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
            <InputLabel>سطح فعلی</InputLabel>
            <Select
              value={selectedCurrentLevel}
              onChange={(e) => setSelectedCurrentLevel(e.target.value)}
              label="سطح فعلی"
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
                    همه سطوح
                  </Typography>
                </Box>
              </MenuItem>
              {currentLevelOptions.map((level) => (
                <MenuItem key={level} value={level}>
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
                      title={level.toString()}
                    >
                      {level.toString()}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Active Filter Chip */}
          {hasActiveFilters && (
            <Chip
              label={`${[searchQuery, selectedTaskStatus, selectedGrouplancingStatus, selectedCurrentLevel].filter(Boolean).length} فیلتر`}
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
