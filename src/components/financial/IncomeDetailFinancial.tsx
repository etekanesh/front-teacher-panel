import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import {
  MonitorMobileIcons,
  PeopleIcons,
  UserMinusIcons,
  UserRemoveIcons,
  UserTickIcons,
} from "uiKit";
import theme from "theme";
import { useFinancialStore } from "store/useFinancial.store";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";

export const IncomeDetailFinancial: React.FC = () => {
  const { overViewData } = useFinancialStore();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"11px"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          gap: "15px",
          padding: "0px 6px",
        },
      }}
    >
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
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"11px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "43%",
            },
          }}
        >
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

            <PersianTypography
              fontSize={"16px"}
              color={theme.palette.grey[500]}
            >
              {overViewData?.total} نفر
            </PersianTypography>
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
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"11px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "43%",
            },
          }}
        >
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

            <PersianTypography
              fontSize={"16px"}
              color={theme.palette.primary[400]}
            >
              {overViewData?.paid} نفر
            </PersianTypography>
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            height: "18px",
            textAlign: "center",
            alignSelf: "center",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        />
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"11px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "43%",
            },
          }}
        >
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

            <PersianTypography
              fontSize={"16px"}
              color={theme.palette.warning[500]}
            >
              {overViewData?.remaning} نفر
            </PersianTypography>
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
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"11px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "43%",
            },
          }}
        >
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

            <PersianTypography
              fontSize={"16px"}
              color={theme.palette.error[500]}
            >
              {overViewData?.refunded} نفر
            </PersianTypography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
