import React from "react";
import { Badge, Box, Typography } from "@mui/material";
// utils/time.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fa"; // Persian

dayjs.extend(relativeTime);
dayjs.locale("fa");

export const toRelativeTime = (input: string) => {
    return dayjs(input).fromNow();
};

import theme from "theme";
import {
    DoubleTickIcons,
    // LightIcons,
    // PinIcon,
    ProfileCircleIcons,
} from "uiKit";

import { MessageSocketDataTypes } from "core/types";

type Props = {
    onClickMessage: (userName: string, chatId: string) => void;
    item: MessageSocketDataTypes;
};

export const ChatPapers: React.FC<Props> = ({ onClickMessage, item }) => {
    return (
        <>
            {/* <Box
                display={"flex"}
                gap={"10px"}
                borderRadius={"10px"}
                padding={"12px 18px"}
                border={"1px solid"}
                borderColor={theme.palette.primary[500]}
                bgcolor={theme.palette.primary[50]}
                sx={{
                    cursor: "pointer",
                }}
                onClick={onClickMessage}
            >
                <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                    <Box display={"flex"} gap={"10px"}>
                        <Box
                            borderRadius={"50%"}
                            width={"48px"}
                            height={"48px"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            bgcolor={theme.palette.primary[100]}
                        >
                            <LightIcons />
                        </Box>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Typography fontSize={"14px"} fontWeight={700} color="primary">
                                آکادمی تکانش
                            </Typography>
                            <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                                لورم ایپسوم متن ساختگی با تولید...{" "}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                    >
                        <PinIcon />
                    </Box>
                </Box>
            </Box> */}
            {!item?.last_message?.seen && (
                <Box
                    display={"flex"}
                    gap={"10px"}
                    borderRadius={"10px"}
                    padding={"12px 15px"}
                    bgcolor={theme.palette.grey[400]}
                    sx={{
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        onClickMessage(
                            item?.display_name,
                            item?.chat_id
                        )
                    }
                >
                    <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                        <Box display={"flex"} gap={"10px"}>
                            <Box
                                borderRadius={"50%"}
                                width={"48px"}
                                height={"48px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                bgcolor={theme.palette.grey[300]}
                            >
                                <ProfileCircleIcons />
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    fontSize={"14px"}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.display_name}
                                </Typography>
                                <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                                    {item?.last_message?.content}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography
                                color={theme.palette.grey[600]}
                                fontSize={11}
                                fontWeight={500}
                            >
                                {toRelativeTime(item?.last_message?.created_datetime)}
                            </Typography>
                            <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                                <Badge
                                    sx={{
                                        width: 5,
                                        height: 5,
                                        bgcolor: theme.palette.error[500],
                                        borderRadius: "50%",
                                        marginBottom: "8px",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}

            {item?.last_message?.seen && (
                <Box
                    display={"flex"}
                    gap={"10px"}
                    borderRadius={"10px"}
                    padding={"12px 15px"}
                    bgcolor={theme.palette.primary.contrastText}
                    border={"1px solid"}
                    borderColor={theme.palette.grey[300]}
                    sx={{
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        onClickMessage(
                            item?.display_name,
                            item?.chat_id
                        )
                    }
                >
                    <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                        <Box display={"flex"} gap={"10px"}>
                            <Box
                                borderRadius={"50%"}
                                width={"48px"}
                                height={"48px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                bgcolor={theme.palette.grey[300]}
                            >
                                <ProfileCircleIcons />
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"space-between"}
                            >
                                <Typography
                                    fontSize={"14px"}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.display_name}
                                </Typography>
                                <Typography fontSize={"12px"} color={theme.palette.grey[600]}>
                                    {item?.last_message?.content}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography
                                color={theme.palette.grey[600]}
                                fontSize={11}
                                fontWeight={500}
                            >
                                {toRelativeTime(item?.last_message?.created_datetime)}
                            </Typography>
                            <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                                <DoubleTickIcons />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};
