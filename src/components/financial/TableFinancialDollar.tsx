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
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
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
    console.log("studentsIncomeList :>> ", studentsIncomeList);
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
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    {console.log("params :>> ", params)}
                    <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
                        {params?.value?.name}
                    </Typography>
                </>
            ),
        },

        {
            field: "teacherContribution",
            headerName: "میزان در آمد ثبت شده",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 150,
            disableColumnMenu: true,
            sortable: false,
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
            disableColumnMenu: true,
            sortable: false,
            renderCell: () => (
                <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                    <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
                        10 %
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
                        label={
                            params.value.text
                                ? params.value.step + "تکمیل شده"
                                : params.value.step + "تکمیل نشده"
                        }
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
    ];

    const rows = studentsIncomeList.map((item, index) => {
        const amount = item.amount;

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
            teacherContribution: {
                amount: amount.toFixed(0),
            },
            Status: {
                status: 1,
                text: item.is_completed,
                step: item.current_step,
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
                                    {PersianConvertDate(item?.datetime)}
                                </Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    width={"100%"}
                                    height={"95px"}
                                    padding={"0px 16px"}
                                >
                                    <Box display={"flex"} flexDirection={"column"}>
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
                                <Tooltip title={item.is_completed} arrow style={{
                                    maxWidth: "100px"
                                }}>
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
