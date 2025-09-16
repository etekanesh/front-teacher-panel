import React, { useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import theme from "theme";
import { formatPersianDate } from "core/utils";
import { getWSChatURL } from "core/services";

import { SocketContext } from "../../contexts/SocketContext.contexts";
import { DoubleTickIcons } from "uiKit";

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

type Props = {
    selectedChat: string;
    message: Message;
    messagesEndRef: any;
};
export const ChatDetailItem: React.FC<Props> = ({
    message,
    selectedChat,
    messagesEndRef,
}) => {
    const { getConnection } = useContext(SocketContext);
    const chatEndpoint = getWSChatURL(selectedChat);
    const chatSocket = getConnection(chatEndpoint);

    useEffect(() => {
        const sendSeenMessage = () => {
            chatSocket.send({
                action: "seen_message",
                data: { message: message?.uuid },
            });
        };
        !message?.seen && !message?.sender?.is_me && sendSeenMessage();
    }, []);

    return (
        <>
            <Box
                key={message.uuid}
                display="flex"
                flexDirection="column"
                alignItems={message.sender?.is_me ? "flex-end" : "flex-start"}
                padding="10px 20px"
            >
                <Box
                    bgcolor={message.sender?.is_me ? theme.palette.primary[50] : "#fff"}
                    border={`1px solid ${message.sender?.is_me
                        ? theme.palette.primary[300]
                        : theme.palette.grey[400]
                        }`}
                    padding="10px 15px"
                    borderRadius="10px"
                    maxWidth="240px"
                >
                    {message?.seen && message?.sender?.is_me ? (
                        <Typography
                            fontSize={12}
                            sx={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            {message.content}
                        </Typography>
                    ) : (
                        <Typography
                            fontSize={12}
                            sx={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            {message.content}{" "}
                        </Typography>
                    )}
                </Box>
                <Box display={"flex"} gap={"2px"} alignItems={"center"}>
                    <Typography
                        fontSize={10}
                        color={theme.palette.grey[600]}
                        marginTop="5px"
                    >
                        {formatPersianDate(message.created_datetime)}
                    </Typography>
                    {message?.sender?.is_me ? (
                        message?.seen ? (
                            <DoubleTickIcons />
                        ) : (
                            <DoneIcon sx={{ width: "14px", height: "14px", color: theme.palette.primary[500] }} />
                        )
                    ) : null}
                </Box>
                <div ref={messagesEndRef} />
            </Box>
        </>
    );
};
