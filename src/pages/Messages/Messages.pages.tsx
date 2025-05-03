import React, { useEffect, useRef, useState } from "react";
import { Box, Drawer, IconButton, useMediaQuery, CircularProgress, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

import theme from "theme";
import { AllMessages, ChatDetail } from "components";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel, MessageSocketDataTypes, MessageSocketPrivateChatConnectTypes } from "core/types";
import { allChatsApp } from "core/services";
import { useUsersStore } from "store/useUsers.store";
import WebSocketManager from "core/utils/WebSocketManager";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "پیــــــــام ها",
        link: "/messages",
        id: "0",
        color: theme.palette.grey[600],
        active: true,
    },
];

export const MessagesPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const [openMessage, setOpenMessage] = useState(false);
    const [allChatsData, setAllChatsData] = useState<MessageSocketDataTypes[]>([]);
    const [url, setUrl] = useState<string | null>(null);
    const [loadingPrivateChat, setLoadingPrivateChat] = useState(true);
    const [loadingAllChats, setLoadingAllChats] = useState(true);  // Loading state for all chats
    const [error, setError] = useState<string | null>(null);  // Error state

    const setName = useUsersStore((state) => state.setName);

    const wsManagerMain = useRef<WebSocketManager | null>(null);
    const privateWsRef = useRef<WebSocketManager | null>(null);

    // Load all chats
    useEffect(() => {
        const ws: any = new WebSocketManager(allChatsApp());
        wsManagerMain.current = ws;

        setLoadingAllChats(true);

        ws.on("open", () => {
            ws.send({ action: "load_chats" });
        });

        ws.on("message", (message: { data: any; }) => {
            setAllChatsData(message?.data || []);
            setLoadingAllChats(false);
        });

        ws.on("error", () => {
            setLoadingAllChats(false);
        });

        ws.connect();

        return () => ws.disconnect();
    }, []);

    // Handle private chat
    const handleClickMessage = (userId: string, userName: string) => {
        setOpenMessage(true);
        setName(userName);
        setLoadingPrivateChat(true);

        // Disconnect previous private WebSocket connection if exists
        if (privateWsRef.current) {
            privateWsRef.current.disconnect();
        }

        const newPrivateWs: any = new WebSocketManager(allChatsApp());
        privateWsRef.current = newPrivateWs;

        newPrivateWs.on("open", () => {
            newPrivateWs.send({
                action: "private_chat",
                data: { chat_with: userId },
            });
        });

        newPrivateWs.on("message", (message: MessageSocketPrivateChatConnectTypes) => {
            setLoadingPrivateChat(false);
            if (message?.data?.url) {
                setUrl(message.data.url);
            }
        });

        newPrivateWs.on("error", (error: Event) => {
            setLoadingPrivateChat(false);
            setError("Failed to load private chat.");
            console.error("WebSocket Error:", error);
        });

        newPrivateWs.connect();
    };

    return (
        <Box gap={isMobile ? "8px" : "16px"} display="flex" flexDirection="column">
            <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />

            {/* Loading state for all chats */}
            {loadingAllChats ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box display="flex" gap="2px" width="100%">
                    <AllMessages onClickMessage={handleClickMessage} data={allChatsData} />

                    {!isMobile && openMessage && url && (
                        <Box
                            bgcolor="white"
                            height="85vh"
                            borderRadius="10px 0px 0 0"
                            position="relative"
                            width="100%"
                            overflow="hidden"
                        >
                            {loadingPrivateChat ? <CircularProgress /> : <ChatDetail url={url} />}
                        </Box>
                    )}

                    {isMobile && (
                        <Drawer
                            anchor="left"
                            sx={{
                                "& .MuiDrawer-paper": {
                                    width: "100%",
                                    height: "100vh",
                                    position: "relative",
                                },
                            }}
                            open={openMessage}
                            onClose={() => {
                                setOpenMessage(false);
                                setUrl(null); // Reset URL when closing the drawer
                            }}
                        >
                            <IconButton
                                onClick={() => setOpenMessage(false)}
                                sx={{ position: "absolute", top: 10, left: 10, zIndex: 10000 }}
                            >
                                <ArrowBackIos />
                            </IconButton>
                            <Box bgcolor="white" height="100vh" borderRadius="10px 0px 0 0" position="relative" width="100%" overflow="hidden">
                                {loadingPrivateChat ? <CircularProgress /> : url && <ChatDetail url={url} />}
                            </Box>
                        </Drawer>
                    )}
                </Box>
            )}
        </Box>
    );
};
