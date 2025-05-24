import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Badge,
  Box,
  Chip,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";

import theme from "theme";
import { CustomPagination } from "uiKit";
import { useMarketingStore } from "store/useMarketing.store";

export const DirectSaleTeacherTable: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { directSaleCodesData } = useMarketingStore();

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "نام و نام خانوادگی",
      flex: 1,
      minWidth: 190,
      headerAlign: "left",
      align: "left",
      display: "flex",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box
          display={"flex"}
          gap={"7px"}
          alignItems={"center"}
          height={"100%"}
          justifySelf={"self-start"}
        >
          <Badge
            badgeContent={
              params?.value?.status === 1 ? (
                <DoneIcon sx={{ width: "8px", height: "8px" }} />
              ) : params?.value?.status === 2 ? (
                <PriorityHighRoundedIcon sx={{ width: "8px", height: "8px" }} />
              ) : (
                <CloseRoundedIcon sx={{ width: "8px", height: "8px" }} />
              )
            }
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
                : params?.value?.status === 2
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
      field: "amount",
      headerName: "مبلغ پرداختی",
      flex: 1,
      minWidth: 190,
      headerAlign: "center",

      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
          {params.value.amount}
        </Typography>
      ),
    },

    {
      field: "model",
      headerName: "مدل پرداختی",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      display: "flex",
      renderCell: (params: GridRenderCellParams<any>) => (
        <Chip
          label={params.value.model}
          variant="outlined"
          sx={{
            display: "flex",
            minWidth: "74px",
            height: "20px",
            padding: "0 6px",
            alignItems: "center",
            fontWeight: 500,
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
      field: "code",
      headerName: "کد استفاده شده",
      flex: 1,
      minWidth: 190,
      headerAlign: "center",

      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography
          whiteSpace={"pre-wrap"}
          fontSize={"10px"}
          color={theme.palette.grey[600]}
        >
          {params.value.code}
        </Typography>
      ),
    },

    {
      field: "TeacherIncome",
      headerName: "میزان دریافتی مدرس",
      flex: 1,
      minWidth: 190,
      headerAlign: "center",

      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography fontSize={"14px"} color={theme.palette.primary[600]}>
          {params.value.amount}
        </Typography>
      ),
    },
  ];
  const formatToRial = (amount: number): string =>
    amount.toLocaleString("fa-IR") + " تومان";

  const formattedRows = directSaleCodesData.orders.map((item, index) => ({
    id: index + 1,
    fullName: {
      id: index + 1,
      imageSrc:
        item.user.profile ||
        "https://etekanesh.com/static/panel/media/avatars/blank.png",
      fullName: `${item.user.first_name} ${item.user.last_name}`,
      status: 1, // you can replace with logic (e.g., based on item.paid or item.referral)
    },
    amount: {
      amount: formatToRial(item.paid),
    },
    model: {
      model: item.pay_type === "installment" ? "اقساطی" : "تکی",
    },
    code: {
      code: item.referral?.code ?? "-",
    },
    TeacherIncome: {
      amount: formatToRial(item.teacher_share),
    },
  }));

  return (
    <>
      {isMobile ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
          m={"0 -10px"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            border={`1px solid ${theme.palette.grey[400]}`}
            p={"8px 16px"}
            borderRadius={"10px"}
          >
            <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
              نام و نام خانوادگی
            </Typography>
            <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
              مدل پرداختی
            </Typography>
          </Box>

          {directSaleCodesData?.orders?.map((order) => (
            <Box
              key={order?.referral?.code}
              display={"flex"}
              flexDirection={"column"}
              gap={"17px"}
              p={"0 12px"}
            >
              {/* Top Section: Name + Avatar + Model */}
              <Box display={"flex"} justifyContent={"space-between"} gap={"53px"} alignItems={"center"}>
                <Box display={"flex"} gap={"7px"} alignItems={"center"}>
                  <Badge
                    badgeContent={<DoneIcon sx={{ width: "8px", height: "8px" }} />}
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
                    color={"primary"}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Box
                      component={"img"}
                      src={order.user.profile || "https://etekanesh.com/static/panel/media/avatars/blank.png"}
                      width={"33px"}
                      height={"33px"}
                      borderRadius={"50%"}
                    />
                  </Badge>

                  <Typography
                    fontSize={"14px"}
                    color={"#757575"}
                    fontWeight={600}
                  >
                    {`${order.user.first_name} ${order.user.last_name}`}
                  </Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  sx={{
                    height: "16px",
                    width: "2px",
                    borderColor: "#BDBDBD",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                />

                <Chip
                  label={order.pay_type === "installment" ? "اقساطی" : "تکی"}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    minWidth: "74px",
                    height: "20px",
                    padding: "0 6px",
                    alignItems: "center",
                    fontWeight: 500,
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

              {/* Info Section: Payment Details */}
              <Box gap={"5px"} display={"flex"} flexDirection={"column"}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography fontSize={"12px"} color={"#757575"}>
                    مبلغ پرداختی
                  </Typography>
                  <Typography fontSize={"12px"} color={"#757575"}>
                    {formatToRial(order.paid)}
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography fontSize={"12px"} color={"#757575"}>
                    کد استفاده شده
                  </Typography>
                  <Typography fontSize={"12px"} color={"#757575"}>
                    {order.referral?.code ?? "-"}
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography fontSize={"12px"} color={"#757575"}>
                    میزان دریافتی مدرس
                  </Typography>
                  <Typography fontSize={"12px"} color={"#757575"}>
                    {formatToRial(order.teacher_share)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          <Divider />

        </Box>
      ) : (
        <DataGrid
          rows={formattedRows}
          columns={columns}
          disableColumnMenu
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
          pagination
          slots={{ pagination: CustomPagination }}
        />
      )}
    </>
  );
};
