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

export const IncomeDetailFinancial: React.FC = () => {
  return (
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

            <Typography fontSize={"16px"} color={theme.palette.grey[500]}>
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

            <Typography fontSize={"16px"} color={theme.palette.primary[400]}>
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

            <Typography fontSize={"16px"} color={theme.palette.warning[500]}>
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

            <Typography fontSize={"16px"} color={theme.palette.error[500]}>
              ۱۲۳ نفر
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
