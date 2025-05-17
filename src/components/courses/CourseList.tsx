import React, { useState } from "react";
import {
    DataGrid,
    GridPaginationModel,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";

import theme from "theme";
import {
    CalendarIcon,
    CustomButton,
    CustomPagination,
    ProfileTickIcons,
    VideoIcon,
} from "uiKit";

const columns = [
    { field: "name", headerName: "نام دوره", flex: 1, minWidth: 200 },
    {
        field: "students",
        headerName: "تعداد دانشجویان",
        flex: 1,
        minWidth: 120,
        renderCell: (params: GridRenderCellParams<any>) => (
            <Box display={"flex"} gap={"2px"} alignItems={"center"} rowGap={"6px"}>
                <Box
                    borderRadius={"50%"}
                    bgcolor={theme.palette.grey[100]}
                    height={25}
                    width={25}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <ProfileTickIcons width={14} height={14} />
                </Box>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                    {params?.value}
                </Typography>
            </Box>
        ),
    },
    {
        field: "videos",
        headerName: "ویدیوهای هر دوره",
        flex: 1,
        minWidth: 120,
        renderCell: (params: GridRenderCellParams<any>) => (
            <Box display={"flex"} gap={"2px"} alignItems={"center"} rowGap={"6px"}>
                <Box
                    borderRadius={"50%"}
                    bgcolor={theme.palette.grey[100]}
                    height={25}
                    width={25}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <VideoIcon width={19} height={19} />
                </Box>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                    {params?.value}
                </Typography>
            </Box>
        ),
    },
    {
        field: "duration",
        headerName: "مدت زمـــــان دوره",
        flex: 1,
        minWidth: 120,
        renderCell: (params: GridRenderCellParams<any>) => (
            <Box display={"flex"} gap={"2px"} alignItems={"center"} rowGap={"6px"}>
                <Box
                    borderRadius={"50%"}
                    bgcolor={theme.palette.grey[100]}
                    height={25}
                    width={25}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <CalendarIcon />
                </Box>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                    {params?.value}
                </Typography>
            </Box>
        ),
    },
    {
        field: "status",
        headerName: "وضعیت دوره",
        flex: 1,
        minWidth: 120,
        renderCell: () => (
            <Chip
                label={"منتشرشده"}
                variant="outlined"
                sx={{
                    display: "flex",
                    height: "20px",
                    padding: "6px",
                    alignItems: "center",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: theme.palette.primary[400],
                    bgcolor: theme.palette.primary[50],
                    borderColor: theme.palette.primary[200],
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
        field: "actions",
        headerName: "جزئیـــــــــات",
        flex: 1,
        minWidth: 140,
        renderCell: () => (
            <CustomButton
                variant="outlined"
                sx={{ height: "26px" }}
                color={"primary"}
            >
                ویرایــــــــش دوره
            </CustomButton>
        ),
    },
];

const rows = [
    {
        id: 1,
        name: "دوره جامع آموزش فریلنسری در پلتفرم فایور",
        students: "۱۲۳ نفر",
        videos: "۹۸ ویدیـــــو",
        duration: "۳۰ ساعت",
        status: "منتشر شــــــده",
    },
    {
        id: 2,
        name: "دوره جامع آموزش فریلنسری در پلتفـرم پرپلـی",
        students: "۱۲۳ نفر",
        videos: "۹۸ ویدیـــــو",
        duration: "۳۰ ساعت",
        status: "منتشر شــــــده",
    },
    {
        id: 3,
        name: "دوره جامع آموزش فریلنسری در پلتفرم آپورک",
        students: "۱۲۳ نفر",
        videos: "۹۸ ویدیـــــو",
        duration: "۳۰ ساعت",
        status: "منتشر شــــــده",
    },
    {
        id: 4,
        name: "دوره جامع آموزش فریلنسری در پلتفرم فایور",
        students: "۱۲۳ نفر",
        videos: "۹۸ ویدیـــــو",
        duration: "۳۰ ساعت",
        status: "منتشر شــــــده",
    },
    {
        id: 5,
        name: "آموزش پرامپت نویسی (prompt) در هوش مصنوعی",
        students: "۱۲۳ نفر",
        videos: "۹۸ ویدیـــــو",
        duration: "۳۰ ساعت",
        status: "منتشر شــــــده",
    },
    {
        id: 6,
        name: "دوره جامع آموزش فریلنسری در پلتفرم فایور",
        students: "۱۲۳ نفر",
        videos: "۹۸ ویدیـــــو",
        duration: "۳۰ ساعت",
        status: "منتشر شــــــده",
    },
];

export const CourseList: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    return (
        <>
            {" "}
            {isMobile ? (
                <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
                    {rows?.map((item) => (
                        <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
                            <Box display={"flex"} flexDirection={"column"}>

                                <Typography fontSize={12} color={theme.palette.grey[600]}>
                                    نام دوره
                                </Typography>
                                <Typography fontSize={14} fontWeight={700}>
                                    {item?.name}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={"4px"} alignItems={"center"}>
                                <Box
                                    borderRadius={"50%"}
                                    bgcolor={theme.palette.grey[100]}
                                    height={25}
                                    width={25}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <ProfileTickIcons width={14} height={14} />
                                </Box>
                                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                                    {item?.students}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={"4px"} alignItems={"center"}>
                                <Box
                                    borderRadius={"50%"}
                                    bgcolor={theme.palette.grey[100]}
                                    height={25}
                                    width={25}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <VideoIcon width={20} height={20} />
                                </Box>
                                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                                    {item?.videos}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={"4px"} alignItems={"center"}>
                                <Box
                                    borderRadius={"50%"}
                                    bgcolor={theme.palette.grey[100]}
                                    height={25}
                                    width={25}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <CalendarIcon width={14} height={14} />
                                </Box>
                                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                                    {item?.videos}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={"4px"} alignItems={"center"}>

                                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                                    وضعیت دوره
                                </Typography>
                                <Chip
                                    label={"منتشرشده"}
                                    variant="outlined"
                                    sx={{
                                        display: "flex",
                                        height: "20px",
                                        padding: "6px",
                                        alignItems: "center",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        color: theme.palette.primary[400],
                                        bgcolor: theme.palette.primary[50],
                                        borderColor: theme.palette.primary[200],
                                        width: "fit-content",
                                        "& .MuiChip-icon": {
                                            margin: 0,
                                        },
                                        "& .MuiChip-label": {
                                            padding: 0,
                                        },
                                    }}
                                />
                            </Box>
                            <CustomButton
                                variant="outlined"
                                sx={{ height: "26px" }}
                                color={"primary"}
                                fullWidth
                            >
                                ویرایــــــــش دوره
                            </CustomButton>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={{ height: 400, width: "100%", direction: "rtl" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableColumnMenu
                        autoHeight
                        sx={{
                            border: 0,
                            direction: "rtl",
                            minHeight: 400,
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
                                textAlign: "right",
                                alignContent: "center",
                                justifyItems: "right",
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
                        autosizeOptions={{ includeHeaders: true }}
                        disableColumnSorting
                        disableColumnFilter
                        disableColumnResize
                        disableRowSelectionOnClick
                        pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        slots={{ pagination: CustomPagination }}
                    />
                </Box>
            )}
        </>
    );
};
