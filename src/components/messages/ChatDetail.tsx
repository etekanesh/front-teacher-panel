import React from "react";
import { Badge, Box, Typography } from "@mui/material";

import theme from "theme";
import avatar from "assets/avatar-Image.png";
import { DoubleTickIcons, UserTickIcons } from "uiKit";

export const ChatDetail: React.FC = () => {
    return (
        <Box>
            <Box
                padding={"14px 30px"}
                height={77}
                border={"1px solid"}
                borderColor={theme.palette.grey[400]}
            >
                <Box display={"flex"} gap={"10px"}>
                    <Box
                        component={"img"}
                        borderRadius={"50%"}
                        width={"48px"}
                        height={"48px"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        src={avatar}
                    />
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
                            تیـــــــــــــدا گودرزی{" "}
                        </Typography>
                        <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                            <Badge
                                sx={{
                                    width: 8,
                                    height: 8,
                                    bgcolor: theme.palette.primary[400],
                                    borderRadius: "50%",
                                }}
                            />
                            <Typography
                                fontSize={"12px"}
                                fontWeight={500}
                                color={theme.palette.grey[600]}
                            >
                                آنلاین{" "}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                bgcolor={theme.palette.grey[200]}
                padding={"15px 30px"}
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    bgcolor={theme.palette.grey[300]}
                    width={56}
                    height={23}
                    borderRadius={"5px"}
                >
                    <Typography
                        fontSize={10}
                        fontWeight={700}
                        color={theme.palette.grey[600]}
                    >
                        امروز
                    </Typography>
                </Box>
            </Box>
            <Box
                display={"flex"}
                gap={"5px"}
                flexDirection={"column"}
                padding={"14px 30px"}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
            >
                <Box
                    borderRadius={"10px"}
                    padding={"12px 18px"}
                    border={"1px solid"}
                    borderColor={theme.palette.primary[500]}
                    bgcolor={theme.palette.primary[50]}
                    width={240}
                    textAlign={"justify"}
                >
                    <Typography fontSize={12} color="primary">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                        استفاده از طراحان گرافیک است.
                    </Typography>
                </Box>
                <Box
                    borderRadius={"10px"}
                    padding={"12px 18px"}
                    border={"1px solid"}
                    borderColor={theme.palette.primary[500]}
                    bgcolor={theme.palette.primary[50]}
                    width={240}
                    textAlign={"justify"}
                >
                    <Typography fontSize={12} color="primary">
                        لورم ایپسوم متن ساختگی{" "}
                    </Typography>
                </Box>
                <Box gap={"5px"} display={"flex"} alignItems={"center"}>
                    <Typography fontSize={12} color={theme.palette.grey[600]}>
                        امــــــــروز ۱۱:۴۵{" "}
                    </Typography>
                </Box>
            </Box>
            <Box
                display={"flex"}
                gap={"5px"}
                flexDirection={"column"}
                padding={"14px 30px"}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
            >
                <Box
                    borderRadius={"10px"}
                    padding={"12px 18px"}
                    border={"1px solid"}
                    borderColor={theme.palette.grey[400]}
                    width={240}
                    textAlign={"justify"}
                >
                    <Typography fontSize={12} color={theme.palette.grey[500]}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                        استفاده از طراحان گرافیک است.
                    </Typography>
                </Box>
                <Box
                    borderRadius={"10px"}
                    padding={"12px 18px"}
                    border={"1px solid"}
                    borderColor={theme.palette.grey[400]}
                    width={240}
                    textAlign={"justify"}
                >
                    <Typography fontSize={12} color={theme.palette.grey[500]}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                        استفاده از طراحان گرافیک است.
                    </Typography>
                </Box>
                <Box gap={"5px"} display={"flex"} alignItems={"center"}>
                    <DoubleTickIcons />
                    <Typography fontSize={12} color={theme.palette.grey[600]}>
                        امــــــــروز ۱۱:۴۵{" "}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
