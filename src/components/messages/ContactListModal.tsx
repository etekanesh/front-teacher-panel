import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, InputBase } from "@mui/material";

import theme from "theme";
import { useStudentsStore } from "store/useStudents.store";
import { ListIcons } from "uiKit";

type Props = {
    onClickMessage: (userName: string, userId: string) => void;
    onClose: () => void;
};

export const ContactListModal: React.FC<Props> = ({ onClickMessage, onClose }) => {
    const { fetching, studentsListData } = useStudentsStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState(studentsListData);

    useEffect(() => {
        const normalized = searchTerm.trim().toLowerCase();
        if (normalized.length >= 3 || normalized.length === 0) {
            const results = studentsListData.filter((item) =>
                `${item.user.first_name} ${item.user.last_name}`
                    .toLowerCase()
                    .includes(normalized)
            );
            setFilteredStudents(results);
        }
    }, [searchTerm, studentsListData]);

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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            position: "relative",
                        }}
                    >
                        {/* Header */}
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            position={"sticky"}
                            bgcolor={"white"}
                            top={0}
                            padding={"20px"}
                            paddingBottom={0}
                            zIndex={10}
                        >
                            <Box display={"flex"} flex={1} gap={"10px"} alignItems={"center"}>
                                <ListIcons color={theme.palette.primary[600]} width={22} height={22} />
                                <Typography fontSize={16} fontWeight={700} color={theme.palette.grey[500]}>
                                    لیست دانشجــــــــویان
                                </Typography>
                            </Box>

                            {/* Search Input داخلی */}
                            <Box
                                display={"flex"}
                                flex={1}
                                mt={1}
                                sx={{
                                    border: `1px solid ${theme.palette.grey[300]}`,
                                    borderRadius: "8px",
                                    bgcolor: theme.palette.grey[50],
                                    padding: "4px 8px",
                                }}
                            >
                                <InputBase
                                    fullWidth
                                    placeholder="جستجو در بین دانشجو..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{
                                        fontSize: 14,
                                        color: theme.palette.grey[700],
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* لیست دانشجویان */}
                        {filteredStudents?.map((item) => (
                            <Box
                                display={"flex"}
                                gap={"8px"}
                                p={"0 20px"}
                                paddingBottom={"10px"}
                                key={item?.user?.uuid}
                                alignItems={"center"}
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    onClickMessage(
                                        `${item?.user?.first_name} ${item?.user?.last_name}`,
                                        item?.user?.uuid
                                    );
                                    onClose();
                                }}
                            >
                                <Box
                                    component={"img"}
                                    borderRadius={"50%"}
                                    width={"32.5px"}
                                    height={"32.5px"}
                                    src={"https://etekanesh.com/static/panel/media/avatars/blank.png"}
                                />
                                <Box display={"flex"} gap={"4px"}>
                                    <Typography fontSize={14} fontWeight={700} color={theme.palette.grey[500]}>
                                        {item?.user?.first_name}
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={700} color={theme.palette.grey[500]}>
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
