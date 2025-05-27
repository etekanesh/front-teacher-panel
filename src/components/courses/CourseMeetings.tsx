import React, { useEffect, useState } from "react";
import { Box, Chip, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import theme from "theme";
import {
  CalendarIcon,
  CustomPagination,
  DocumentUploadIcon,
  VideoIcon,
} from "uiKit";
import { useCoursesStore } from "store/useCourses.store";
import { PersianConvertDate } from "core/utils";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { Link } from "react-router-dom";

const generateWeek = (index: number) =>
  `هفته ${["اول", "دوم", "سوم", "چهارم"][index % 4]}`;

export const CourseMeetings: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [rows, setRows] = useState([]);

  const { fetchCoursesMeetingsData, fetching, coursesMeetingsData } =
    useCoursesStore();

  const nowDate = (meetDate: string) => {
    const date = new Date(meetDate);
    const now = new Date();
    return date < now ? "برگزار شده" : "برگزار نشـــــده";
  };

  useEffect(() => {
    const mapped: any = coursesMeetingsData.map((item, index) => {
      const date = new Date(item?.meeting_datetime);
      const now = new Date();
      return {
        id: item?.meeting_datetime,
        number: String(index + 1).padStart(2, "0"),
        week: generateWeek(index),
        title: item.course.title,
        date: PersianConvertDate(item?.meeting_datetime),
        time: item?.meeting_datetime?.split("T")[1]?.split(".")[0],
        fileName: item?.meet_link,
        uploaded: item.is_notified,
        status: date < now ? "برگزار شده" : "برگزار نشـــــده",
      };
    });
    setRows(mapped);
  }, [fetching]);

  useEffect(() => {
    fetchCoursesMeetingsData();
  }, []);

  const columns: GridColDef[] = [
    // {
    //   field: "number",
    //   headerName: "",
    //   flex: 0.3,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <Typography fontWeight="bold">{params.value}</Typography>
    //   ),
    // },
    {
      field: "title",
      headerName: "",
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          display={"flex"}
          flexDirection={"column"}
          textAlign={"right"}
          justifyContent={"flex-start"}
        >
          {/* <Typography fontSize={10} color={theme.palette.grey[600]}>
            {params.row.week}
          </Typography> */}
          <Typography
            fontSize={14}
            fontWeight={700}
            color={theme.palette.grey[500]}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "date",
      headerName: "",
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <Box display={"flex"} gap={"4px"} alignItems={"center"}>
          <Box
            width={25}
            height={25}
            bgcolor={theme.palette.grey[400]}
            borderRadius={"50%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CalendarIcon />
          </Box>
          <Box display={"flex"} flexDirection={"column"} textAlign={"right"}>
            <PersianTypography fontSize={10} color={theme.palette.grey[600]}>
              ساعت :{params.row.time}{" "}
            </PersianTypography>
            <Typography
              fontSize={14}
              fontWeight={700}
              color={theme.palette.grey[500]}
            >
              {params.row.date}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "uploaded",
      headerName: "",
      flex: 2,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.row.uploaded ? (
          <Box
            sx={{
              border: "1px dashed",
              width: "100%",
              height: "37px",
              fontSize: "12px",
              borderRadius: "10px",
              borderColor: theme.palette.primary[600],
            }}
            display={"flex"}
            justifyContent={"space-between"}
            overflow={"hidden"}
          >
            <Tooltip title={"ورود به جلسه"} arrow>
              <Link
                to={params.row.fileName}
                target="_blank"
                style={{ cursor: "pointer" }}
              >
                <Box
                  display={"flex"}
                  gap={"4px"}
                  alignItems={"center"}
                  padding={"4px"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bgcolor={theme.palette.grey[400]}
                    width={27}
                    height={27}
                    borderRadius={"50%"}
                  >
                    <VideoIcon
                      color={theme.palette.primary[600]}
                      width={17}
                      height={17}
                    />
                  </Box>
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    color={theme.palette.primary[600]}
                  >
                    {params.row.fileName}
                  </Typography>
                </Box>
              </Link>
            </Tooltip>
          </Box>
        ) : (
          <Box
            sx={{
              border: "1px dashed rgba(104, 111, 130, 0.5)",
              width: "100%",
              height: "37px",
              fontSize: "12px",
              borderRadius: "10px",
            }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              gap={"4px"}
              alignItems={"center"}
              padding={"4px"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bgcolor={theme.palette.grey[400]}
                width={27}
                height={27}
                borderRadius={"50%"}
              >
                <DocumentUploadIcon color="grey" />
              </Box>
              <Typography
                fontSize={12}
                fontWeight={700}
                color={theme.palette.grey[600]}
              >
                فایل موجود نیست
              </Typography>
            </Box>
          </Box>
        ),
    },
    {
      field: "status",
      headerName: "",
      flex: 0.8,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          textAlign={"end"}
          width={"100%"}
        >
          <Chip
            label={params.value}
            variant="outlined"
            sx={{
              fontWeight: "700",
              color: params.row.status
                ? theme.palette.primary[400]
                : theme.palette.warning[500],
              bgcolor: params.row.status
                ? theme.palette.primary[50]
                : theme.palette.warning[600],
              borderColor: params.row.status
                ? theme.palette.primary[200]
                : theme.palette.warning[500],
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      {!fetching && (
        <>
          {isMobile ? (
            <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
              {coursesMeetingsData?.map((item) => (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"15px"}
                  m={"0 -10px"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={"column"}
                  >
                    <Typography
                      fontSize={"10px"}
                      color={theme.palette.grey[600]}
                    >
                      هفتــــــه نهــــــم{" "}
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      color={theme.palette.grey[500]}
                      fontWeight={700}
                    >
                      {item?.course?.title}
                    </Typography>
                  </Box>

                  <Box display={"flex"} gap={"11px"} alignItems={"center"}>
                    <Box
                      width={25}
                      height={25}
                      bgcolor={theme.palette.grey[400]}
                      borderRadius={"50%"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <CalendarIcon />
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      textAlign={"right"}
                    >
                      <Typography fontSize={10} color={theme.palette.grey[600]}>
                        ســــــاعت :
                        {item?.meeting_datetime?.split("T")[1]?.split(".")[0]}{" "}
                      </Typography>
                      <Typography
                        fontSize={14}
                        fontWeight={700}
                        color={theme.palette.grey[500]}
                      >
                        {PersianConvertDate(item?.meeting_datetime)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display={"flex"} gap={"11px"} alignItems={"center"}>
                    <Typography fontSize={12} color={theme.palette.grey[600]}>
                      وضعیت جلسه{" "}
                    </Typography>
                    <Chip
                      label={nowDate(item?.meeting_datetime)}
                      variant="outlined"
                      sx={{
                        fontWeight: "700",
                        color: nowDate(item?.meeting_datetime)
                          ? theme.palette.primary[400]
                          : theme.palette.warning[500],
                        bgcolor: nowDate(item?.meeting_datetime)
                          ? theme.palette.primary[50]
                          : theme.palette.warning[600],
                        borderColor: nowDate(item?.meeting_datetime)
                          ? theme.palette.primary[200]
                          : theme.palette.warning[500],
                        fontSize: "12px",
                        minWidth: "100px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      border: "1px dashed",
                      width: "100%",
                      height: "37px",
                      fontSize: "12px",
                      borderRadius: "10px",
                      borderColor: item?.meet_link
                        ? theme.palette.primary[600]
                        : theme.palette.grey[600],
                    }}
                    display={"flex"}
                    textAlign={"center"}
                    justifyItems={"center"}
                    alignItems={"center"}
                    padding={"4px"}
                    overflow={"hidden"}
                  >
                    {
                      <Link
                        to={item?.meet_link}
                        target="_blank"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          borderRadius={"50%"}
                          color={
                            item?.meet_link
                              ? theme.palette.primary[600]
                              : theme.palette.grey[600]
                          }
                          gap={"4px"}
                        >
                          {item?.meet_link ? (
                            <VideoIcon width={16} height={16} color="#108b62" />
                          ) : (
                            <DocumentUploadIcon color="grey" />
                          )}
                          {item?.meet_link
                            ? item?.meet_link
                            : "فایل موجود نیست"}
                        </Box>
                      </Link>
                    }
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ width: "100%", direction: "rtl" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                hideFooterSelectedRowCount
                disableColumnMenu
                disableRowSelectionOnClick
                hideFooter={false}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    display: "none",
                  },

                  fontFamily: "inherit",

                  border: 0,
                  direction: "rtl",
                  "& .MuiDataGrid-row": {
                    paddingBottom: "8px",
                  },
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
                    alignItems: "center",
                    justifyContent: "right",
                    display: "flex",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    height: "40px !important",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    overflow: "hidden !important",
                  },
                  "& .MuiDataGrid-main": {
                    scrollbarWidth: "none",
                  },
                  "& .MuiDataGrid-scrollbar": {
                    scrollbarWidth: "none",
                  },
                  "& .MuiDataGrid-main::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                slots={{ pagination: CustomPagination }}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};
