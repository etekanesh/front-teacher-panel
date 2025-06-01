import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";

import theme from "theme";
import { ListIcons } from "uiKit";
import { useMarketingStore } from "store/useMarketing.store";

export const SalesIncomeManagementWebinar: React.FC = () => {
  const { webinarsByIdData } = useMarketingStore();

  return (
    <Box display={"flex"} flex={1} gap={"16px"} flexDirection={"column"}>
      <a href={webinarsByIdData?.banner}>
        <Box
          component={"img"}
          borderRadius={"15px"}
          width={"100%"}
          height={"207px"}
          src={webinarsByIdData?.thumbnail}
        />
      </a>
      <Box display={"flex"} flexDirection={"column"} gap={"7px"}>
        <Typography
          fontSize={"16px"}
          fontWeight={"700"}
          color={theme.palette.grey[500]}
        >
          {webinarsByIdData?.title}
        </Typography>
        <Chip
          label={webinarsByIdData?.title}
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
            {webinarsByIdData?.total_participants} نفر شرکت کننده
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
            label={webinarsByIdData?.total_participants + "نفــــر"}
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
            total={webinarsByIdData?.total_participants}
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
            {webinarsByIdData?.customers?.map((item, index) => (
              <Tooltip title={item?.first_name + " " + item?.last_name} arrow key={item?.first_name + index}>
                <Avatar
                  alt={item?.first_name + " " + item?.last_name}
                  src={
                    "https://etekanesh.com/static/panel/media/avatars/blank.png"
                  }
                  sx={{ width: 24, height: 24, zIndex: 1, cursor: "pointer" }}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </Box>
    </Box>
  );
};
