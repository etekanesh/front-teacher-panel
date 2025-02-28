import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuIcon from "@mui/icons-material/Menu";

import { DashboardIcon, InvoicesIcon, MarketingIcons, MessagesIcons } from "uiKit";
import theme from "theme";

const BottomItems = [
    {
        title: "داشبـــــــــورد",
        icon: <DashboardIcon />,
        link: "",
    },
    {
        title: "گزارش مالــــــی",
        icon: <InvoicesIcon color={theme.palette.grey[600]} />,
        link: "/",
    },
    {
        title: "فروش",
        icon: <MarketingIcons />,
        link: "/",
    },
    {
        title: "پیــــــــام ها",
        icon: <MessagesIcons />,
        link: "/",
    },
    {
        title: "بیشتـــــــــر",
        icon: <MenuIcon />,
        link: "/",
    },
];

export const BottomNavigationLayout: React.FC = () => {
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                height: 65,
            }}
        >
            {BottomItems.map((item) => (
                <BottomNavigationAction label={item?.title} icon={item?.icon} />
            ))}
        </BottomNavigation>
    );
};
