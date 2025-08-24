import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    useMediaQuery,
    Snackbar,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

import theme from "theme";
import { AllMessages, ChatDetail } from "components";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel, MessageSocketDataTypes } from "core/types";
import { useUsersStore } from "store/useUsers.store";
import { SocketContext } from "../../contexts/SocketContext.contexts";
import { useMessagesStore } from "store/useMessages.store";

const breadcrumbData: BreadCrumbsModel[] = [
    {
        title: "پیــــــــام ها",
        link: "/messages",
        id: "0",
        color: theme.palette.grey[600],
        active: true,
    },
];

export type ChatRoomType = {
    uuid: any;
    display_name: any;
    last_message: any;
    unread_messages: any;
    chat_id: any;
    chat_with: any;
};

export const MessagesPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const [openMessage, setOpenMessage] = useState(false);

    const [chats, setChats] = useState<MessageSocketDataTypes[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    const setName = useUsersStore((state) => state.setName);
    const { fetchStudentsListMessagesData } = useMessagesStore();

    const { getConnection, releaseConnection } = useContext(SocketContext);
    const endpoint = "wss://etekanesh.com/ws/app/";
    const chatApp = getConnection(endpoint);

    const [open, setOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const showNotification = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    // Handle private chat
    const handleClickMessage = (userName: string, chatId: string) => {
        setSelectedChatId(chatId);
        setOpenMessage(false);
        setTimeout(() => {
            setOpenMessage(true);
        }, 100);
        setName(userName);
    };

    const handleClickNewMessage = (userName: string, userId: string) => {
        chatApp.send({
            action: "private_chat",
            data: {
                chat_with: userId,
            },
        });
        chatApp.on("message", "private_chat", (message: { data: any }) => {
            setSelectedChatId(message.data.chat_id);
            chatApp.send({ action: "load_chats" });
        });

        chatApp.on("message", "load_chats", (message: { data: any }) => {
            setChats(message.data);
        });

        chatApp.connect();
        setOpenMessage(false);
        setTimeout(() => {
            setOpenMessage(true);
        }, 100);
        setName(userName);
    };

    useEffect(() => {
        fetchStudentsListMessagesData({ page: 1, action: "student_search" });
    }, []);

    // Load all chats
    useEffect(() => {
        chatApp.addEventListener("open", () => {
            chatApp.send({ action: "load_chats" });
        });

        chatApp.on("message", "load_chats", (message: { data: any }) => {
            setChats(message.data);
        });

        chatApp.on("error", (error: { status_code: number }) => {
            console.log(error);
        });

        chatApp.on(
            "event",
            "new_message",
            (event: {
                data: {
                    message: {
                        sender: { first_name: any; last_name: any };
                        content: any;
                    };
                };
            }) => {
                let msg = `یک پیام جدید از ${event.data.message.sender.first_name} ${event.data.message.sender.last_name}\n${event.data.message.content}`;
                setNotificationMessage(msg);
                event.data.message.sender.first_name && showNotification();
            }
        );

        chatApp.connect();

        return () => {
            releaseConnection(endpoint);
        };
    }, [chatApp]);

    return (
        <Box gap={isMobile ? "8px" : "16px"} display="flex" flexDirection="column">
            <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpen(false)}
                message={notificationMessage}
                autoHideDuration={3000}
                sx={{
                    "& .MuiSnackbarContent-root": {
                        backgroundColor: "#008C64",
                        color: "white",
                    },
                }}
            />
            <Box display="flex" gap="2px" width="100%">
                <AllMessages
                    onClickMessage={handleClickMessage}
                    data={chats}
                    onCLickNewMessages={handleClickNewMessage}
                />

                {!isMobile && openMessage && selectedChatId && (
                    <Box
                        bgcolor="white"
                        height="85vh"
                        borderRadius="10px 0px 0 0"
                        position="relative"
                        width="100%"
                        overflow="hidden"
                    >
                        <ChatDetail selectedChat={selectedChatId} />
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
                        }}
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
                            borderRadius="10px 0px 0 0"
                            position="relative"
                            width="100%"
                            overflow="hidden"
                        >
                            {selectedChatId && <ChatDetail selectedChat={selectedChatId} />}
                        </Box>
                    </Drawer>
                )}
            </Box>
        </Box>
    );
};
