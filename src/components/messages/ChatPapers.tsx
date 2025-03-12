import React from "react";
import { Box, Typography } from "@mui/material";

import theme from "theme";
import { LightIcons, PinIcon, ProfileCircleIcons } from "uiKit";

const ChatPapers: React.FC = () => {
    return (
        <>
            <Box
                display={"flex"}
                gap={"10px"}
                borderRadius={"10px"}
                padding={"12px 18px"}
                border={"1px solid"}
                borderColor={theme.palette.primary[500]}
                bgcolor={theme.palette.primary[50]}
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
                            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
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
            </Box>
            <Box
                display={"flex"}
                gap={"10px"}
                borderRadius={"10px"}
                padding={"12px 18px"}
                bgcolor={theme.palette.grey[400]}
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
                            bgcolor={theme.palette.grey[600]}
                        >
                            <ProfileCircleIcons />
                        </Box>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Typography fontSize={"14px"} fontWeight={700} color="primary">
                                تیـــــــــــــدا گودرزی{" "}
                            </Typography>
                            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
                                لورم ایپسوم متن ساختگی با تولید...{" "}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                    >
                        <Typography color={theme.palette.grey[600]} fontSize={12} fontWeight={500}>
                            ۱ دقیقه پیش
                        </Typography>
                        <PinIcon />
                    </Box>
                </Box>
            </Box>
            <Box
                display={"flex"}
                gap={"10px"}
                borderRadius={"10px"}
                padding={"12px 18px"}
                border={"1px solid"}
                borderColor={theme.palette.primary[500]}
                bgcolor={theme.palette.primary[50]}
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
                            <Typography fontSize={"14px"} color={theme.palette.grey[600]}>
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
            </Box>
        </>
    );
};

export default ChatPapers;
