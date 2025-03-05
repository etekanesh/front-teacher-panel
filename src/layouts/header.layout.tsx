import React from "react";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Divider, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import theme from "theme";
import { BreadCrumbsModel } from "types";
import { LiveTime, PersianDate } from "core/utils";

type Props = {
  title: string;
  breadcrumb: BreadCrumbsModel[];
};

export const HeaderLayout: React.FC<Props> = ({ title, breadcrumb }) => {
  return (
    <Box
      height={44}
      display={"flex"}
      justifyContent={"space-between"}
      padding={"0 14px"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          color={theme.palette.grey[500]}
          fontWeight={700}
          fontSize={20}
        >
          {title}
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: theme.palette.grey[600],
              opacity: 0.5,
            },
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{
              color: theme.palette.grey[600],
              cursor: "pointer",
              opacity: 0.5,
            }}
            fontSize={12}
          >
            پنل مدرسین
          </Link>
          {breadcrumb?.map((item) => (
            <Link
              underline="hover"
              color="inherit"
              href={item?.link}
              fontSize={12}
              sx={{
                color: item?.color,
                cursor: "pointer",
                opacity: item?.active ? 1 : 0.5,
              }}
              fontWeight={500}
              key={item?.id}
            >
              {item?.title}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>
      <Box display={"flex"} gap={"15px"} alignItems={"center"}>
        <Box display={"flex"} gap={"5px"}>
          <AccessTimeIcon
            sx={{ width: 16, height: 16, color: theme.palette.grey[600] }}
          />
          <Typography color={theme.palette.grey[600]} fontSize={14}>
            {LiveTime()}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ height: "11px" }}
        />
        <Box>
          <Typography color={theme.palette.grey[600]} fontSize={14}>
            {PersianDate()}
          </Typography>
        </Box>
        <Box
          width={40}
          height={40}
          borderRadius={"50%"}
          bgcolor={theme.palette.primary[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
        >
          <NotificationsActiveOutlinedIcon
            sx={{ width: 20, height: 20, color: "white" }}
          />
          <Box
            borderRadius={"50%"}
            width={20}
            height={20}
            bgcolor={theme.palette.error[500]}
            color={"white"}
            fontSize={10}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"absolute"}
            left={-5}
            top={-5}
            border={"2px solid white"}
          >
            ۵۶
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
