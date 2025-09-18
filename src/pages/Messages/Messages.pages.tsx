import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    Snackbar,
    useMediaQuery,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

import theme from "theme";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "core/types";
import { useUsersStore } from "store/useUsers.store";
import { SocketContext } from "../../contexts/SocketContext.contexts";
import { getWSAppURL } from "core/services";
import { AllMessages, ChatDetail } from "components/messages";
import { useChatsStore } from "store/useChat.store";

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
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    const setName = useUsersStore((state) => state.setName);
    const { chats, loading, setLoading, setChats, updateChat } = useChatsStore();
    const { getConnection, releaseConnection } = useContext(SocketContext);
    const { userData } = useUsersStore();

    const currentUserId = userData?.uuid;
    const appEndpoint = getWSAppURL();
    const chatApp = getConnection(appEndpoint);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const showNotification = (msg: string) => {
        setNotificationMessage(msg);
        setOpenSnackbar(true);
        setTimeout(() => setOpenSnackbar(false), 3000);
    };

    const handleClickMessage = (
        userName: string,
        chatId: string,
        lastMessageUuid: string
    ) => {
        const updatedChats = { ...chats };
        Object.keys(updatedChats).forEach((key) => {
            if (updatedChats[key].last_message.uuid === lastMessageUuid) {
                updatedChats[key] = {
                    ...updatedChats[key],
                    last_message: {
                        ...updatedChats[key].last_message,
                        seen: true,
                    },
                };
            }
        });

        setChats(updatedChats)
        setSelectedChatId(chatId);
        setOpenMessage(false);
        setTimeout(() => setOpenMessage(true), 100);
        setName(userName);
    };

    useEffect(() => {
        setLoading(true);

        const handleOpen = () => {
            chatApp.send({ action: "load_chats" });
        };

        const handleLoadChats = (message: { data: any[] }) => {
            const customChats: Record<string, any> = {};
            message.data.forEach((item) => (customChats[item.uuid] = item));
            setChats(customChats);
            setLoading(false);
        };

        const handleNewMessage = (event: {
            data: { chat: string; message: any };
        }) => {
            const { chat: chatId, message } = event.data;

            const isMe = message.sender.uuid === currentUserId;

            const newMessage = {
                ...message,
                sender: {
                    ...message.sender,
                    is_me: isMe,
                },
            };

            // نمایش نوتیفیکیشن فقط برای پیام‌های دیگران
            if (!isMe) {
                const msgText = `یک پیام جدید از ${message.sender.first_name} ${message.sender.last_name}\n${message.content}`;
                showNotification(msgText);
            }

            // آپدیت last_message در store
            updateChat(chatId, { last_message: newMessage });
        };

        chatApp.addEventListener("open", handleOpen);
        chatApp.on("message", "load_chats", handleLoadChats);
        chatApp.on("event", "new_message", handleNewMessage);
        chatApp.on("error", () => setLoading(false));

        chatApp.connect();

        return () => releaseConnection(appEndpoint);
    }, [chatApp, currentUserId, setChats]);

    return (
        <Box gap={isMobile ? "8px" : "16px"} display="flex" flexDirection="column">
            <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpenSnackbar(false)}
                message={notificationMessage}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "#008C64",
                        color: "white",
                    },
                }}
            />

            <Box display="flex" gap="2px" width="100%">
                <AllMessages
                    data={Object.values(chats)}
                    loading={loading}
                    onClickMessage={handleClickMessage}
                    onCLickNewMessages={(userName, userId) => {
                        chatApp.send({
                            action: "private_chat",
                            data: { chat_with: userId },
                        });
                        chatApp.on("message", "private_chat", (message: { data: any }) => {
                            setSelectedChatId(message.data.chat_id);
                            chatApp.send({ action: "load_chats" });
                        });
                        setOpenMessage(false);
                        setTimeout(() => setOpenMessage(true), 100);
                        setName(userName);
                    }}
                />

                {!isMobile && openMessage && selectedChatId && (
                    <Box
                        bgcolor="white"
                        height="85vh"
                        borderRadius="10px 0 0 0"
                        position="relative"
                        width="100%"
                        overflow="hidden"
                    >
                        <ChatDetail
                            selectedChat={selectedChatId}
                            chatApp={chatApp}
                            onMessageSent={() => chatApp.send({ action: "load_chats" })}
                        />
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
                        onClose={() => setOpenMessage(false)}
                    >
                        <IconButton
                            onClick={() => setOpenMessage(false)}
                            sx={{ position: "absolute", top: 10, left: 10, zIndex: 10000 }}
                        >
                            <ArrowBackIos />
                        </IconButton>
                        <Box
                            bgcolor="white"
                            height="100vh"
                            borderRadius="10px 0 0 0"
                            position="relative"
                            width="100%"
                            overflow="hidden"
                        >
                            {selectedChatId && (
                                <ChatDetail
                                    selectedChat={selectedChatId}
                                    chatApp={chatApp}
                                    onMessageSent={() => chatApp.send({ action: "load_chats" })}
                                />
                            )}
                        </Box>
                    </Drawer>
                )}
            </Box>
        </Box>
    );
};

