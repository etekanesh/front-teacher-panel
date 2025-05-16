import React from "react";
import { Avatar, AvatarGroup, Box, Chip, Typography } from "@mui/material";

import theme from "theme";
import { ListIcons } from "uiKit";
import MarketingImage from "assets/markting.png";
import AvatarImage from "assets/avatar-Image.png";

export const SalesIncomeManagementWebinar: React.FC = () => {
  return (
    <Box display={"flex"} flex={1} gap={"16px"} flexDirection={"column"}>
      <Box
        component={"img"}
        borderRadius={"15px"}
        width={"100%"}
        height={"207px"}
        src={MarketingImage}
      />
      <Box display={"flex"} flexDirection={"column"} gap={"7px"}>
        <Typography
          fontSize={"16px"}
          fontWeight={"700"}
          color={theme.palette.grey[500]}
        >
          کسب درآمد دلاری از فریلنسری
        </Typography>
        <Chip
          label={"چالش های ساخت اکانت +  بررسی درآمد   + انتقال درآمد به ایران"}
          sx={{
            height: "24px",
            padding: "0px 32px",
            alignItems: "center",
            fontWeight: 500,
            fontSize: "12px",
            color: theme.palette.grey[600],
            border: "none",
            bgcolor: theme.palette.grey[400],

            "& .MuiChip-icon": {
              margin: 0,
            },
            "& .MuiChip-label": {
              padding: 0,
            },
          }}
        />
        <Box display={"flex"} m={"13px 0"} gap={"5px"} alignItems={"center"}>
          <ListIcons />
          <Typography
            fontSize={"14px"}
            fontWeight={500}
            color={theme.palette.grey[600]}
          >
            ۲۰۰ نفر شرکت کننده
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontSize={"14px"}
            fontWeight={700}
            color={theme.palette.grey[500]}
          >
            تعداد شرکت کنندگان
          </Typography>
          <Chip
            label={"۱۲۳ نفــــر"}
            icon={
              <ListIcons
                width={15}
                height={15}
                color={theme.palette.grey[600]}
              />
            }
            sx={{
              display: "flex",
              height: "25px",
              padding: "0px 8px",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "12px",
              color: theme.palette.grey[600],
              border: "none",
              bgcolor: theme.palette.grey[400],
              gap: "3px",

              "& .MuiChip-icon": {
                margin: 0,
              },
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontSize={"14px"}
            fontWeight={700}
            color={theme.palette.grey[500]}
          >
            اسامی شرکت کنندگان
          </Typography>
          <AvatarGroup
            total={94}
            spacing={9}
            max={5}
            sx={{ direction: "ltr" }}
            slotProps={{
              surplus: {
                sx: {
                  width: "24px",
                  height: "24px",
                  fontSize: "10px",
                  color: theme.palette.grey[600],
                  backgroundColor: theme.palette.grey[400],
                  zIndex: 6,
                  direction: "ltr",
                },
              },
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={AvatarImage}
              sx={{ width: 24, height: 24, zIndex: 1 }}
            />
            <Avatar
              alt="Travis Howard"
              src={AvatarImage}
              sx={{ width: 24, height: 24, zIndex: 2 }}
            />
            <Avatar
              alt="Agnes Walker"
              src={AvatarImage}
              sx={{ width: 24, height: 24, zIndex: 3 }}
            />
            <Avatar
              alt="Trevor Henderson"
              src={AvatarImage}
              sx={{ width: 24, height: 24, zIndex: 4 }}
            />
            <Avatar
              alt="Trevor Henderson"
              src={AvatarImage}
              sx={{ width: 24, height: 24, zIndex: 5 }}
            />
          </AvatarGroup>
        </Box>
      </Box>
    </Box>
  );
};
