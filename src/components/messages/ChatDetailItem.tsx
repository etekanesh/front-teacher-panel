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
            console.log('hereeeeeeeeeee :>> ');
        };
        console.log(message);

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
                            {message.content} <DoubleTickIcons />
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
                            <DoneIcon
                                sx={{
                                    color: theme.palette.primary[500],
                                    width: 14,
                                    height: 14,
                                }}
                            />
                        </Typography>
                    )}
                </Box>
                <Typography
                    fontSize={10}
                    color={theme.palette.grey[600]}
                    marginTop="5px"
                >
                    {formatPersianDate(message.created_datetime)}
                </Typography>
                <div ref={messagesEndRef} />
            </Box>
        </>
    );
};
