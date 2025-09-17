import React from "react";
import { Box, Typography, Badge } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fa";

import theme from "theme";
import { DoubleTickIcons, ProfileCircleIcons } from "uiKit";
import { ChatType } from "core/types";

dayjs.extend(relativeTime);
dayjs.locale("fa");

type ChatItemProps = {
    item: ChatType;
    onClickMessage: (
        displayName: string,
        chatId: string,
        messageId: string
    ) => void;
};

export const toRelativeTime = (input: string) => dayjs(input).fromNow();

export const ChatItem: React.FC<ChatItemProps> = ({ item, onClickMessage }) => {

    return (
        <Box
            display="flex"
            gap="10px"
            borderRadius="10px"
            padding="12px 15px"
            bgcolor={
                !item.last_message.seen && !item.last_message.sender.is_me
                    ? theme.palette.grey[400]
                    : theme.palette.primary.contrastText
            }
            border={
                !item.last_message.seen && !item.last_message.sender.is_me
                    ? "none"
                    : `1px solid ${theme.palette.grey[300]}`
            }
            sx={{ cursor: "pointer" }}
            onClick={() =>
                onClickMessage(item.display_name, item.chat_id, item.last_message.uuid)
            }
        >
            <Box display="flex" justifyContent="space-between" width="100%">
                <Box display="flex" gap="10px">
                    <Box
                        borderRadius="50%"
                        width="48px"
                        height="48px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bgcolor={theme.palette.grey[300]}
                    >
                        <ProfileCircleIcons />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Typography
                            fontSize="14px"
                            fontWeight={700}
                            color={theme.palette.grey[500]}
                        >
                            {item.display_name}
                        </Typography>
                        <Typography fontSize="12px" color={theme.palette.grey[600]}>
                            {item.last_message.content.length > 20
                                ? item.last_message.content.slice(0, 20) + "..."
                                : item.last_message.content}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        color={theme.palette.grey[600]}
                        fontSize={11}
                        fontWeight={500}
                    >
                        {toRelativeTime(item.last_message.created_datetime)}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" width="100%">
                        {!item.last_message.sender.is_me && item.last_message.seen ? (
                            <DoubleTickIcons />
                        ) : !item.last_message.sender.is_me && !item.last_message.seen ? (
                            <Badge
                                sx={{
                                    width: 8,
                                    height: 8,
                                    bgcolor: theme.palette.error[500],
                                    borderRadius: "50%",
                                    marginBottom: "8px",
                                }}
                            />
                        ) : null}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
