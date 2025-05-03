import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { ChatTextInput } from "./ChatTextInput";
import { MessageSocketLoadMessagesTypes } from "core/types";
import { formatPersianDate } from "core/utils";
import avatar from "assets/avatar-Image.png";
import { useUsersStore } from "store/useUsers.store";
import theme from "theme";
import WebSocketManager from "core/utils/WebSocketManager";

type Props = {
  url: string;
};

export const ChatDetail: React.FC<Props> = ({ url }) => {
  const [messageData, setMessageData] = useState<MessageSocketLoadMessagesTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const name = useUsersStore((state) => state.name);
  const isMobile = useMediaQuery("(max-width:768px)");
  const wsRef: any = useRef<WebSocketManager | null>(null);
  console.log('url :>> ', url);
  const handleSendMessage = useCallback((message: string) => {
    console.log('message :>> ', message);
    wsRef.current?.send({
      action: "new_messages",
      data: { content: message },
    });
  }, []);

  useEffect(() => {
    // Clean previous socket
    wsRef.current?.disconnect();

    const ws: any = new WebSocketManager(`wss://beta.etekanesh.com${url}/`);
    wsRef.current = ws;

    ws.on("open", () => {
      ws.send({ action: "load_messages" });
    });

    ws.on("message", (data: any) => {
      // Make sure it's the message list type
      if (data?.action === "load_messages") {
        if (data.data?.length) {
          setMessageData(data);
        } else {
          setMessageData(null);
        }
        setLoading(false);
      }
    });

    ws.on("error", () => {
      setError("WebSocket connection failed. Please try again later.");
      setLoading(false);
    });

    ws.on("close", (message: any) => {
      console.log('message :>> ', message);
    })
    ws.connect();


    return () => {
      ws.disconnect();
    };
  }, [url]);

  if (loading) return <Typography>در حال بارگذاری...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      {/* Header */}
      <Box padding={"14px 30px"} borderBottom={`1px solid ${theme.palette.grey[300]}`}>
        <Box display="flex" gap="10px">
          <Box component="img" src={avatar} width="48px" height="48px" borderRadius="50%" />
          <Box display="flex" flexDirection="column">
            <Typography fontSize={14} fontWeight={700} color={theme.palette.grey[600]}>
              {name}
            </Typography>
            <Typography fontSize={12} color={theme.palette.success.main}>
              آنلاین
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box height={isMobile ? "70vh" : "60vh"} sx={{ overflowY: "auto" }}>
        {messageData?.data.map((item) => (
          <Box
            key={item.uuid}
            display="flex"
            flexDirection="column"
            alignItems={item.sender?.is_me ? "flex-end" : "flex-start"}
            padding="10px 20px"
          >
            <Box
              bgcolor={item.sender?.is_me ? theme.palette.primary[50] : "#fff"}
              border={`1px solid ${item.sender?.is_me ? theme.palette.primary[300] : theme.palette.grey[400]}`}
              padding="10px 15px"
              borderRadius="10px"
              maxWidth="240px"
            >
              <Typography fontSize={12}>{item.content}</Typography>
            </Box>
            <Typography fontSize={10} color={theme.palette.grey[600]} marginTop="5px">
              {formatPersianDate(item.created_datetime)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Input */}
      <ChatTextInput onSendMessage={handleSendMessage} />
    </>
  );
};
