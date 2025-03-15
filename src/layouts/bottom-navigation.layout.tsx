import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";

import {
    DashboardIcon,
    InvoicesIcon,
    MarketingIcons,
    MessagesIcons,
} from "uiKit";
import theme from "theme";

const BottomItems = [
    {
        title: "داشبورد",
        icon: <DashboardIcon />,
        link: "/dashboard",
    },
    {
        title: "گزارش مالی",
        icon: <InvoicesIcon color={theme.palette.grey[600]} />,
        link: "/financial-reports",
    },
    {
        title: "فروش",
        icon: <MarketingIcons />,
        link: "/marketing",
    },
    {
        title: "پیام ها",
        icon: <MessagesIcons />,
        link: "/messages",
    },
    {
        title: "بیشتـــــــــر",
        icon: <MenuIcon />,
    },
];

export const BottomNavigationLayout: React.FC = () => {
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
                setValue(newValue);
            }}
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                height: 65,
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
                    padding: 0
                },
            }}
        >
            {BottomItems.map((item) => (
                <BottomNavigationAction label={item?.title} icon={item?.icon} />
            ))}
        </BottomNavigation>
    );
};
