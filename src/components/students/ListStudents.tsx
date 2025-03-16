import React from "react";
import { Box, Paper, Typography } from "@mui/material";

import theme from "theme";
import { ListIcons, SearchInput } from "uiKit";

export const ListStudents: React.FC = () => {
  return (
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
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          gap: "8px",
          height: "100px",
          alignItems: "flex-start",
          padding: "15px 16px 20px",
          boxShadow: "none",
        },
      }}
    >
      <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
        <ListIcons color={theme.palette.primary[600]} width={22} height={22} />
        <Typography
          fontSize={16}
          fontWeight={700}
          color={theme.palette.grey[500]}
        >
          لیست دانشجــــــــویان
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flex={1}
        sx={{
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        }}
      >
        <SearchInput placeholderText="جستجو در بین دانشجـــــــو ..." />
      </Box>
    </Paper>
  );
};
