import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";

import { HeaderLayout } from "layouts";
import theme from "theme";
import { BreadCrumbsModel } from "core/types";
import {
  DrawerStudents,
  InfoStudents,
  ListStudentsTitle,
  TableStudents,
} from "components";
import { useStudentsStore } from "store";

const breadcrumbData: BreadCrumbsModel[] = [
  {
    title: "مدیریت دانشجویان",
    link: "/students",
    id: "0",
    color: theme.palette.grey[600],
    active: false,
  },
  {
    title: "لیست دانشجویان",
    link: "/students",
    id: "1",
    color: theme.palette.grey[600],
    active: true,
  },
];
export const StudentsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { fetching, fetchStudentsListData, fetchStudentsStatsData } =
    useStudentsStore();

  useEffect(() => {
    fetchStudentsListData({ page: 1 });
    fetchStudentsStatsData();
  }, []);

  return (
    <>
      <HeaderLayout title="مدیریت دانشجویان" breadcrumb={breadcrumbData} />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          bgcolor: "white",
          [theme.breakpoints.up("sm")]: {
            borderRadius: "10px",
          },
        }}
      >
        <ListStudentsTitle />
        {fetching ? (
          ""
        ) : (
          <Box
            display={"flex"}
            p={"28px"}
            flexDirection={"column"}
            gap={"40px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                padding: "0",
                gap: "20px",
              },
            }}
          >
            <InfoStudents />
            <TableStudents handleOpen={handleOpen} />
          </Box>
        )}
      </Paper>
      <DrawerStudents open={open} handleClose={handleClose} />
    </>
  );
};
