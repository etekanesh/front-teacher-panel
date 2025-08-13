import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMore from "@mui/icons-material/ExpandMore";

import theme from "theme";

import MainLogo from "assets/main-logo.png";
import Logo from "assets/logo.png";
import { Collapse, Divider, Typography, useMediaQuery } from "@mui/material";
import {
  DashboardIcon,
  EditIcons,
  ExitIcons,
  ForumIcons,
  InvoicesIcon,
  ListIcons,
  MarketingIcons,
  MessagesIcons,
  TaskIcons,
} from "uiKit";
import { BottomNavigationLayout } from "./bottom-navigation.layout";
import { HeaderMobileLayout } from "./header-mobile.layout";
import { useUsersStore } from "store/useUsers.store";
import { getRoleName } from "core/utils";

const drawerWidth = 258;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const SidebarMenu = [
  {
    title: "داشبـــــــــورد",
    icon: (color: any) => <DashboardIcon color={color} />,
    link: "/teacher/dashboard",
  },
  {
    title: "فروش و مارکتینگ",
    icon: (color: any) => <MarketingIcons color={color} />,
    // link: "/teacher/marketingt",
    link: "/",
    child: [
      {
        title: "مدیریت فروش و درآمد",
        link: "/teacher/marketing/sales-income-management",
      },
      {
        title: "مدیریت وبینارها",
        link: "/teacher/marketing/webinars-management",
      },
      {
        title: "فروش مستقیم مدرس",
        link: "/teacher/marketing/direct-sale-teacher",
      },
    ],
  },
  {
    title: "مدیریت دوره ها",
    icon: (color: any) => <TaskIcons color={color} />,
    // link: "/teacher/courses",
    link: "/",
  },
  {
    title: "مدیریت دانشجویان",
    icon: (color: any) => <ListIcons color={color} />,
    link: "/teacher/students",
  },
  {
    title: "گزارش مالــــــی",
    icon: (color: any) => <InvoicesIcon color={color} />,
    link: "/teacher/financial-reports",
    child: [
      {
        title: "جزئیات درآمد دانشجویان",
        icon: <DashboardIcon />,
        link: "/teacher/financial-reports/student-income",
      },
      {
        title: "جزئیات درآمد فروش",
        icon: <DashboardIcon />,
        link: "/teacher/financial-reports/sales-income",
      },
    ],
  },
  {
    title: "پیــــــــام ها",
    icon: (color: any) => <MessagesIcons color={color} />,
    // link: "/teacher/messages",
    link: "/",
  },
  {
    title: "فــــــــــروم ",
    icon: (color: any) => <ForumIcons color={color} />,
    link: "https://etekanesh.com/dashboard/go-to-forum/",
  },
  {
    title: "ویرایش حساب کاربــــــــری ",
    icon: (color: any) => <EditIcons color={color} />,
    link: "/teacher/account-settings",
    child: [
      {
        title: "مشخصات عمومـــــــــی",
        link: "/teacher/account/general-info",
      },
      {
        title: "مشخصات حساب بانکـی",
        link: "/teacher/account/bank-info",
      },
      {
        title: "قـــــــرارداد",
        link: "/teacher/account/contracts",
      },
    ],
  },
];

export const MainLayout: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const location = useLocation();
  const navigate = useNavigate();

  const { fetchUserData, userData, fetching } = useUsersStore();

  const [open, setOpen] = useState(true);
  const [isRoleChecked, setIsRoleChecked] = useState(false);

  const [openSubMenu, setOpenSubMenu] = useState<any>({});

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => {
    setOpen(false);
    setOpenSubMenu(false);
  };

  const handleToggleSubMenu = (title: string) => {
    setOpenSubMenu((prev: any) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleItemClick = (item: any) => {
    if (item.child) {
      if (!open) {
        navigate(item.child[0].link);
      } else {
        handleToggleSubMenu(item.title);
      }
    }
  };

  useEffect(() => {
    fetchUserData()
  }, []);

  useEffect(() => {
    if (!fetching && userData && !isRoleChecked) {
      setIsRoleChecked(true);

      const targetPath = userData.role === 3 ? "/teacher/dashboard" : "/dashboard";

      if (location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [userData, fetching, isRoleChecked, navigate, location.pathname]);

  return (
    <>
      {!isMobile ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box>
            {!open ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    position: "absolute",
                    right: 66,
                    zIndex: 10000000,
                    top: 48,
                    border: "1px solid",
                    borderRadius: "8px",
                    borderColor: "#EDF0EF",
                    background: "white",
                    width: 32,
                    height: 32,
                    padding: "10px",
                  },
                  open && { display: "none" },
                ]}
              >
                <WestIcon
                  sx={{
                    color: theme.palette.primary[600],
                    width: 16,
                    height: 16,
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleDrawerClose}
                sx={[
                  {
                    position: "absolute",
                    right: 233,
                    zIndex: 10000000,
                    top: 48,
                    border: "1px solid",
                    borderRadius: "8px",
                    borderColor: "#EDF0EF",
                    background: "white",
                    width: 32,
                    height: 32,
                    padding: "10px",
                  },
                ]}
              >
                <EastIcon
                  sx={{
                    color: theme.palette.primary[600],
                    width: 16,
                    height: 16,
                  }}
                />
              </IconButton>
            )}
          </Box>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader
              sx={{
                padding: "46px 26px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!open ? (
                <>
                  <Box
                    component="img"
                    src={Logo}
                    alt="Image"
                    sx={{
                      width: 35,
                      height: 38,
                    }}
                  />
                </>
              ) : (
                <Box padding={0} display={"flex"} alignItems={"center"}>
                  <Box
                    component="img"
                    src={MainLogo}
                    alt="academy_logo"
                    sx={{
                      width: 180,
                      height: 38,
                    }}
                  />
                </Box>
              )}
            </DrawerHeader>
            <Box
              display={"flex"}
              sx={{ padding: open ? "0 26px" : "0 11px" }}
              flexDirection={"column"}
              gap={"42px"}
            >
              <Box
                display={"flex"}
                borderTop={"1px solid"}
                borderBottom={"1px solid"}
                borderColor={"#EDF0EF"}
                padding={"14px 0"}
                gap={"12px"}
                justifyContent={open ? "flex-start" : "center"}
                position={"relative"}
              >
                <Box
                  component="img"
                  src={userData?.profile ? userData?.profile : "https://etekanesh.com/static/panel/media/avatars/blank.png"}
                  alt="user_image"
                  sx={{
                    width: 51,
                    height: 51,
                    borderRadius: "50%",
                  }}
                />
                <CheckCircleRoundedIcon
                  color="primary"
                  sx={{
                    position: "absolute",
                    right: open ? "35px" : "44px",
                    border: "1px solid",
                    borderRadius: "50%",
                    borderColor: "white",
                    width: "15px",
                    height: " 15px",
                    top: "12px",
                    background: "white",
                  }}
                />

                {open && (
                  <Box display={"flex"} flexDirection={"column"}>
                    <Typography
                      fontSize={18}
                      fontWeight={"700"}
                      color="#334155"
                    >
                      {userData?.first_name} {userData?.last_name}
                    </Typography>
                    <Typography fontSize={12} color={theme.palette.grey[600]}>
                      {getRoleName(userData?.role)} آکادمی
                    </Typography>
                  </Box>
                )}
              </Box>
              <List disablePadding>
                {SidebarMenu.map((item) => {
                  const isActive =
                    location.pathname === item.link ||
                    item.child?.some((sub) => location.pathname === sub.link);

                  return (
                    <React.Fragment key={item.title}>
                      <ListItem
                        key={item?.title}
                        disablePadding
                        sx={{ display: "block", fontSize: "22px" }}
                      >
                        <ListItemButton
                          onClick={() => handleItemClick(item)}
                          sx={{
                            minHeight: 22,
                            height: 22,
                            padding: 0,
                            display: "flex",
                            gap: "16px",
                            justifyContent: open ? "initial" : "center",
                            cursor: item.link === "/" ? "default" : "pointer",
                            "&:hover":
                              item.link === "/"
                                ? {
                                  backgroundColor: "transparent",
                                }
                                : {},
                          }}
                          disableRipple={item.link === "/"}
                          disabled={item.link === "/"}
                        >
                          <ListItemIcon
                            sx={[
                              {
                                minWidth: 0,
                                justifyContent: "center",
                                color: isActive
                                  ? theme.palette.primary[600]
                                  : "inherit",
                              },
                            ]}
                          >
                            {item?.icon(
                              isActive
                                ? theme.palette.primary[600]
                                : theme.palette.grey[600]
                            )}
                          </ListItemIcon>
                          {open && (
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              sx={{ height: "11px" }}
                            />
                          )}
                          <ListItemText
                            sx={[
                              open
                                ? {
                                  opacity: 1,
                                  textAlign: "right",
                                  color: isActive
                                    ? theme.palette.primary[600]
                                    : theme.palette.grey[600],
                                  fontWeight: isActive ? 700 : 500,
                                }
                                : {
                                  display: "none",
                                  opacity: 0,
                                },
                            ]}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 500,
                              }}
                            >
                              {item?.title}
                            </Typography>
                          </ListItemText>
                          {open &&
                            item.child &&
                            (openSubMenu[item.title] ? (
                              <RemoveIcon
                                sx={{
                                  color: theme.palette.grey[600],
                                  width: 16,
                                  height: 16,
                                }}
                              />
                            ) : (
                              <ExpandMore
                                sx={{
                                  color: theme.palette.grey[600],
                                  width: 16,
                                  height: 16,
                                }}
                              />
                            ))}
                        </ListItemButton>
                        {!item.child &&
                          item.link !== "/" &&
                          (item.link.startsWith("https") ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                right: 0,
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <Link
                              to={item.link}
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                right: 0,
                                cursor: "pointer",
                              }}
                            />
                          ))}
                      </ListItem>

                      {item.child && (
                        <Collapse
                          in={openSubMenu[item.title]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {item.child.map((subItem) => {
                              const isSubActive =
                                location.pathname === subItem.link;
                              return (
                                <ListItem key={subItem.title} disablePadding>
                                  <ListItemButton
                                    component={Link}
                                    to={subItem.link}
                                    sx={{
                                      paddingLeft: open ? 4 : 2,
                                      color: isSubActive
                                        ? theme.palette.primary[600]
                                        : theme.palette.grey[600],
                                      fontWeight: isSubActive ? 700 : 500,
                                    }}
                                  >
                                    {/* {subItem.icon && (
                                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                                    )} */}
                                    <ListItemText>
                                      <Typography sx={{ fontSize: 13 }}>
                                        {subItem?.title}
                                      </Typography>
                                    </ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      )}
                    </React.Fragment>
                  );
                })}
              </List>
              <Link
                to={"https://etekanesh.com/account/logout/"}
                style={{ cursor: "pointer" }}
              >
                <Box
                  display={"flex"}
                  gap={"12px"}
                  alignItems={"center"}
                  justifyContent={open ? "flex-start" : "center"}
                >
                  <ExitIcons />
                  {open && (
                    <>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        sx={{ height: "11px" }}
                      />
                      <Typography
                        color="#EF5353"
                        fontSize={"14px"}
                        fontWeight={600}
                      >
                        خروج از حساب کاربری
                      </Typography>
                    </>
                  )}
                </Box>
              </Link>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: "42px 12px" }}
            bgcolor={"#F5F9F8"}
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
            height={"100vh"}
            overflow={"auto"}
          >
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"column"} position={"relative"}>
          <HeaderMobileLayout />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
            padding={isMobile ? 0 : "42px 12px"}
            bgcolor={"#F5F9F8"}
            height={"100vh"}
            overflow={"scroll"}
            paddingBottom={"120px"}
          >
            <Outlet />
          </Box>
          <BottomNavigationLayout />
        </Box>
      )}
    </>
  );
};
