import React from "react";
import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";

import { HeaderLayout } from "layouts";
import theme from "theme";
import { BreadCrumbsModel } from "types";
import {
  CardCoinIcons,
  ListIcons,
  PeopleIcons,
  ProfileTickIcons,
  SearchInput,
} from "uiKit";
import Image from "../../assets/chart.png";
import Image2 from "../../assets/chart2.png";

const StudentsPage: React.FC = () => {
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <HeaderLayout title="مدیریت دانشجویان" breadcrumb={breadcrumbData} />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "700px",
          borderRadius: "10px",
          bgcolor: "white",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            height: "70px",
            bgcolor: "white",
            borderRadius: "10px 10px 0 0",
            boxShadow: "-12px 0px 67.1px 0px #6B857E17",
            display: "flex",
            gap: 15,
            alignItems: "center",
            padding: "18px 28px",
          }}
        >
          <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
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
              لیست دانشجــــــــویان
            </Typography>
          </Box>
          <Box display={"flex"} flex={1}>
            <SearchInput />
          </Box>
        </Paper>

        <Box display={"flex"} p={"28px"} flexDirection={"column"} gap={"40px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              flex={1}
            >
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Box
                  width={"25px"}
                  height={"25px"}
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
                  <Typography
                    fontSize={"10px"}
                    fontWeight={600}
                    color={theme.palette.grey[600]}
                  >
                    تعداد کل دانشجـــــــویان
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
                    >
                      ۵۶۳
                    </Typography>
                    <Chip
                      label="(+۵٪)"
                      icon={<ArrowCircleUpRoundedIcon />}
                      color={"primary"}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                        "& .MuiChip-icon": {
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box component={"img"} src={Image} />
            </Box>
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
            <Box
              display={"flex"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              flex={1}
            >
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Box
                  width={"25px"}
                  height={"25px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"100%"}
                  borderColor={theme.palette.grey[400]}
                  bgcolor={theme.palette.grey[400]}
                >
                  <CardCoinIcons />
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    fontSize={"10px"}
                    fontWeight={600}
                    color={theme.palette.grey[600]}
                  >
                    درآمد تجمیعــــــی
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
                    >
                      ۵٬۶۰۰٬۰۰۰٬۰۰۰
                    </Typography>
                    <Chip
                      label="(-55٪)"
                      icon={<ArrowCircleDownRoundedIcon />}
                      color={"warning"}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                        "& .MuiChip-icon": {
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box component={"img"} src={Image2} />
            </Box>
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
            <Box
              display={"flex"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              flex={1}
            >
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Box
                  width={"25px"}
                  height={"25px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"100%"}
                  borderColor={theme.palette.grey[400]}
                  bgcolor={theme.palette.grey[400]}
                >
                  <ProfileTickIcons />
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    fontSize={"10px"}
                    fontWeight={600}
                    color={theme.palette.grey[600]}
                  >
                    دانشجـــــــویان در حال کسب درآمد
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={600}
                      color={theme.palette.grey[500]}
                    >
                      ۵۳
                    </Typography>
                    <Chip
                      label="(+۵٪)"
                      icon={<ArrowCircleUpRoundedIcon />}
                      color={"primary"}
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                        "& .MuiChip-icon": {
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box component={"img"} src={Image} />
            </Box>
          </Box>

          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Box>
      </Paper>
    </>
  );
};

export default StudentsPage;
