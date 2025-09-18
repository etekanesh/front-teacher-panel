import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useUsersStore } from "store/useUsers.store";
import { getWSChatURL } from "core/services";
import theme from "theme";
import { ProfileCircleIcons } from "uiKit";
import { ChatTextInput } from "./ChatTextInput";
import { ChatDetailItem } from "./ChatDetailItem";
import { SocketContext } from "../../contexts/SocketContext.contexts";

type Props = {
  selectedChat: string;
  onMessageSent?: () => void;
  chatApp: any; // 👈 اضافه شد
};


type Message = {
    content: string;
    created_datetime: string;
    uuid: string;
    seen: boolean;
    sender: {
        first_name: string;
        last_name: string;
        is_me: boolean;
    };
};


export const ChatDetail: React.FC<Props> = ({
  selectedChat,
  chatApp,
  onMessageSent,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [messages, setMessages] = useState<Record<string, Message>>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [loadingMessageDetail, setLoadingMessageDetail] = useState(false);

  const name = useUsersStore((state) => state.name);
  const teacher_uuid = useUsersStore((state) => state.userData?.uuid);
  
  const { getConnection, releaseConnection } = useContext(SocketContext);
  const chatEndpoint = getWSChatURL(selectedChat);
  const chatSocket = getConnection(chatEndpoint);

  const handleSendMessage = useCallback(
    (message: string) => {
      chatSocket.connect();
      chatSocket.send({
        action: "new_message",
        data: { content: message },
        extra: { clear_input: true, is_me: true },
      });
      chatApp.send({ action: "load_chats" });

      if (onMessageSent) onMessageSent();
    },
    [chatSocket, chatApp, onMessageSent]
  );

  useEffect(() => {
    chatSocket.addEventListener("open", () => {
      setLoadingMessageDetail(true);
      chatSocket.send({
        action: "load_messages",
      });
    });

    chatSocket.on("message", "load_messages", (message: { data: any }) => {
      const customMessage: any = {};
      message.data.reverse().forEach((item: any) => {
        customMessage[item.uuid] = {
          ...item,
          is_me: item.sender.uuid == teacher_uuid
        };
      });

      setMessages(customMessage);
      setLoadingMessageDetail(false);
    });

    chatSocket.on("event", "seen", (event: { data: any }) => {
      const data = event.data
      const message_id = data?.message_id
      
      if (!message_id || !(message_id in messages) || !(messages[message_id].sender.is_me))

        
      setMessages(prevMessages => ({
        ...prevMessages,
        [message_id]: {
          ...prevMessages[message_id],
          seen: data.seen_status
        }
      }))
    });

    chatSocket.on(
      "message",
      "new_message",
      (message: {
        extra: { clear_input: any; is_me: any };
        data: {
          uuid: any;
          sender: { is_me: boolean };
        };
      }) => {
        if (message?.extra && message.extra?.is_me) {
          message.data.sender.is_me = true;
        } else {
          message.data.sender.is_me = false;
        }
        // let customMessage = { ...messages, [message.data.uuid]: message.data };
        setMessages((prev: any) => ({
          ...prev,
          [message.data.uuid]: message.data,
        }));
      }
    );

    chatSocket.connect();

    return () => {
      releaseConnection(chatEndpoint);
    };
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
      {/* Header */}
      <Box
        padding={"14px 30px"}
        borderBottom={`1px solid ${theme.palette.grey[300]}`}
      >
        <Box display="flex" gap="10px" alignItems={"center"}>
          <Box width="48px" height="48px" borderRadius="50%">
            <ProfileCircleIcons width={48} height={48} />
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography
              fontSize={14}
              fontWeight={700}
              color={theme.palette.grey[600]}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        height={isMobile ? "80vh" : "67vh"}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loadingMessageDetail ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {messages &&
              Object.values(messages).map((item: any) => (
                <ChatDetailItem
                  message={item}
                  selectedChat={selectedChat}
                  messagesEndRef={messagesEndRef}
                  key={item?.uuid}
                />
              ))}
          </>
        )}
      </Box>

      {/* Input */}
      <ChatTextInput onSendMessage={handleSendMessage} />
    </>
  );
};
