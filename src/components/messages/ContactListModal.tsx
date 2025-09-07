import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import theme from "theme";
import { useStudentsStore } from "store/useStudents.store";

type Props = {
    onClickMessage: (userName: string, userId: string) => void;
    onClose: () => void;
};

export const ContactListModal: React.FC<Props> = ({ onClickMessage, onClose }) => {
    const { fetching, studentsListData } = useStudentsStore();

    return (
        <>
            {fetching ? (
                // 🔹 Loader centered like modal content
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 342,
                        height: 200,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: "15px",
                    }}
                >
                    <CircularProgress color="primary" />
                </Box>
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
                        maxHeight: 600,
                        overflow: "auto",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {studentsListData?.map((item) => (
                        <Box
                            display={"flex"}
                            gap={"8px"}
                            key={item?.user?.uuid}
                            alignItems={"center"}
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                onClickMessage(
                                    item?.user?.first_name + " " + item?.user?.last_name,
                                    item?.user?.uuid
                                )
                                onClose()
                            }
                            }
                        >
                            <Box
                                component={"img"}
                                borderRadius={"50%"}
                                width={"32.5px"}
                                height={"32.5px"}
                                src={
                                    "https://etekanesh.com/static/panel/media/avatars/blank.png"
                                }
                            />
                            <Box display={"flex"} gap={"4px"}>
                                <Typography
                                    fontSize={14}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.user?.first_name}
                                </Typography>
                                <Typography
                                    fontSize={14}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    {item?.user?.last_name}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
};
