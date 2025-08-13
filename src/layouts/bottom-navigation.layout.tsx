import React, { useState, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

import {
  DashboardIcon,
  InvoicesIcon,
  MarketingIcons,
  MessagesIcons,
  // TaskIcons,
  EditIcons,
  ForumIcons,
  ListIcons,
} from "uiKit";
import theme from "theme";

interface NavigationItem {
  title: string;
  icon: any;
  link?: string;
  submenu?: NavigationItem[];
}

const BottomItems: NavigationItem[] = [
  {
    title: "داشبورد",
    icon: (color: any) => <DashboardIcon color={color} />,
    link: "/teacher/dashboard",
  },
  {
    title: "گزارش مالی",
    icon: (color: any) => <InvoicesIcon color={color} />,
    link: "/teacher/financial-reports/sales-income",
  },
  {
    title: "فروش",
    icon: (color: any) => <MarketingIcons color={color} />,
    // link: "/marketing",
    link: "/",
  },
  {
    title: "پیام ها",
    icon: (color: any) => <MessagesIcons color={color} />,
    link: "/",
  },
  {
    title: "بیشتـــــــــر",
    icon: (color: any) => <MenuIcon color={color} />,
    submenu: [
      //   {
      //     title: "مدیریت دوره ها",
      //     icon: (color: any) => <TaskIcons color={color} />,
      //     // link: "/courses",
      //     link: "/",
      //   },
      {
        title: "ویرایش حساب کاربــــــــری",
        icon: (color: any) => <EditIcons color={color} />,
        link: "/teacher/account/general-info",
      },
      {
        title: "فــــــــــروم",
        icon: (color: any) => <ForumIcons color={color} />,
        link: "https://etekanesh.com/dashboard/go-to-forum/",
      },
      {
        title: "مدیریت دانشجویان",
        icon: (color: any) => <ListIcons color={color} />,
        link: "/teacher/students",
      },
    ],
  },
];

export const BottomNavigationLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(location.pathname || "");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue: string) => {
          setValue(newValue || "");
          navigate(newValue || "");
        }}
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: 65,
          zIndex: 1000,
          padding: 0,
          "& .MuiBottomNavigationAction-label.Mui-selected": {
            fontSize: 10,
          },
          "& .MuiBottomNavigationAction-root": {
            gap: "6px",
            fontSize: 10,
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: 10,
          },
          "& .MuiBottomNavigation-root": {
            padding: 0,
          },
        }}
      >
        {BottomItems.map((item) =>
          item.submenu ? (
            <BottomNavigationAction
              key={item.title}
              label={item.title}
              icon={item.icon(
                location.pathname === item.link
                  ? theme.palette.primary[600]
                  : theme.palette.grey[600]
              )}
              onClick={handleMenuOpen}
            />
          ) : (
            <BottomNavigationAction
              key={item.link || item.title}
              label={item.title}
              icon={item.icon(
                item.link === "/"
                  ? theme.palette.grey[300]
                  : location.pathname === item.link
                    ? theme.palette.primary[600]
                    : theme.palette.grey[600]
              )}
              value={item.link || ""}
              onClick={() => {
                if (item.link && item.link !== "/") navigate(item.link);
              }}
              sx={{
                color:
                  item.link === "/"
                    ? theme.palette.grey[300]
                    : location.pathname === item.link
                      ? theme.palette.primary[600]
                      : theme.palette.grey[600],
                fontSize: "12px",
                cursor: item.link === "/" ? "not-allowed" : "pointer",
              }}
              disabled={item.link === "/"}
            />
          )
        )}
      </BottomNavigation>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
            gap: "0 !important",
            paddingBottom: "10px !important",
            padding: "8px",
            borderBottom: "none",
          },
          "& .MuiMenuItem-root": {
            padding: "8px",
          },
        }}
        // slotProps={{
        //   paper: {
        //     elevation: 0,

        //     sx: {
        //       overflow: "visible",
        //       mt: "10px",

        //       "&::before": {
        //         content: '""',
        //         display: "block",
        //         position: "absolute",
        //         top: 138,
        //         left: 10,
        //         width: 10,
        //         height: 10,
        //         bgcolor: "background.paper",
        //         transform: "translateY(-50%) rotate(50deg)",
        //         zIndex: 0,
        //       },
        //     },
        //   },
        // }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {BottomItems.find((item) => item.submenu)?.submenu?.map((subItem) => (
          <MenuItem
            key={subItem.link || subItem.title}
            onClick={() => {
              if (subItem.link && subItem.link !== "/") {
                if (subItem.link.startsWith("http")) {
                  window.open(subItem.link, "_blank");
                } else {
                  navigate(subItem.link);
                }
              }
              handleMenuClose();
            }}
            disabled={subItem.link === "/"}
            sx={{
              color:
                subItem.link === "/"
                  ? theme.palette.grey[400]
                  : location.pathname === subItem.link
                    ? theme.palette.primary[600]
                    : theme.palette.grey[600],
              fontSize: "12px",
              cursor: subItem.link === "/" ? "not-allowed" : "pointer",
            }}
          >
            <Box display={"flex"} gap={"4px"} alignItems="center">
              {subItem.icon(
                subItem.link && location.pathname === subItem.link
                  ? theme.palette.primary[600]
                  : theme.palette.grey[600]
              )}{" "}
              {subItem.title}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
