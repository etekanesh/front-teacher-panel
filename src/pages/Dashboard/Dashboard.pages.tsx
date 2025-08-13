import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { GridRenderCellParams } from "@mui/x-data-grid";

import theme from "theme";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "core/types";
import {
  LineChartKit,
  ListIcons,
  MonitorMobileIcons,
  PieChartKit,
  SettingIcon,
} from "uiKit";
import { DrawerStudents, InfoDashboard, TableStudents } from "components";
import { useDashboardStore } from "store/useDashboard.store";
import { PieChartKitDollar } from "uiKit/PieChartKitDollar";
import { LineChartKitDollar } from "uiKit/LineChartKitDollar";
import { useCoursesStore } from "store/useCourses.store";
import { useMessagesStore } from "store/useMessages.store";

export const DashboardPage: React.FC = () => {
  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "داشبورد",
      link: "/teacher/dashboard",
      id: "0",
      color: theme.palette.grey[600],
      active: true,
    },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedCourseUuid, setSelectedCourseUuid] = useState("");
  const [studentData, setStudentData] = useState<GridRenderCellParams>();
  const [changeCharts, setChangesCharts] = useState("rial");

  const { fetchDashOverviewData } = useDashboardStore();
  const { fetchCoursesListData, coursesListData, fetching } = useCoursesStore();
  const { fetchStudentsListMessagesData } = useMessagesStore();

  const openCurrency = Boolean(anchorEl);

  const [open, setOpen] = useState(false);

  const handleOpen = (data: GridRenderCellParams) => {
    setStudentData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseCurrency = () => {
    setAnchorEl(null);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCourseUuid(event.target.value);
    fetchStudentsListMessagesData({ page: 1, courses: event.target.value });
  };

  useEffect(() => {
    fetchDashOverviewData();
    fetchCoursesListData();
  }, []);

  useEffect(() => {
    if (coursesListData?.length) {
      setSelectedCourseUuid(coursesListData[0].uuid);
    }
  }, [coursesListData]);

  return (
    <>
      <HeaderLayout title="داشبورد" breadcrumb={breadcrumbData} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"12px"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            gap: "8px",
            background: "white",
            padding: "14px 10px 65px",
            borderRadius: "20px 20px 0px 0px",
          },
        }}
      >
        <InfoDashboard />

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px",
            [theme.breakpoints.down("sm")]: {
              borderRadius: 0,
              padding: "unset",
            },
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"17px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                gap: "21px",
              },
            }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"23px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "12px",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                  <MonitorMobileIcons />
                  <Typography
                    fontSize={"16px"}
                    fontWeight={700}
                    color={theme.palette.grey[500]}
                  >
                    جزئیات درآمد
                  </Typography>
                </Box>

                <Button
                  id="basic-button"
                  aria-controls={openCurrency ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openCurrency ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ padding: "0px", minWidth: "28px" }}
                >
                  <SettingIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openCurrency}
                  onClose={handleCloseCurrency}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      border: "1px solid ",
                      borderColor: theme.palette.grey[400],
                      borderRadius: "10px",
                      boxShadow: "-12px 0px 67.1px 0px #6B857E17",
                      width: "117px",
                    },
                    "& .MuiPaper-root ul": {
                      gap: "0px !important",
                      paddingBottom: "6px !important",
                      padding: "6px",
                      borderBottom: "none",
                    },
                    "& .MuiPaper-root li": {
                      padding: "5px 6px",
                      borderRadius: "5px",
                      fontSize: "11px",
                      color: theme.palette.grey[600],
                    },
                  }}
                  slotProps={{
                    paper: {
                      elevation: 0,

                      sx: {
                        overflow: "visible",
                        mt: "10px",

                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          left: 23,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => setChangesCharts("dollar")}>
                    دلاری
                  </MenuItem>
                  <MenuItem onClick={() => setChangesCharts("rial")}>
                    ریالی
                  </MenuItem>
                </Menu>
              </Box>
              {changeCharts === "rial" ? (
                <Box
                  display={"flex"}
                  gap={"11px"}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      flexDirection: "column",
                      gap: "19px",
                    },
                  }}
                >
                  <PieChartKit />
                  <LineChartKit />
                </Box>
              ) : (
                <Box
                  display={"flex"}
                  gap={"11px"}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      flexDirection: "column",
                      gap: "19px",
                    },
                  }}
                >
                  <PieChartKitDollar />
                  <LineChartKitDollar />
                </Box>
              )}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"16px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "20px",
                },
              }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    padding: "0 5px",
                  },
                }}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={"10px"}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      gap: "2px",
                    },
                  }}
                >
                  <ListIcons
                    color={theme.palette.primary[600]}
                    width={22}
                    height={22}
                  />
                  <Typography
                    fontSize={16}
                    fontWeight={700}
                    color={theme.palette.grey[500]}
                  >
                    لیست دانشجویان
                  </Typography>
                </Box>
                {!fetching && (
                  <Select
                    value={selectedCourseUuid}
                    onChange={handleChange}
                    variant="standard"
                    displayEmpty
                    IconComponent={() => <KeyboardArrowDownRoundedIcon />}
                    MenuProps={{
                      sx: {
                        "& .MuiPaper-root": {
                          borderRadius: "10px",
                        },
                        "& .MuiList-root": {
                          padding: "8px 5px !important",
                          gap: "2px !important",
                        },
                        "& .MuiMenuItem-root": {
                          borderRadius: "10px",
                          fontSize: "11px",
                          color: theme.palette.grey[500],
                        },
                      },
                    }}
                    sx={{
                      minWidth: "108px",
                      border: "none",
                      "::before": { border: "none" },
                      ":hover:not(.Mui-disabled, .Mui-error):before": {
                        border: "none",
                      },
                      "::after": { border: "none" },
                      "& .MuiSelect-select": {
                        padding: "0px !important",
                        color: theme.palette.grey[600],
                        fontSize: "12px",
                      },
                      "& .MuiSvgIcon-root": {
                        right: "unset",
                        left: "7px",
                        fill: theme.palette.grey[600],
                        opacity: 0.5,
                        width: "13px",
                        height: "13px",
                      },
                    }}
                  >
                    {coursesListData?.map(({ uuid, title }) => (
                      <MenuItem key={uuid} value={uuid}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Box>
              <TableStudents handleOpen={handleOpen} />
              {open && (
                <DrawerStudents
                  open={open}
                  handleClose={handleClose}
                  studentCustomData={studentData}
                />
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
