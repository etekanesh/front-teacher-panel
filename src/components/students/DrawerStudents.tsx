import React, { useState } from "react";
import {
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { chartsGridClasses, LineChart } from "@mui/x-charts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DoneIcon from "@mui/icons-material/Done";

import theme from "theme";
import { CustomButton } from "uiKit";
import avatar from "assets/avatar-Image.png";

type Props = {
  open: boolean;
  handleClose: (item: boolean) => void;
};
export const DrawerStudents: React.FC<Props> = ({ open, handleClose }) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [month, setMonth] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      // color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,

      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #EDF0EF",
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      border: "1px solid #EDF0EF",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  }));

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={isMobile ? "bottom" : "right"}
      sx={{
        "& .MuiDrawer-paper": {
          left: "0% !important",
          right: "unset !important",
          top: "15%",
          height: "85%",
          borderRadius: "10px",
          [theme.breakpoints.down("sm")]: {
            right: "0% !important",
            bottom: "0%",
            top: "16%",
            height: "84%",
            borderRadius: "unset",
          },
        },
      }}
    >
      <Box
        sx={{
          border: `1px solid ${theme.palette.grey[400]}`,
          boxShadow: 24,
          p: "18px 25px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          overflow: "auto",
          [theme.breakpoints.down("sm")]: {
            borderRadius: "unset",
            p: "18px 0px",
          },
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              borderRadius: "unset",
              p: "0px 16px",
            },
          }}
        >
          <Box display={"flex"} gap={"7px"} alignItems={"center"}>
            <Badge
              badgeContent={<DoneIcon sx={{ width: "12px", height: "12px" }} />}
              sx={{
                "& .MuiBadge-badge": {
                  width: "15px",
                  height: "15px",
                  minWidth: "15px",
                  top: "6px",
                  left: "6px",
                  padding: "2px",
                  border: "2px solid",
                },
              }}
              color={"primary"}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box
                component={"img"}
                src={avatar}
                width={"51px"}
                height={"51px"}
              />
            </Badge>

            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                fontSize={"14px"}
                fontWeight={700}
                color={theme.palette.grey[500]}
              >
                تیدا گودرزی
              </Typography>
              <Box display={"flex"} gap={"8px"}>
                <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                  آخرین بازدید{" "}
                </Typography>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "8px",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                />
                <Typography
                  fontSize={"12px"}
                  fontWeight={700}
                  color={theme.palette.grey[600]}
                >
                  ۲۹ دی ماه ۱۴۰۳
                </Typography>
              </Box>
            </Box>
          </Box>
          <>
            <HtmlTooltip
              title={
                <Box display={"flex"} flexDirection={"column"} gap={"6px"}>
                  <Box display={"flex"} gap={"2px"}>
                    <Typography
                      fontSize={"12px"}
                      color={theme.palette.grey[600]}
                      display={"inline"}
                    >
                      وضعیت پرداخت :
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={700}
                      color={theme.palette.primary[600]}
                      display={"inline"}
                    >
                      پرداخت قسطی (تسویه شده)
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display={"flex"} gap={"2px"}>
                    <Typography
                      fontSize={"12px"}
                      color={theme.palette.grey[600]}
                      display={"inline"}
                    >
                      وضعیت اتصال دانشجو به ربات :
                    </Typography>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={700}
                      color={theme.palette.primary[600]}
                      display={"inline"}
                    >
                      متصل
                    </Typography>
                  </Box>
                </Box>
              }
              placement="bottom-start"
              arrow
              sx={{
                "& .MuiTooltip-popper": {
                  backgroundColor: "white",
                },
              }}
            >
              <InfoOutlinedIcon
                sx={{
                  width: "18px",
                  height: "18px",
                  color: theme.palette.grey[600],
                }}
              />
            </HtmlTooltip>
          </>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              borderRadius: "unset",
              p: "0px 16px",
            },
          }}
        >
          <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
            وضعیت گروپلنسینگ
          </Typography>
          <Chip
            label={"در حال کسب درآمد"}
            variant="outlined"
            sx={{
              display: "flex",
              height: "20px",
              padding: "6px",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "12px",
              color: theme.palette.primary[400],
              bgcolor: theme.palette.primary[50],
              borderColor: theme.palette.primary[200],
              width: "fit-content",
              "& .MuiChip-icon": {
                margin: 0,
              },
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        </Box>

        <Divider
          sx={{
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
          }}
        />

        <Box
          display={"flex"}
          padding={"16px"}
          border={`1px solid ${theme.palette.grey[400]}`}
          borderRadius={"10px"}
          flexDirection={"column"}
          gap={"12px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              border: "unset",
              padding: "0px 16px",
            },
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} gap={"8px"} alignItems={"center"}>
              <Typography fontSize={"14px"} color={theme.palette.grey[500]}>
                سطح دانشجو
              </Typography>
              <Divider
                orientation="vertical"
                sx={{
                  height: "8px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              />
              <Chip
                label={
                  <Box height={"23px"}>
                    <Typography
                      display={"inline"}
                      fontSize={"18px"}
                      fontWeight={700}
                    >
                      2
                    </Typography>
                    <Typography display={"inline"} fontSize={"10px"}>
                      /
                    </Typography>
                    <Typography display={"inline"} fontSize={"14px"}>
                      10
                    </Typography>
                  </Box>
                }
                icon={
                  <StarRateRoundedIcon
                    sx={{ height: "15px", width: "15px" }}
                    color="warning"
                  />
                }
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "23px",
                  gap: "2px",
                  padding: "4px",
                  alignItems: "center",
                  direction: "ltr",
                  bgcolor: theme.palette.grey[50],
                  borderColor: theme.palette.grey[200],
                  "& .MuiChip-icon": {
                    margin: 0,
                  },
                  "& .MuiChip-label": {
                    padding: 0,
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                fontSize={"12px"}
                color={theme.palette.grey[600]}
                display={"inline"}
              >
                سه مرحله باقی مانده تا سطح{" "}
              </Typography>
              <Typography
                fontSize={"14px"}
                fontWeight={700}
                color={theme.palette.grey[600]}
                display={"inline"}
              >
                {" "}
                3
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "4px",
              backgroundColor: theme.palette.primary[50],
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box width={"100%"} position={"relative"}>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={70}
                sx={{
                  height: "24px",
                  borderRadius: "20px",
                  backgroundColor: "unset",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "20px",
                  },
                }}
              />
              <Box
                borderRadius={"50%"}
                width={"24px"}
                height={"24px"}
                justifyContent={"center"}
                alignItems={"center"}
                position={"absolute"}
                top={"0%"}
                left={"93%"}
                zIndex={1}
                bgcolor={theme.palette.primary[400]}
                display={"flex"}
              >
                <Box
                  borderRadius={"50%"}
                  display={"flex"}
                  width={"16px"}
                  height={"16px"}
                  border={"1.5px solid white"}
                  bgcolor={"transparent"}
                  justifyContent={"center"}
                  alignItems={"baseline"}
                  color={"white"}
                >
                  <Typography
                    height={"16px"}
                    display={"inline"}
                    fontSize={"12px"}
                  >
                    2
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  position: "absolute",
                  top: "25%",
                  left: "33%",
                }}
                fontSize={"12px"}
                fontWeight={700}
                color="white"
              >
                27/30
              </Typography>
            </Box>

            <Box
              borderRadius={"50%"}
              width={"24px"}
              height={"24px"}
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              border={"4px solid "}
              borderColor={theme.palette.primary[100]}
            >
              <Box
                borderRadius={"50%"}
                display={"flex"}
                width={"16px"}
                height={"16px"}
                border={"1.5px solid "}
                borderColor={theme.palette.primary[400]}
                bgcolor={"transparent"}
                justifyContent={"center"}
                alignItems={"baseline"}
                color={theme.palette.primary[400]}
              >
                <Typography
                  height={"16px"}
                  display={"inline"}
                  fontSize={"12px"}
                >
                  3
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider
          sx={{
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
          }}
        />

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"7px"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              padding: "0px 10px",
            },
          }}
        >
          <Box
            sx={{
              background: theme.palette.grey[400],
              borderRadius: "10px",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              padding={"18px 15px 0 15px"}
              alignItems={"center"}
            >
              <Typography fontSize={"16px"} color={theme.palette.grey[500]}>
                درآمد کلی دانشجو
              </Typography>

              <Select
                value={month}
                onChange={handleChange}
                variant="standard"
                IconComponent={() => <KeyboardArrowDownRoundedIcon />}
                MenuProps={{
                  sx: {
                    "& .MuiPaper-root": {
                      borderRadius: "10px",
                    },
                    "& .MuiList-root": {
                      padding: "8px 5px !important",
                      gap: "2px !important",
                    },
                    "& .MuiMenuItem-root": {
                      borderRadius: "10px",
                      fontSize: "11px",
                      color: theme.palette.grey[500],
                    },
                  },
                }}
                sx={{
                  minWidth: "108px",
                  border: "none",
                  "::before": { border: "none" },
                  ":hover:not(.Mui-disabled, .Mui-error):before": {
                    border: "none",
                  },
                  "::after": { border: "none" },

                  "& .MuiSelect-select": {
                    padding: "0px !important",
                    color: theme.palette.grey[600],
                    fontSize: "12px",
                  },
                  "& .MuiSvgIcon-root": {
                    right: "unset",
                    left: "7px",
                    fill: theme.palette.grey[600],
                    opacity: 0.5,
                    width: "13px",
                    height: "13px",
                  },
                }}
                displayEmpty
              >
                <MenuItem value={1}>۶ ماهه اول سال ۱۴۰۳</MenuItem>
                <MenuItem value={2}>۶ ماهه دوم سال ۱۴۰۳</MenuItem>
              </Select>
            </Box>

            <LineChart
              colors={[theme.palette.grey[600]]}
              xAxis={[
                {
                  scaleType: "band",
                  disableLine: true,
                  disableTicks: true,
                  hideTooltip: true,
                  data: [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                  ],
                },
              ]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  valueFormatter: (v) => `${v} میلیون تومان`,
                },
              ]}
              yAxis={[
                {
                  disableLine: true,
                  disableTicks: true,
                  valueFormatter: (value) => `${value} $`,
                },
              ]}
              tooltip={{
                trigger: "axis",
              }}
              grid={{ horizontal: true }}
              height={321}
              axisHighlight={{
                x: "band",
              }}
              sx={{
                [`& .${chartsGridClasses.line}`]: {
                  strokeDasharray: "4 4",
                  strokeWidth: 1,
                },

                [theme.breakpoints.up("sm")]: {
                  width: "390px !important",
                },
              }}
              slotProps={{
                popper: {
                  sx: {
                    "& .MuiChartsTooltip-paper": {
                      backgroundColor: theme.palette.primary[600],
                      borderRadius: "10px",

                      "& .MuiTypography-root": {
                        color: "white",
                      },
                    },
                    "& .MuiChartsTooltip-mark": {
                      display: "none",
                    },
                  },
                },
              }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"2px"}
            sx={{
              [theme.breakpoints.down("sm")]: {
                padding: "0px 6px",
              },
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                مجموع برگشتی ها
              </Typography>
              <Typography fontSize={"14px"} color={"error"}>
                -۵٬۰۰۰٬۰۰۰ تومان
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                مجموع فاکتور های دستی کسر شده
              </Typography>
              <Typography fontSize={"14px"} color={"error"}>
                0 تومان
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          display={"flex"}
          gap={"8px"}
          flexDirection={"column"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              padding: "0px 16px",
            },
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"} gap={"7px"} alignItems={"center"}>
              <Typography
                fontSize={"14px"}
                display={"inline"}
                color={theme.palette.grey[600]}
              >
                1
              </Typography>
              <Typography
                fontSize={"14px"}
                display={"inline"}
                color={theme.palette.grey[500]}
              >
                تکلیف شماره ۱
              </Typography>
            </Box>
            <Box display={"flex"} gap={"7px"} alignItems={"center"}>
              <Chip
                label="تایید شده"
                icon={
                  <ErrorOutlineRoundedIcon
                    sx={{ height: "15px", width: "15px" }}
                  />
                }
                color="primary"
                variant="outlined"
                sx={{
                  display: "flex",
                  height: "28px",
                  gap: "4px",
                  padding: "6px",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "12px",
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
              <CustomButton
                variant="outlined"
                sx={{
                  height: "24px",
                  maxWidth: "28px",
                  minWidth: "28px",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                ...
              </CustomButton>
            </Box>
          </Box>
          <Divider />
        </Box>

        <CustomButton
          sx={{
            height: "24px",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: theme.palette.primary[600],

            [theme.breakpoints.down("sm")]: {
              margin: "0px 16px",
            },
          }}
        >
          پیام به دانشجو
        </CustomButton>
      </Box>
    </Drawer>
  );
};
