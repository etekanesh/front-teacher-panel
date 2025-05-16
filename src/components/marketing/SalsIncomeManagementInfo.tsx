import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import theme from "theme";
import {
  PeopleIcons,
  UserMinusIcons,
  UserRemoveIcons,
  UserTickIcons,
} from "uiKit";

export const SalsIncomeManagementInfo: React.FC = () => {
  return (
    <Box display={"flex"} flex={1} flexDirection={"column"} gap={"25px"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"14px"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          width={"78px"}
          height={"78px"}
          borderRadius={"50%"}
          bgcolor={theme.palette.secondary[100]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <PeopleIcons width={37} height={37} color="#4DB2D2" />
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            fontSize={"14px"}
            fontWeight={500}
            color={theme.palette.grey[600]}
          >
            دانشجویان خریــــــــد کرده
          </Typography>
          <Typography
            fontSize={"18px"}
            fontWeight={700}
            color={theme.palette.secondary[600]}
          >
            ۱۲۳ نفــــر{" "}
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"9px"}>
        <Box
          display={"flex"}
          padding={"12px 20px"}
          gap={"16px"}
          bgcolor={"#EDF0EF80"}
          borderRadius={"10px"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.primary[400]}
            width={"36px"}
            height={"36px"}
          >
            <UserTickIcons color="white" width={20} height={20} />
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: "16px",
              textAlign: "center",
              alignSelf: "center",
            }}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              color={theme.palette.grey[500]}
            >
              دانشجویان تسویه شــــده
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.primary[400]}
            >
              ۱۲۳ نفــــر
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          padding={"12px 20px"}
          gap={"16px"}
          bgcolor={"#EDF0EF80"}
          borderRadius={"10px"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.warning[800]}
            width={"36px"}
            height={"36px"}
          >
            <UserMinusIcons color="white" width={20} height={20} />
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: "16px",
              textAlign: "center",
              alignSelf: "center",
            }}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              color={theme.palette.grey[500]}
            >
              دانشجویان تسویه نشــــده
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.warning[500]}
            >
              ۱۲۳ نفــــر
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          padding={"12px 20px"}
          gap={"16px"}
          bgcolor={"#EDF0EF80"}
          borderRadius={"10px"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.error[800]}
            width={"36px"}
            height={"36px"}
          >
            <UserRemoveIcons color="white" width={20} height={20} />
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: "16px",
              textAlign: "center",
              alignSelf: "center",
            }}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              color={theme.palette.grey[500]}
            >
              دانشجویان عودت وجـــــه
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.error[500]}
            >
              ۱۲۳ نفــــر
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
