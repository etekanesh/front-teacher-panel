import React, { useState } from "react";
import {
    Box,
    Chip,
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
} from "@mui/x-data-grid";
// import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
// import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
// import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import theme from "theme";
import { useFinancialStore } from "store/useFinancial.store";
import { PersianConvertDate } from "core/utils";
import { CustomPagination } from "uiKit";

export const TableFinancialDollar: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const { studentsIncomeList } = useFinancialStore();

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    const truncateFromFourthChar = (text: string, maxChars = 20) => {
        if (text.length <= maxChars) return text;
        return text.slice(0, maxChars) + "…";
    };

    const columns: GridColDef[] = [
        {
            field: "invoiceID",
            headerName: "ردیف",
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

        // {
        //   field: "salesAmount",
        //   headerName: "میزان فروش دوره",
        //   headerAlign: "center",
        //   flex: 1,
        //   minWidth: 150,
        //   disableColumnMenu: true,
        //   sortable: false,
        //   renderCell: (params: GridRenderCellParams<any>) => (
        //     <Box display={"flex"} gap={"2px"} alignItems={"center"}>
        //       <Box
        //         display={"flex"}
        //         color={theme.palette.primary[600]}
        //         gap={"2px "}
        //         alignItems={"center"}
        //       >
        //         <NorthRoundedIcon
        //           sx={{
        //             width: "10px",
        //             height: "12px",
        //             strokeWidth: 2,
        //             stroke: theme.palette.primary[600],
        //           }}
        //         />
        //         <Typography fontSize={"12px"} fontWeight={700}>
        //           ({params?.value?.percent})
        //         </Typography>
        //       </Box>
        //       <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
        //         {params?.value?.amount} میلیون تومان
        //       </Typography>
        //     </Box>
        //   ),
        // },

        // {
        //   field: "deductions",
        //   headerName: "کسورات",
        //   headerAlign: "center",
        //   flex: 1,
        //   minWidth: 150,
        //   disableColumnMenu: true,
        //   sortable: false,
        //   renderCell: (params: GridRenderCellParams<any>) => (
        //     <Box display={"flex"} gap={"2px"} alignItems={"center"}>
        //       <Box
        //         display={"flex"}
        //         color={theme.palette.error[500]}
        //         gap={"2px"}
        //         alignItems={"center"}
        //       >
        //         <SouthRoundedIcon
        //           sx={{
        //             width: "10px",
        //             height: "12px",
        //             strokeWidth: 2,
        //             stroke: theme.palette.error[500],
        //           }}
        //         />
        //         <Typography fontSize={"12px"} fontWeight={700}>
        //           ({params?.value?.percent})
        //         </Typography>
        //       </Box>
        //       <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
        //         {params?.value?.amount} میلیون تومان
        //       </Typography>
        //     </Box>
        //   ),
        // },

        {
            field: "teacherContribution",
            headerName: "میزان درآمد دانشجویان (دلار )",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 150,
            disableColumnMenu: true,
            sortable: false,
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
                    <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
                        {params?.value?.amount} دلار
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
                <>
                    <Chip
                        label={params.value.text ? "انحام شده" : "درحال پیگیری"}
                        icon={
                            params.value.text ? (
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
                            color: params.value.text
                                ? theme.palette.primary[50]
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

        // {
        //   field: "invoice",
        //   headerName: "فاکتور",
        //   headerAlign: "center",
        //   align: "center",
        //   flex: 1,
        //   minWidth: 120,
        //   disableColumnMenu: true,
        //   sortable: false,
        //   renderCell: (params: GridRenderCellParams<any>) => (
        //     <Chip
        //       label={params?.value?.invoice}
        //       variant="outlined"
        //       sx={{
        //         display: "flex",
        //         height: "26px",
        //         borderRadius: "6px",
        //         alignItems: "center",
        //         fontWeight: 500,
        //         fontSize: "14px",
        //         color: theme.palette.grey[500],
        //         borderColor: theme.palette.grey[400],
        //         width: "fit-content",

        //         "& .MuiChip-icon": {
        //           margin: 0,
        //         },
        //       }}
        //     />
        //   ),
        // },
    ];

    // const rows = [
    //   {
    //     id: 1,
    //     invoiceID: {
    //       id: 1,
    //     },
    //     MonthlyInvoiceDate: {
    //       date: "۲۹ فروردین ماه ۱۴۰۳ ",
    //     },
    //     salesAmount: {
    //       amount: "۵۰۰",
    //       percent: "+25%",
    //     },
    //     deductions: {
    //       amount: "100",
    //       percent: "-25%",
    //     },
    //     teacherContribution: {
    //       amount: "100",
    //       percent: "+25%",
    //     },
    //     Status: {
    //       status: 1,
    //       text: "انجام شده",
    //     },
    //     invoice: {
    //       invoice: "دانلود فاکتور",
    //     },
    //   },
    // ];

    const rows = studentsIncomeList.map((item, index) => {
        const amount = item.amount;

        return {
            id: index + 1,
            invoiceID: {
                id: index + 1,
            },
            MonthlyInvoiceDate: {
                date: PersianConvertDate(item.created_datetime),
            },
            // salesAmount: {
            //   amount: (total / 10000).toFixed(0),
            //   percent: "+25%", // if dynamic, calculate based on previous record
            // },
            // deductions: {
            //   amount: (deductions / 10000).toFixed(0),
            //   percent: "-25%",
            // },
            teacherContribution: {
                amount: amount.toFixed(0),
                // percent: "+25%",
            },
            Status: {
                status: 1,
                text: item.is_completed,
            },
        };
    });

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
                                    {PersianConvertDate(item?.created_datetime)}
                                </Typography>
                                {/* <Chip
                  label={"دانلود فاکتور"}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    height: "20px",
                    borderRadius: "6px",
                    alignItems: "center",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: theme.palette.grey[500],
                    borderColor: theme.palette.grey[400],
                    bgcolor: "white",
                    width: "fit-content",

                    "& .MuiChip-icon": {
                      margin: 0,
                    },
                  }}
                /> */}
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
                                    {/* <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                    میزان فروش دوره
                  </Typography>
                  <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                    کسورات
                  </Typography> */}
                                    <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                                        سهم مدرس از فروش
                                    </Typography>
                                </Box>
                                <Box flexDirection={"column"} gap={"2px"}>
                                    {/* <Box display={"flex"} gap={"2px"} alignItems={"center"}>
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
                        (+25%)
                      </Typography>
                    </Box>
                    <Typography
                      fontSize={"14px"}
                      color={theme.palette.grey[600]}
                    >
                      500 میلیون تومان
                    </Typography>
                  </Box> */}

                                    {/* <Box display={"flex"} gap={"2px"} alignItems={"center"}>
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
                        (-25%)
                      </Typography>
                    </Box>
                    <Typography
                      fontSize={"14px"}
                      color={theme.palette.grey[600]}
                    >
                      100 میلیون تومان
                    </Typography>
                  </Box> */}

                                    <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                                        <Box
                                            display={"flex"}
                                            color={theme.palette.primary[600]}
                                            gap={"2px "}
                                            alignItems={"center"}
                                        >
                                            {/* <NorthRoundedIcon
                        sx={{
                          width: "10px",
                          height: "12px",
                          strokeWidth: 2,
                          stroke: theme.palette.primary[600],
                        }}
                      /> */}
                                            {/* <Typography fontSize={"12px"} fontWeight={700}>
                        (+25%)
                      </Typography> */}
                                        </Box>
                                        <Typography
                                            fontSize={"14px"}
                                            color={theme.palette.grey[600]}
                                        >
                                            {item?.amount} دلار
                                        </Typography>
                                    </Box>
                                </Box>
                                <Tooltip title={item.is_completed} arrow>
                                    <Chip
                                        label={truncateFromFourthChar(
                                            item.is_completed ? "انجام شده" : "در حال پیگیری"
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
                <Box
                    display={"flex"}
                    sx={{
                        direction: "rtl",
                        height: "300px",
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
                        disableColumnSorting
                        disableRowSelectionOnClick
                        pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                    />
                </Box>
            )}
        </>
    );
};
