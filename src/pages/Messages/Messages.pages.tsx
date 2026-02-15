import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
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
import EmptyImage from "assets/messages-empty-state.png";

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
  const [chatIdFromUrl, setChatIdFromUrl] = useState<string | null>(null);

  const setName = useUsersStore((state) => state.setName);
  const { chats, loading, setChats } = useChatsStore();
  const { getConnection } = useContext(SocketContext);

  const appEndpoint = getWSAppURL();
  const chatApp = getConnection(appEndpoint);


  const handleClickMessage = (
    userName: string,
    chatId: string,
    lastMessageUuid: string,
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
    setChats(updatedChats);
    setSelectedChatId(chatId);
    setOpenMessage(false);
    setTimeout(() => setOpenMessage(true), 100);
    setName(userName);
    window.history.replaceState({}, "", window.location.pathname);
  };

  // Request chats when component mounts (socket is already connected in main layout)
  useEffect(() => {
    const requestChats = () => {
      chatApp.send({ action: "load_chats" });
    };

    if (chatApp.is_connected()) {
      requestChats();
    } else {
      const openHandler = () => {
        requestChats();
        chatApp.removeEventListener("open", openHandler);
      };
      chatApp.addEventListener("open", openHandler);
    }
  }, [chatApp]);


  // Handle URL-based chat opening
  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const query = search.slice(1);
      const nameIndex = query.indexOf(",name=");
      let chatPart = query;
      let name = null;

      if (nameIndex !== -1) {
        chatPart = query.slice(0, nameIndex);
        name = decodeURIComponent(query.slice(nameIndex + 6));
        setName(name);
      }
      setChatIdFromUrl(chatPart);
    }
  }, [setName]);

  useEffect(() => {
    if (!loading && chatIdFromUrl && !selectedChatId && chatApp.is_connected()) {
      setSelectedChatId(chatIdFromUrl);
      setOpenMessage(false);
      setTimeout(() => setOpenMessage(true), 100);
      const secondPart = chatIdFromUrl.split("-")[1];
      chatApp.send({ action: "load_chats" });

      chatApp.send({
        action: "private_chat",
        data: { chat_with: secondPart },
      });
      
      const privateChatHandler = (message: { data: any }) => {
        setSelectedChatId(message.data.chat_id);
        chatApp.send({ action: "load_chats" });
      };
      
      chatApp.on("message", "private_chat", privateChatHandler);
    }
  }, [loading, chatIdFromUrl, selectedChatId, chatApp]);

  return (
    <Box gap={isMobile ? "8px" : "16px"} display="flex" flexDirection="column">
      <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />

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

        {!isMobile && openMessage && selectedChatId ? (
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
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            bgcolor={"white"}
          >
            <Box component={"img"} width={150} height={160} src={EmptyImage} />
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
