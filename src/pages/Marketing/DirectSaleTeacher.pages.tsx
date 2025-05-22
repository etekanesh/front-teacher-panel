import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

import {
  DirectSaleTeacherTable,
  LineChartMarketing,
  Ticket,
} from "components/marketing";
import { BreadCrumbsModel } from "core/types";
import { HeaderLayout } from "layouts/header.layout";
import theme from "theme";
import { CopyIcon, DirectSaleIcon, ListIcons } from "uiKit";
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
    title: "فروش مستقیم مدرس",
    link: "/teacher/marketing/direct-sale-teacher",
    id: "1",
    color: theme.palette.grey[600],
    active: true,
  },
];
export const DirectSaleTeacherPages: React.FC = () => {

  const [copied, setCopied] = useState(false);

  const {
    fetching,
    fetchDirectSaleCodesData,
    directSaleCodesData,
    fetchDirectSaleSummaryData,
  } = useMarketingStore();

  const handleCopy = async (item: number) => {
    try {
      await navigator.clipboard.writeText(String(item));
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {
    fetchDirectSaleCodesData();
    fetchDirectSaleSummaryData();
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
        {
          !fetching && <Box display={"flex"} flexDirection={"column"} gap={"26px"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <DirectSaleIcon />
              <Typography
                fontSize={"16px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                فروش مستقیـــــم مدرس
              </Typography>
            </Box>
            <Box
              display={"flex"}
              gap={"9px"}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  gap: "26px",
                },
              }}
            >
              <Box
                display={"flex"}
                flex={1}
                justifyContent={"space-between"}
                flexDirection={"column"}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    gap: "26px",
                  },
                }}
              >
                {/* <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    gap: "16px",
                    padding: "4px 32px 0",
                  },
                }}
              >
                <Box
                  display={"flex"}
                  borderRadius={"50%"}
                  width={"78px"}
                  height={"78px"}
                  bgcolor={theme.palette.primary[50]}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      width: "58px",
                      height: "58px",
                    },
                  }}
                >
                  <CoursesIcon
                    width={isMobile ? 28 : 38}
                    height={isMobile ? 28 : 38}
                  />
                </Box>

                <Box
                  display={"flex"}
                  gap={"4px"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <Typography
                    fontSize={"18px"}
                    fontWeight={700}
                    color={theme.palette.grey[600]}
                    sx={{
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "16px",
                      },
                    }}
                  >
                    کد معرف مدرس
                  </Typography>
                </Box>
              </Box> */}
                <Box display={"flex"} flexDirection={"column"} gap={"2px"} justifyContent={"center"} alignItems={"center"}>
                  {directSaleCodesData?.referrals?.map((item) => (
                    <Box key={item?.code}>
                      <Box position={"relative"} maxWidth={"303px"}>
                        <Ticket />
                        <Box
                          display={"flex"}
                          gap={"5px"}
                          flexDirection={"column"}
                          position={"absolute"}
                          top={"50px"}
                          left={"20px"}
                        >
                          <Typography
                            fontSize={"14px"}
                            fontWeight={500}
                            color={theme.palette.primary[800]}
                            sx={{
                              overflowWrap: "anywhere",
                              [theme.breakpoints.down("sm")]: {
                                fontSize: "12px",
                              },
                            }}
                            textAlign={"center"}
                          >
                            {item?.code}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ bgcolor: theme.palette.primary[600] }}
                          >
                            <Box
                              display={"flex"}
                              gap={"10px"}
                              //   justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <CopyIcon />
                              <Divider
                                orientation="vertical"
                                sx={{
                                  height: "11px",
                                  width: "2px",
                                  borderColor: theme.palette.grey[400],
                                  textAlign: "center",
                                  alignSelf: "center",
                                }}
                              />
                              <Typography
                                fontSize={"14px"}
                                color="white"
                                onClick={() => handleCopy(item?.code)}
                              >
                                کپی کردن کد
                              </Typography>
                            </Box>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box flex={2}>
                <LineChartMarketing />
              </Box>
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <ListIcons
                  color={theme.palette.primary[600]}
                  width={22}
                  height={22}
                />
                <Typography
                  fontSize={"16px"}
                  fontWeight={700}
                  color={theme.palette.grey[500]}
                >
                  لیست افرادی که خرید کردن
                </Typography>
              </Box>

              <DirectSaleTeacherTable />
            </Box>
          </Box>
        }

        <Snackbar
          open={copied}
          onClose={() => setCopied(false)}
          autoHideDuration={2000}
          message="کپی شد!"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#008C64",
              color: "white",
            },
          }}
        />
      </Paper>
    </>
  );
};
