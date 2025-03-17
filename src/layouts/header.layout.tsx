import React from "react";
import Link from "@mui/material/Link";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Menu,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import theme from "theme";
import { BreadCrumbsModel } from "types";
import { LiveTime, PersianDate } from "core/utils";
import avatar from "assets/avatar-Image.png";

type Props = {
  title: string;
  breadcrumb: BreadCrumbsModel[];
};

export const HeaderLayout: React.FC<Props> = ({ title, breadcrumb }) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      padding={isMobile ? "8px 14px" : "8px 16px"}
      height={isMobile ? "44px" : "auto"}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          color={theme.palette.grey[500]}
          fontWeight={700}
          fontSize={20}
          display={isMobile ? "none" : "block"}
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
      <Box
        display={"flex"}
        gap={"15px"}
        alignItems={"center"}
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            display: "none",
          },
        }}
      >
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
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ padding: "0px", minWidth: "40px", borderRadius: "50%" }}
        >
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
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            "& .MuiPaper-root": {
              border: "1px solid ",
              borderColor: theme.palette.grey[400],
              borderRadius: "11px",
              boxShadow: "-12px 0px 67.1px 0px #6B857E17",
            },
            "& .MuiPaper-root ul": {
              gap: "5px !important",
              paddingBottom: "10px !important",
              padding: "10px",
              borderBottom: "none",
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
                  left: 23,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Typography
            fontSize={"14px"}
            fontWeight={700}
            color={theme.palette.grey[500]}
            pr={"5px"}
          >
            اعلانات شما
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"4px"}
            sx={{
              overflowY: "auto",
              height: "260px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box
              width={"187px"}
              padding={"8px 10px"}
              display={"flex"}
              gap={"7px"}
              bgcolor={theme.palette.grey[400]}
              borderRadius={"8px"}
            >
              <Box
                component={"img"}
                borderRadius={"50%"}
                width={"32.5px"}
                height={"32.5px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                src={avatar}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  تیدا گودرزی
                </Typography>
                <Typography fontSize={"11px"} color={theme.palette.grey[600]}>
                  لورم ایپسوم متن با تولید...
                </Typography>
              </Box>
              <CloseRoundedIcon
                sx={{
                  color: theme.palette.grey[600],
                  width: "15px",
                  height: "15px",
                }}
              />
            </Box>
            <Box
              width={"187px"}
              padding={"8px 10px"}
              display={"flex"}
              justifyContent={"space-between"}
              bgcolor={"#EF53530D"}
              border={"1px solid"}
              borderColor={theme.palette.error[500]}
              borderRadius={"8px"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  هشدار وبینار
                </Typography>
                <Typography fontSize={"11px"} color={theme.palette.grey[600]}>
                  با استفاده از طراحان گرافیک است.
                </Typography>
              </Box>
              <CloseRoundedIcon
                sx={{
                  color: theme.palette.grey[600],
                  width: "15px",
                  height: "15px",
                }}
              />
            </Box>
            <Box
              width={"187px"}
              padding={"8px 10px"}
              display={"flex"}
              justifyContent={"space-between"}
              bgcolor={theme.palette.grey[400]}
              borderRadius={"8px"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  هشدار وبینار
                </Typography>
                <Typography fontSize={"11px"} color={theme.palette.grey[600]}>
                  با استفاده از طراحان گرافیک است.
                </Typography>
              </Box>
              <CloseRoundedIcon
                sx={{
                  color: theme.palette.grey[600],
                  width: "15px",
                  height: "15px",
                }}
              />
            </Box>
            <Box
              width={"187px"}
              padding={"8px 10px"}
              display={"flex"}
              justifyContent={"space-between"}
              bgcolor={theme.palette.grey[400]}
              borderRadius={"8px"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  هشدار وبینار
                </Typography>
                <Typography fontSize={"11px"} color={theme.palette.grey[600]}>
                  با استفاده از طراحان گرافیک است.
                </Typography>
              </Box>
              <CloseRoundedIcon
                sx={{
                  color: theme.palette.grey[600],
                  width: "15px",
                  height: "15px",
                }}
              />
            </Box>
            <Box
              width={"187px"}
              padding={"8px 10px"}
              display={"flex"}
              gap={"7px"}
              bgcolor={theme.palette.grey[400]}
              borderRadius={"8px"}
            >
              <Box
                component={"img"}
                borderRadius={"50%"}
                width={"32.5px"}
                height={"32.5px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                src={avatar}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography fontSize={"12px"} color={theme.palette.grey[500]}>
                  تیدا گودرزی
                </Typography>
                <Typography fontSize={"11px"} color={theme.palette.grey[600]}>
                  لورم ایپسوم متن با تولید...
                </Typography>
              </Box>
              <CloseRoundedIcon
                sx={{
                  color: theme.palette.grey[600],
                  width: "15px",
                  height: "15px",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: "187px",
              boxShadow: "0px -17px 22.1px 8px #ffffffd9",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                height: "23px",
                fontSize: "12px",
                borderColor: theme.palette.grey[400],
                width: "100%",
              }}
            >
              همه پیام ها
            </Button>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};
