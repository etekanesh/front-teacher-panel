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

import { ChatTextInput } from "./ChatTextInput";
import { formatPersianDate } from "core/utils";
import { useUsersStore } from "store/useUsers.store";
import theme from "theme";
import { ProfileCircleIcons } from "uiKit";
import { SocketContext } from "../../contexts/SocketContext.contexts";

type Props = {
  selectedChat: string;
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

export const ChatDetail: React.FC<Props> = ({ selectedChat }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [loadingMessageDetail, setLoadingMessageDetail] = useState(false);

  const name = useUsersStore((state) => state.name);

  const { getConnection, releaseConnection } = useContext(SocketContext);
  const endpoint = `wss://beta.etekanesh.com/ws/chat/${selectedChat}/`;
  const privateChat = getConnection(endpoint);

  const handleSendMessage = useCallback((message: string) => {
    privateChat.connect();
    privateChat.send({
      action: "new_message",
      data: {
        content: message,
      },
      extra: {
        clear_input: true,
        is_me: true,
      },
    });
  }, []);

  useEffect(() => {
    privateChat.addEventListener("open", () => {
      privateChat.send({
        action: "load_messages",
      });
    });
    privateChat.on("message", "load_messages", (message: { data: any }) => {
      setMessages([...message.data].reverse());
      setLoadingMessageDetail(false);
    });

    privateChat.on(
      "message",
      "new_message",
      (message: {
        extra: { clear_input: any; is_me: any };
        data: { sender: { is_me: boolean } };
      }) => {
        // if (message?.extra && message.extra?.clear_input) {
        //   setText("");
        // }

        if (message?.extra && message.extra?.is_me) {
          message.data.sender.is_me = true;
        } else {
          message.data.sender.is_me = false;
        }

        setMessages((prev) => [...prev, message.data as Message]);
      }
    );

    privateChat.connect();

    return () => {
      releaseConnection(endpoint);
    };
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Header */}

      <>
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
              {/* <Typography fontSize={12} color={theme.palette.success.main}>
                  آنلاین
                </Typography> */}
            </Box>
          </Box>
        </Box>

        {/* Messages */}
        <Box
          height={isMobile ? "80vh" : "67vh"}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
          }}
        >
          {loadingMessageDetail ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              margin={"auto"}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {messages?.map(
                (item: {
                  uuid: React.Key | null | undefined;
                  sender: { is_me: any };
                  content:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                  | null
                  | undefined;
                  created_datetime: string;
                }) => (
                  <Box
                    key={item.uuid}
                    display="flex"
                    flexDirection="column"
                    alignItems={item.sender?.is_me ? "flex-end" : "flex-start"}
                    padding="10px 20px"
                  >
                    <Box
                      bgcolor={
                        item.sender?.is_me ? theme.palette.primary[50] : "#fff"
                      }
                      border={`1px solid ${item.sender?.is_me
                          ? theme.palette.primary[300]
                          : theme.palette.grey[400]
                        }`}
                      padding="10px 15px"
                      borderRadius="10px"
                      maxWidth="240px"
                    >
                      <Typography fontSize={12}>{item.content}</Typography>
                    </Box>
                    <Typography
                      fontSize={10}
                      color={theme.palette.grey[600]}
                      marginTop="5px"
                    >
                      {formatPersianDate(item.created_datetime)}
                    </Typography>
                    <div ref={messagesEndRef} />
                  </Box>
                )
              )}
            </>
          )}
        </Box>
        {/* Input */}
        <ChatTextInput onSendMessage={handleSendMessage} />
      </>
    </>
  );
};
