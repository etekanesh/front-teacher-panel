import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import theme from "theme";
import { useStudentsStore } from "store/useStudents.store";
import { ListIcons, SearchInput } from "uiKit";

type Props = {
    onClickMessage: (userName: string, userId: string) => void;
    onClose: () => void;
};

export const ContactListModal: React.FC<Props> = ({ onClickMessage, onClose }) => {
    const { fetching, studentsListData } = useStudentsStore();
    const [filteredStudents, setFilteredStudents] = useState(studentsListData);

    const onSearchStudents = (value: string): void => {
        const normalized = value.trim().toLowerCase();
        const results = studentsListData.filter((item) =>
            `${item.user.first_name} ${item.user.last_name}`
                .toLowerCase()
                .includes(normalized)
        );
        setFilteredStudents(results);
    };

    useEffect(() => {
        setFilteredStudents(studentsListData);
    }, [studentsListData]);

    return (
        <>
            {fetching ? (
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
                        borderRadius: "15px",
                        textAlign: "center",
                        maxHeight: 600,
                        overflow: "auto",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        position: "relative",

                    }}>
                        <Box display={"flex"} gap={"10px"} flexDirection={"column"} position={"sticky"} bgcolor={"white"} top={0} padding={"20px"} paddingBottom={0}>
                            <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
                                <ListIcons color={theme.palette.primary[600]} width={22} height={22} />
                                <Typography
                                    fontSize={16}
                                    fontWeight={700}
                                    color={theme.palette.grey[500]}
                                >
                                    لیست دانشجــــــــویان
                                </Typography>
                            </Box>
                            <Box
                                display={"flex"}
                                flex={1}
                                sx={{
                                    [theme.breakpoints.down("sm")]: {
                                        width: "100%",
                                    },
                                }}
                            >
                                <SearchInput placeholderText="جستجو در بین دانشجـــــــو ..." onSearch={onSearchStudents} />
                            </Box>
                        </Box>

                        {filteredStudents?.map((item) => (
                            <Box
                                display={"flex"}
                                gap={"8px"}
                                p={"0 20px"}
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

                </Box>
            )}
        </>
    );
};
