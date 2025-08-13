import React from "react";
import { Box, Button, Divider, Menu, Typography } from "@mui/material";
// import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import theme from "theme";
import MainLogo from "assets/main-logo.png";
import AvatarImage from "assets/avatar-Image.png";
import { useUsersStore } from "store/useUsers.store";

export const HeaderMobileLayout: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { userData } = useUsersStore();

  const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      padding={"17px"}
      display={"flex"}
      alignItems={"center"}
      height={74}
      justifyContent={"space-between"}
    >
      <Box
        component="img"
        src={MainLogo}
        alt="academy_logo"
        sx={{
          width: 180,
          height: 38,
        }}
      />
      <Box display={"flex"} gap={"10px"} alignItems={"center"}>
        <Box
          display={"flex"}
          borderTop={"1px solid"}
          borderBottom={"1px solid"}
          borderColor={"#EDF0EF"}
          padding={"14px 0"}
          gap={"12px"}
          justifyContent={"center"}
          position={"relative"}
        >
          <Box
            component="img"
            src={userData?.profile ? userData?.profile : "https://etekanesh.com/static/panel/media/avatars/blank.png"}
            alt="user_image"
            sx={{
              width: 47,
              height: 47,
              borderRadius: "50%",
            }}
          />
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ height: "11px" }}
        />

        {/* <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ padding: "0px", minWidth: "47px", borderRadius: "50%" }}
        >
          <Box
            width={47}
            height={47}
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
              width={22}
              height={22}
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
        </Button> */}

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
                src={`https://etekanesh.com/${userData?.profile}`}
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
                src={AvatarImage}
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
