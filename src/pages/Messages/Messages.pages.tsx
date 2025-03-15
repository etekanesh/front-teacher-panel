import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

import theme from "theme";
import { BreadCrumbsModel } from "types";
import { ChatTextInput, AllMessages, ChatDetail } from "components";
import { HeaderLayout } from "layouts";

export const MessagesPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const navigate = useNavigate();

    const [openMessage, setOpenMessage] = useState(false);
    const breadcrumbData: BreadCrumbsModel[] = [
        {
            title: "پیــــــــام ها",
            link: "/messages",
            id: "0",
            color: theme.palette.grey[600],
            active: true,
        },
    ];

    const handleClickMessage = () => {
        setOpenMessage(true);
    };

    return (
        <Box
            gap={isMobile ? "8px" : "16px"}
            display={"flex"}
            flexDirection={"column"}
        >
            <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />
            <Box display={"flex"} gap={"2px"} width={"100%"}>
                <AllMessages onClickMessage={handleClickMessage} />
                {openMessage && !isMobile && (
                    <Box
                        bgcolor={"white"}
                        height={"90vh"}
                        borderRadius={"10px 0px 0 0"}
                        position={"relative"}
                        width={"100%"}
                        overflow={"hidden"}
                    >
                        <ChatDetail />
                        <ChatTextInput
                            onSendMessage={function (message: string): void {
                                console.log(message);
                            }}
                        />
                    </Box>
                )}
                {/* Drawer Component */}
                {isMobile && (
                    <Drawer
                        anchor="left"
                        sx={{
                            "& .MuiDrawer-paper": {
                                width: "100%", // Ensures full width
                                height: "100vh", // Optional: Makes it fullscreen
                                position: "relative",
                            },
                        }}
                        open={openMessage}
                        onClose={() => setOpenMessage(false)}
                    >
                        <IconButton
                            onClick={() => {
                                setOpenMessage(false);
                                navigate("/");
                            }}
                            sx={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                zIndex: 10000,
                            }}
                        >
                            <ArrowBackIos />
                        </IconButton>
                        <Box
                            bgcolor={"white"}
                            height={"100vh"}
                            borderRadius={"10px 0px 0 0"}
                            position={"relative"}
                            width={"100%"}
                            overflow={"hidden"}
                        >
                            <ChatDetail />
                            <ChatTextInput
                                onSendMessage={function (message: string): void {
                                    console.log(message);
                                }}
                            />
                        </Box>
                    </Drawer>
                )}
            </Box>
        </Box>
    );
};
