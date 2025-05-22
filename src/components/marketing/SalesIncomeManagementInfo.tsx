import React, { useEffect } from "react";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";

import theme from "theme";
import {
  PeopleIcons,
  UserMinusIcons,
  UserRemoveIcons,
  UserTickIcons,
} from "uiKit";
import { useMarketingStore } from "store/useMarketing.store";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";

type Props = {
  webinarId: string
}
export const SalesIncomeManagementInfo: React.FC<Props> = ({ webinarId }) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { fetchWebinarsByIdData, webinarsByIdData } = useMarketingStore();

  useEffect(() => {
    if (webinarId) {
      fetchWebinarsByIdData(webinarId);
    }
  }, [webinarId]);

  return (
    <Box
      display={"flex"}
      flex={1}
      flexDirection={"column"}
      gap={"25px"}
      sx={{
        [theme.breakpoints.down("sm")]: {
          gap: "11px",
        },
      }}
    >
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
          sx={{
            [theme.breakpoints.down("sm")]: {
              width: "58px",
              height: "58px",
            },
          }}
        >
          <PeopleIcons
            width={isMobile ? 27 : 37}
            height={isMobile ? 27 : 37}
            color="#4DB2D2"
          />
        </Box>

        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            fontSize={"14px"}
            fontWeight={500}
            color={theme.palette.grey[600]}
            sx={{
              fontSize: "12px",
            }}
          >
            دانشجویان خریــــــــد کرده
          </Typography>
          <PersianTypography
            fontSize={"18px"}
            fontWeight={700}
            color={theme.palette.secondary[600]}
            sx={{
              fontSize: "16px",
            }}
          >
            {webinarsByIdData?.total_orders} نفــــر{" "}
          </PersianTypography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"9px"}
        sx={{
          [theme.breakpoints.down("sm")]: {
            flexDirection: "row",
            gap: "6px",
          },
        }}
      >
        <Box
          display={"flex"}
          flex={1}
          padding={"12px 20px"}
          gap={"16px"}
          bgcolor={theme.palette.grey[100]}
          borderRadius={"10px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              gap: "5px",
              padding: "12px 14px",
              alignItems: "center",
            },
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.primary[400]}
            width={"36px"}
            height={"36px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "33px",
                height: "33px",
              },
            }}
          >
            <UserTickIcons
              color="white"
              width={isMobile ? 18 : 20}
              height={isMobile ? 18 : 20}
            />
          </Box>

          {!isMobile && (
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
          )}

          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
              },
            }}
          >
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              color={theme.palette.grey[500]}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "10px",
                },
              }}
            >
              دانشجویان تسویه شــــده
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.primary[400]}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
            >
              {webinarsByIdData?.total_status_counter?.completed}  نفــــر
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flex={1}
          padding={"12px 20px"}
          gap={"16px"}
          bgcolor={theme.palette.grey[100]}
          borderRadius={"10px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              gap: "5px",
              padding: "12px 14px",
              alignItems: "center",
            },
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.warning[800]}
            width={"36px"}
            height={"36px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "33px",
                height: "33px",
              },
            }}
          >
            <UserMinusIcons
              color="white"
              width={isMobile ? 18 : 20}
              height={isMobile ? 18 : 20}
            />
          </Box>
          {!isMobile && (
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
          )}
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
              },
            }}
          >
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              color={theme.palette.grey[500]}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "10px",
                },
              }}
            >
              دانشجویان تسویه نشــــده
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.warning[500]}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
            >
              {webinarsByIdData?.total_status_counter?.incompleted} نفــــر
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flex={1}
          padding={"12px 20px"}
          gap={"16px"}
          bgcolor={theme.palette.grey[100]}
          borderRadius={"10px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              gap: "5px",
              padding: "12px 14px",
              alignItems: "center",
            },
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            bgcolor={theme.palette.error[800]}
            width={"36px"}
            height={"36px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                width: "33px",
                height: "33px",
              },
            }}
          >
            <UserRemoveIcons
              color="white"
              width={isMobile ? 18 : 20}
              height={isMobile ? 18 : 20}
            />
          </Box>
          {!isMobile && (
            <Divider
              orientation="vertical"
              sx={{
                height: "16px",
                textAlign: "center",
                alignSelf: "center",
              }}
            />
          )}
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
              },
            }}
          >
            <Typography
              fontSize={"12px"}
              fontWeight={500}
              color={theme.palette.grey[500]}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "10px",
                },
              }}
            >
              دانشجویان عودت وجـــــه
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={700}
              color={theme.palette.error[500]}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
            >
              {webinarsByIdData?.total_status_counter?.refunded}  نفــــر
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
