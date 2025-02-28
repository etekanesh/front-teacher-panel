import React from "react";
import { Box, Divider } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import theme from "theme";
import MainLogo from "assets/main-logo.png";
import AvatarImage from "assets/avatar-Image.png";

export const HeaderMobileLayout: React.FC = () => {
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
                alt="Local Image"
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
                        src={AvatarImage}
                        alt="Local Image"
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
                        bgcolor={theme.palette.warning[500]}
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
            </Box>
        </Box>
    );
};

