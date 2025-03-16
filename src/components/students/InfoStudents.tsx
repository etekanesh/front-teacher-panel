import React from "react";
import { Box, Chip, Divider, Typography, useMediaQuery } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";

import theme from "theme";
import { CardCoinIcons, PeopleIcons, ProfileTickIcons } from "uiKit";

export const InfoStudents: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexWrap={"wrap"}
      gap={"10px"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          gap: "6px",
          padding: "0 16px",
        },
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        flex={1}
        justifyContent={"space-between"}
        minWidth={"300px"}
        maxWidth={"350px"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Box
          minWidth={"40%"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
        >
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
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "2px",
                },
              }}
            >
              <Typography
                fontSize={"20px"}
                fontWeight={600}
                color={theme.palette.grey[500]}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                  },
                }}
              >
                ۵۶۳
              </Typography>
              <Chip
                label="(+۵٪)"
                icon={
                  <ArrowCircleUpRoundedIcon
                    sx={{ height: "10px", width: "10px" }}
                  />
                }
                color="primary"
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "13px",
                  gap: "3px",
                  padding: "2px",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "8px",
                  bgcolor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          maxWidth={"100%"}
          minWidth={"30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NorthRoundedIcon
            sx={{
              width: "12px",
              height: "12px",
              strokeWidth: 1,
              stroke: theme.palette.primary[400],
              color: theme.palette.primary[400],
            }}
          />
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={32}
            curve="natural"
            area
            colors={["#40C792"]}
            sx={{
              "& .MuiAreaElement-root": {
                fill: "url(#gradiant1)",
              },
            }}
          >
            <defs>
              <linearGradient id="gradiant1" gradientTransform="rotate(90)">
                <stop offset="35%" stop-color="#40C79259" />
                <stop offset="100%" stop-color="#FFFFFF00" />
              </linearGradient>
            </defs>
          </SparkLineChart>
        </Box>
      </Box>
      <Divider
        orientation={isMobile ? "horizontal" : "vertical"}
        sx={{
          height: "16px",
          textAlign: "center",
          alignSelf: "center",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "1px",
          },
        }}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        flex={1}
        justifyContent={"space-between"}
        minWidth={"300px"}
        maxWidth={"350px"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Box
          minWidth={"40%"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
        >
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
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "2px",
                },
              }}
            >
              <Typography
                fontSize={"20px"}
                fontWeight={600}
                color={theme.palette.grey[500]}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                  },
                }}
              >
                ۵٬۶۰۰٬۰۰۰٬۰۰۰
              </Typography>
              <Chip
                label="(-55٪)"
                icon={
                  <ArrowCircleDownRoundedIcon
                    sx={{ height: "10px", width: "10px" }}
                  />
                }
                color={"error"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "13px",
                  gap: "3px",
                  padding: "2px",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "8px",
                  bgcolor: theme.palette.error[50],
                  borderColor: theme.palette.error[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          maxWidth={"100%"}
          minWidth={"30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SouthRoundedIcon
            sx={{
              width: "12px",
              height: "12px",
              strokeWidth: 1,
              stroke: theme.palette.error[500],
              color: theme.palette.error[500],
            }}
          />
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={32}
            curve="natural"
            area
            colors={["#EF5353"]}
            sx={{
              "& .MuiAreaElement-root": {
                fill: "url(#gradiant2)",
              },
            }}
          >
            <defs>
              <linearGradient id="gradiant2" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#EF5353" />
                <stop offset="100%" stop-color="#FFFFFF00" />
              </linearGradient>
            </defs>
          </SparkLineChart>
        </Box>
      </Box>
      <Divider
        orientation={isMobile ? "horizontal" : "vertical"}
        sx={{
          height: "16px",
          textAlign: "center",
          alignSelf: "center",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "1px",
          },
        }}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        flex={1}
        justifyContent={"space-between"}
        minWidth={"300px"}
        maxWidth={"350px"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
          },
        }}
      >
        <Box
          minWidth={"40%"}
          display={"flex"}
          gap={"10px"}
          alignItems={"center"}
        >
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
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"5px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  gap: "2px",
                },
              }}
            >
              <Typography
                fontSize={"20px"}
                fontWeight={600}
                color={theme.palette.grey[500]}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "18px",
                  },
                }}
              >
                ۵۳
              </Typography>
              <Chip
                label="(+۵٪)"
                icon={
                  <ArrowCircleUpRoundedIcon
                    sx={{ height: "10px", width: "10px" }}
                  />
                }
                color={"primary"}
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "13px",
                  gap: "3px",
                  padding: "2px",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "8px",
                  bgcolor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          maxWidth={"100%"}
          minWidth={"30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NorthRoundedIcon
            sx={{
              width: "12px",
              height: "12px",
              strokeWidth: 1,
              stroke: theme.palette.primary[400],
              color: theme.palette.primary[400],
            }}
          />
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={32}
            curve="natural"
            area
            colors={["#40C792"]}
            sx={{
              "& .MuiAreaElement-root": {
                fill: "url(#gradiant3)",
              },
            }}
          >
            <defs>
              <linearGradient id="gradiant3" gradientTransform="rotate(90)">
                <stop offset="35%" stop-color="#40C79259" />
                <stop offset="100%" stop-color="#FFFFFF00" />
              </linearGradient>
            </defs>
          </SparkLineChart>
        </Box>
      </Box>
    </Box>
  );
};
