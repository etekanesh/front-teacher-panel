import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  chartsGridClasses,
  LineChart,
  pieArcLabelClasses,
  PieChart,
  useDrawingArea,
} from "@mui/x-charts";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  DataGrid,
  GridColDef,
  GridColumnMenuProps,
  GridColumnMenuSortItem,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import { HeaderLayout } from "layouts/header.layout";
import theme from "theme";
import { BreadCrumbsModel } from "types";
import {
  FinanceRequestIcons,
  MonitorMobileIcons,
  PeopleIcons,
  UserMinusIcons,
  UserRemoveIcons,
  UserTickIcons,
} from "uiKit";

export const SalesIncome: React.FC = () => {
  const [income, setIncome] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setIncome(event.target.value);
  };

  const breadcrumbData: BreadCrumbsModel[] = [
    {
      title: "گزارش مالی",
      link: "/financial-reports",
      id: "0",
      color: theme.palette.grey[600],
      active: false,
    },
    {
      title: "جزئیات درآمد فروش",
      link: "/financial-reports/sales-income",
      id: "1",
      color: theme.palette.grey[600],
      active: true,
    },
  ];

  const StyledText = styled("text")(() => ({
    textAnchor: "middle",
    dominantBaseline: "central",
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "invoiceID",
      headerName: "شناسه",
      headerAlign: "center",
      flex: 1,
      minWidth: 70,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
          {params.value.id}
        </Typography>
      ),
    },

    {
      field: "MonthlyInvoiceDate",
      headerName: "تاریخ فاکتور ماهیانه",
      headerAlign: "center",
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.grey[500]}>
          {params.value.date}
        </Typography>
      ),
    },

    {
      field: "salesAmount",
      headerName: "میزان فروش دوره",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Box
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
          </Box>
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params?.value?.amount} میلیون تومان
          </Typography>
        </Box>
      ),
    },

    {
      field: "deductions",
      headerName: "کسورات",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Box
            display={"flex"}
            color={theme.palette.error[500]}
            gap={"2px"}
            alignItems={"center"}
          >
            <SouthRoundedIcon
              sx={{
                width: "10px",
                height: "12px",
                strokeWidth: 2,
                stroke: theme.palette.error[500],
              }}
            />
            <Typography fontSize={"12px"} fontWeight={700}>
              ({params?.value?.percent})
            </Typography>
          </Box>
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params?.value?.amount} میلیون تومان
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
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box display={"flex"} gap={"2px"} alignItems={"center"}>
          <Box
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
          </Box>
          <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
            {params?.value?.amount} میلیون تومان
          </Typography>
        </Box>
      ),
    },

    {
      field: "Status",
      headerName: "وضعیت درخواست",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params.value.text}
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
            padding: "4px",
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
      ),
    },

    {
      field: "invoice",
      headerName: "فاکتور",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params?.value?.invoice}
          variant="outlined"
          sx={{
            display: "flex",
            height: "26px",
            padding: "5px",
            alignItems: "center",
            fontWeight: 500,
            fontSize: "14px",
            color: theme.palette.grey[500],
            borderColor: theme.palette.grey[400],
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
  ];

  const rows = [
    {
      id: 1,
      invoiceID: {
        id: 2547,
      },
      MonthlyInvoiceDate: {
        date: "۲۹ فروردین ماه ۱۴۰۳ ",
      },
      salesAmount: {
        amount: "۵۰۰",
        percent: "+25%",
      },
      deductions: {
        amount: "100",
        percent: "-25%",
      },
      teacherContribution: {
        amount: "100",
        percent: "+25%",
      },
      Status: {
        status: 1,
        text: "انجام شده",
      },
      invoice: {
        invoice: "دانلود فاکتور",
      },
    },
  ];

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

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // شروع از اردیبهشت
  const [currentYear, setCurrentYear] = useState(1403); // شروع از 1403

  const prevMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11; // برگشت به اسفند
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0; // رفتن به فروردین
      }
      return prev + 1;
    });
  };

  return (
    <>
      <HeaderLayout title="گزارش مالی" breadcrumb={breadcrumbData} />
      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            // height: "560px",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px 15px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
            <Box display={"flex"} flexDirection={"column"} gap={"11px"}>
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <MonitorMobileIcons />
                <Typography
                  fontSize={"16px"}
                  fontWeight={700}
                  color={theme.palette.grey[500]}
                >
                  جزئیات درآمد دانشجویان (ریال )
                </Typography>
              </Box>
              <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
                <Box display={"flex"} alignItems={"center"} gap={"11px"}>
                  <Box
                    width={"28px"}
                    height={"28px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"100%"}
                    borderColor={theme.palette.grey[400]}
                    bgcolor={theme.palette.grey[400]}
                  >
                    <PeopleIcons />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} gap={"2px"}>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                      >
                        دانشجویان
                      </Typography>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.grey[600]}
                      >
                        خرید کرده
                      </Typography>
                    </Box>

                    <Typography
                      fontSize={"16px"}
                      color={theme.palette.grey[500]}
                    >
                      ۱۲۳ نفر
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "18px",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                />
                <Box display={"flex"} alignItems={"center"} gap={"11px"}>
                  <Box
                    width={"28px"}
                    height={"28px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"100%"}
                    borderColor={theme.palette.grey[400]}
                    bgcolor={theme.palette.grey[400]}
                  >
                    <UserTickIcons />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} gap={"2px"}>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                      >
                        دانشجویان
                      </Typography>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.grey[600]}
                      >
                        تسویه شده
                      </Typography>
                    </Box>

                    <Typography
                      fontSize={"16px"}
                      color={theme.palette.primary[400]}
                    >
                      ۱۲۳ نفر
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "18px",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                />
                <Box display={"flex"} alignItems={"center"} gap={"11px"}>
                  <Box
                    width={"28px"}
                    height={"28px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"100%"}
                    borderColor={theme.palette.grey[400]}
                    bgcolor={theme.palette.grey[400]}
                  >
                    <UserMinusIcons />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} gap={"2px"}>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                      >
                        دانشجویان
                      </Typography>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.grey[600]}
                      >
                        تسویه نشده
                      </Typography>
                    </Box>

                    <Typography
                      fontSize={"16px"}
                      color={theme.palette.warning[500]}
                    >
                      ۱۲۳ نفر
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "18px",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                />
                <Box display={"flex"} alignItems={"center"} gap={"11px"}>
                  <Box
                    width={"28px"}
                    height={"28px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius={"100%"}
                    borderColor={theme.palette.grey[400]}
                    bgcolor={theme.palette.grey[400]}
                  >
                    <UserRemoveIcons />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box display={"flex"} gap={"2px"}>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        color={theme.palette.grey[600]}
                      >
                        دانشجویان
                      </Typography>
                      <Typography
                        display={"inline"}
                        fontSize={"12px"}
                        fontWeight={700}
                        color={theme.palette.grey[600]}
                      >
                        عودت وجه
                      </Typography>
                    </Box>

                    <Typography
                      fontSize={"16px"}
                      color={theme.palette.error[500]}
                    >
                      ۱۲۳ نفر
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"} gap={"11px"}>
              <Box
                flexGrow={1}
                padding={"23px 17px 17px"}
                border={`1px solid ${theme.palette.grey[400]}`}
                borderRadius={"10px"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <Button
                    onClick={prevMonth}
                    sx={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                      color: theme.palette.grey[600],
                    }}
                  >
                    <KeyboardArrowRight />
                  </Button>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: theme.palette.grey[500],
                    }}
                  >
                    {months[currentMonthIndex]} {currentYear}
                  </span>
                  <Button
                    onClick={nextMonth}
                    sx={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                      color: theme.palette.grey[600],
                    }}
                  >
                    <KeyboardArrowLeft />
                  </Button>
                </Box>
                <Box display={"flex"}>
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: 20,
                            label: "مجموع درامد فروش دوره",
                            color: theme.palette.primary[300],
                          },
                          {
                            id: 1,
                            value: 65,
                            label: "مجموع درامد فروش وبینارها",
                            color: theme.palette.primary[400],
                          },
                          {
                            id: 2,
                            value: 15,
                            label: "سهم مدرس از دانشجویان تسویه شده",
                            color: "#4DB2D2",
                          },
                        ],
                        innerRadius: 70,
                        cornerRadius: 10,
                        paddingAngle: 5,

                        arcLabel: (item) => `${item.value}%`,
                      },
                    ]}
                    width={250}
                    height={400}
                    tooltip={{ trigger: "none" }}
                    slotProps={{
                      legend: {
                        direction: "column",
                        position: { vertical: "bottom", horizontal: "right" },
                        padding: 0,
                      },
                    }}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: "bold",
                        fill: "white",
                      },
                      "& .MuiChartsLegend-series tspan": {
                        fill: theme.palette.grey[600],
                        fontSize: "12px",
                      },
                      "& .MuiChartsLegend-mark": {
                        rx: "50%",
                      },
                    }}
                    margin={{ top: -50, left: 0 }}
                  >
                    <PieCenterLabel>
                      <tspan
                        fontSize={"33px"}
                        fontWeight={700}
                        dy={"-5px"}
                        dx={0}
                        dominantBaseline={"central"}
                        fill={theme.palette.grey[500]}
                      >
                        560
                      </tspan>
                      <tspan
                        fontSize={"11px"}
                        dy={"15px"}
                        dx={50}
                        dominantBaseline={"central"}
                        fill={theme.palette.grey[600]}
                      >
                        میلیون تومان
                      </tspan>
                    </PieCenterLabel>
                  </PieChart>
                </Box>
              </Box>

              <Box
                flexGrow={1}
                sx={{
                  background: theme.palette.grey[400],
                  borderRadius: "10px",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  padding={"18px 15px 0 15px"}
                  alignItems={"center"}
                >
                  <Typography fontSize={"16px"} color={theme.palette.grey[500]}>
                    درآمد کلی مدرس
                  </Typography>

                  <Select
                    value={income}
                    onChange={handleChange}
                    variant="standard"
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
                    displayEmpty
                  >
                    <MenuItem value={1}>درآمد کلی مدرس ماهانه</MenuItem>
                    <MenuItem value={2}>
                      تعداد افرادی که در ماه دوره رو خریدن
                    </MenuItem>
                    <MenuItem value={2}>نمودار درامد از وبینارها </MenuItem>
                  </Select>
                </Box>
                <LineChart
                  colors={[theme.palette.grey[600]]}
                  xAxis={[
                    {
                      scaleType: "band",
                      disableLine: true,
                      disableTicks: true,
                      hideTooltip: true,
                      data: [
                        "فروردین",
                        "اردیبهشت",
                        "خرداد",
                        "تیر",
                        "مرداد",
                        "شهریور",
                        "مهر",
                        "آبان",
                        "آذر",
                        "دی",
                        "بهمن",
                        "اسفند",
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [10, 15, 200, 25, 50, 250, 25, 40, 100, 10, 50, 15],
                      valueFormatter: (v) => `${v} میلیون تومان`,
                    },
                  ]}
                  yAxis={[
                    {
                      disableLine: true,
                      disableTicks: true,
                      valueFormatter: (value) => `${value} میلیون`,
                    },
                  ]}
                  tooltip={{
                    trigger: "axis",
                  }}
                  grid={{ horizontal: true }}
                  // width={594}
                  height={422}
                  axisHighlight={{
                    x: "band",
                  }}
                  sx={{
                    padding: "16px",
                    [`& .${chartsGridClasses.line}`]: {
                      strokeDasharray: "4 4",
                      strokeWidth: 1,
                    },
                  }}
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiChartsTooltip-paper": {
                          backgroundColor: theme.palette.primary[600],
                          borderRadius: "10px",

                          "& .MuiTypography-root": {
                            color: "white",
                          },
                        },
                        "& .MuiChartsTooltip-mark": {
                          display: "none",
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            height: "165px",
            bgcolor: "white",
            borderRadius: "10px",
            padding: "24px 28px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Box display={"flex"} gap={"10px"} alignItems={"c"}>
              <FinanceRequestIcons />
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                درخواست های مالی ( ریال )
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{
                direction: "rtl",
                height: "230px",

                [theme.breakpoints.down("sm")]: {
                  padding: "0 6px",
                },
              }}
            >
              <DataGrid
                columns={columns}
                rows={rows}
                // disableColumnMenu
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
                // disableColumnSorting
                disableColumnFilter
                hideFooter
                disableColumnResize
                slots={{ columnMenu: CustomColumnMenu }}
                localeText={{
                  columnMenuSortAsc: "بیشترین",
                  columnMenuSortDesc: "کمترین",
                  columnMenuUnsort: "حذف ترتیب نمایش",
                  columnMenuLabel: "فیلتر",
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
