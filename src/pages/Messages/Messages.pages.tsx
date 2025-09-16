import React, { useEffect, useContext, useState } from "react";
import { Box, Drawer, IconButton, useMediaQuery, Snackbar } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import theme from "theme";
import { HeaderLayout } from "layouts";
import { BreadCrumbsModel } from "core/types";
import { useUsersStore } from "store/useUsers.store";
import { useMessagesStore } from "store/useMessages.store";
import { SocketContext } from "../../contexts/SocketContext.contexts";
import { getWSAppURL } from "core/services";
import { AllMessages, ChatDetail } from "components/messages";
import { useChatsStore } from "store/useChat.store";
import { ChatType } from "core/types";

const breadcrumbData: BreadCrumbsModel[] = [{ title: "پیــــــــام ها", link: "/messages", id: "0", color: theme.palette.grey[600], active: true }];

export const MessagesPage: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const [openMessage, setOpenMessage] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const setName = useUsersStore(state => state.setName);
    const { fetchStudentsListMessagesData } = useMessagesStore();
    const { chats, loading, setChats, setLoading, updateChat } = useChatsStore();

    const { getConnection, releaseConnection } = useContext(SocketContext);
    const appEndpoint = getWSAppURL();
    const chatApp = getConnection(appEndpoint);

    const showNotification = () => { setOpen(true); setTimeout(() => setOpen(false), 3000); };

    const handleClickMessage = (userName: string, chatId: string) => {
        setSelectedChatId(chatId);
        setOpenMessage(false);
        setTimeout(() => setOpenMessage(true), 100);
        setName(userName);
    };

    useEffect(() => { fetchStudentsListMessagesData({ page_size: 100, action: "student_search" }); }, []);

    useEffect(() => {
        setLoading(true);
        chatApp.addEventListener("open", () => chatApp.send({ action: "load_chats" }));

        chatApp.on("message", "load_chats", (message: { data: ChatType[] }) => {
            const customChats: Record<string, ChatType> = {};
            message.data.forEach(item => customChats[item.uuid] = item);
            setChats(customChats);
            setLoading(false);
        });

        chatApp.on("event", "new_message", (event: { data: { chat: string; message: ChatType["last_message"] } }) => {
            const { chat: chatId, message } = event.data;
            if (!message.sender.is_me) {
                setNotificationMessage(`یک پیام جدید از ${message.sender.first_name} ${message.sender.last_name}\n${message.content}`);
                showNotification();
            }
            updateChat(chatId, { last_message: message });
        });

        chatApp.on("error", () => setLoading(false));
        chatApp.connect();
        return () => releaseConnection(appEndpoint);
    }, [chatApp]);

    return (
        <Box gap={isMobile ? "8px" : "16px"} display="flex" flexDirection="column">
            <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />
            <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => setOpen(false)} message={notificationMessage} autoHideDuration={3000} sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "#008C64", color: "white" } }} />

            <Box display="flex" gap="2px" width="100%">
                <AllMessages data={Object.values(chats)} loading={loading} onClickMessage={handleClickMessage} onCLickNewMessages={() => { }} />

                {!isMobile && openMessage && selectedChatId && (
                    <Box bgcolor="white" height="85vh" borderRadius="10px 0px 0 0" position="relative" width="100%" overflow="hidden">
                        <ChatDetail selectedChat={selectedChatId} chatApp={chatApp} onMessageSent={() => chatApp.send({ action: "load_chats" })} />
                    </Box>
                )}

                {isMobile && (
                    <Drawer anchor="left" sx={{ "& .MuiDrawer-paper": { width: "100%", height: "100vh", position: "relative" } }} open={openMessage} onClose={() => setOpenMessage(false)}>
                        <IconButton onClick={() => setOpenMessage(false)} sx={{ position: "absolute", top: 10, left: 10, zIndex: 10000 }}><ArrowBackIos /></IconButton>
                        <Box bgcolor="white" height="100vh" borderRadius="10px 0px 0 0" position="relative" width="100%" overflow="hidden">
                            {selectedChatId && <ChatDetail selectedChat={selectedChatId} chatApp={chatApp} onMessageSent={() => chatApp.send({ action: "load_chats" })} />}
                        </Box>
                    </Drawer>
                )}
            </Box>
        </Box>
    );
};
