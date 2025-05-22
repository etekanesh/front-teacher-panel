import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem, Paper, Typography } from "@mui/material";

import theme from "theme";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "core/types";
import { MarketingIcons, NoteIcon } from "uiKit";
import {
  PieChartMarketing,
  SalesIncomeManagementWebinar,
  SalesIncomeManagementInfo,
} from "components/marketing";
import { useMarketingStore } from "store/useMarketing.store";

const breadcrumbData: BreadCrumbsModel[] = [
  {
    title: "فروش و مارکتینگ",
    link: "/teacher/marketing",
    id: "0",
    color: theme.palette.grey[600],
    active: false,
  },
  {
    title: "مدیریت فروش و درآمـد",
    link: "/teacher/marketing/sales-income-management",
    id: "1",
    color: theme.palette.grey[600],
    active: true,
  },
];

export const SalesIncomeManagementPage: React.FC = () => {
  const { fetching, fetchWebinarsData, webinarsData } = useMarketingStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedWebinar, setSelectedWebinar] = useState("");

  const openCurrency = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCurrency = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchWebinarsData();
  }, []);

  return (
    <>
      <HeaderLayout title="فروش و مارکتینگ" breadcrumb={breadcrumbData} />

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: "10px",
          padding: "24px 28px",
          [theme.breakpoints.down("sm")]: {
            padding: "15px 10px 18px",
            border: "none",
            borderRadius: "unset",
          },
        }}
      >
        {!fetching && (
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box
              display={"flex"}
              gap={"10px"}
              alignItems={"center"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  padding: "0 6px",
                },
              }}
            >
              <MarketingIcons color={theme.palette.primary[600]} />
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                مدیریت فروش و درآمـد
              </Typography>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  padding: "0 6px",
                },
              }}
            >
              <Typography
                fontSize={"14px"}
                fontWeight={500}
                color={theme.palette.grey[500]}
              >
                نمودار درآمدی به تفکیک  وبـینــــــار
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"13px"}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    gap: "7px",
                  },
                }}
              >
                <Button
                  id="basic-button"
                  aria-controls={openCurrency ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openCurrency ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ padding: "0px", minWidth: "28px" }}
                >
                  <Box display={"flex"} gap={"4px"}>
                    {webinarsData[0]?.title}
                    <NoteIcon color={theme.palette.primary[600]} />
                  </Box>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openCurrency}
                  onClose={handleCloseCurrency}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      border: "1px solid ",
                      borderColor: theme.palette.grey[400],
                      borderRadius: "10px",
                      boxShadow: "-12px 0px 67.1px 0px #6B857E17",
                      width: "fit-content",
                    },
                    "& .MuiPaper-root ul": {
                      gap: "0px !important",
                      paddingBottom: "6px !important",
                      padding: "6px",
                      borderBottom: "none",
                    },
                    "& .MuiPaper-root li": {
                      padding: "5px 6px",
                      borderRadius: "5px",
                      fontSize: "11px",
                      color: theme.palette.grey[600],
                    },
                  }}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        mt: "10px",
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          left: 10,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  {webinarsData?.map((item) => (
                    <MenuItem onClick={() => setSelectedWebinar(item?.uuid)} key={item?.uuid}>
                      {item?.title}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
            {webinarsData.length > 0 && (
              <Box
                display={"flex"}
                gap={"16px"}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    gap: "14px",
                  },
                }}
              >
                <Box
                  display={"flex"}
                  flex={2}
                  gap={"14px"}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      flexDirection: "column-reverse",
                    },
                  }}
                >
                  <SalesIncomeManagementInfo
                    webinarId={selectedWebinar || webinarsData[0]?.uuid} />

                  <PieChartMarketing />
                </Box>

                <SalesIncomeManagementWebinar />
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </>
  );
};
