import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import theme from "theme";
import { useStudentsStore } from "store/useStudents.store";

type Props = {
    onClickMessage: (userName: string, userId: string) => void;
};
export const ContactListModal: React.FC<Props> = ({ onClickMessage }) => {
    const { fetching, studentsListData } = useStudentsStore();
    return (
        <>
            {fetching ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 342,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: "25px 31px",
                        borderRadius: "15px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        scrollbarWidth: "none", // Firefox
                        "&::-webkit-scrollbar": {
                            display: "none", // Chrome, Safari
                        },
                    }}
                    maxHeight={600}
                    overflow={"scroll"}
                >
                    {studentsListData?.map((item) => (
                        <Box
                            display={"flex"}
                            gap={"8px"}
                            key={item?.uuid}
                            alignItems={"center"}
                            sx={{ cursor: "pointer" }}
                            onClick={() => onClickMessage(item?.first_name + " " + item?.last_name, item?.uuid)}
                        >
                            <Box
                                component={"img"}
                                borderRadius={"50%"}
                                width={"32.5px"}
                                height={"32.5px"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                src={
                                    "https://etekanesh.com/static/panel/media/avatars/blank.png"
                                }
                            />
                            <Box display={"flex"} gap={"8px"}>
                                <Typography
                                    fontSize={14}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.first_name}
                                </Typography>
                                <Typography
                                    fontSize={14}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.last_name}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
};
