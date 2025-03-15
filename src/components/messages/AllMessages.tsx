import React, { useState } from "react";
import { Tabs, Tab, Badge, Box, Typography } from "@mui/material";

import theme from "theme";
import { EditTwoIcons, SearchInput } from "uiKit";
import { ChatPapers } from "./ChatPapers";

type Props = {
    onClickMessage: () => void;
};

export const AllMessages: React.FC<Props> = ({ onClickMessage }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box
            bgcolor={"white"}
            padding={"20px 16px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"12px"}
            borderRadius={"0 10px 0 0"}
            maxWidth={350}
            width={"100%"}
        >
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                    color={theme?.palette.grey[600]}
                    fontSize={16}
                    fontWeight={700}
                >
                    پیام ها
                </Typography>
                <EditTwoIcons
                    width={18}
                    height={18}
                    color={theme.palette.primary[600]}
                />
            </Box>
            <SearchInput placeholderText="جستجو در بین پیــــــــام ها..." />
            <Box sx={{ width: "100%", maxWidth: 400 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    {/* Tabs */}
                    <Tabs
                        textColor={"inherit"}
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        sx={{
                            "& .MuiTab-root.Mui-selected": {
                                minWidth: "auto",
                                p: "4px",
                                borderBottom: "2px solid",
                                zIndex: 10,
                                borderColor: theme.palette.grey[600],
                            },
                            "& .MuiTab-textColorInherit": {
                                minWidth: "auto",
                                p: "4px",
                                opacity: 1,
                            },
                        }}
                    >
                        <Tab
                            label={
                                <Box
                                    display={"flex"}
                                    gap={"4px"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    padding={0}
                                >
                                    <Typography fontWeight={500} fontSize={12}>
                                        همه
                                    </Typography>
                                    <Badge
                                        color="info"
                                        sx={{
                                            backgroundColor: theme.palette.grey[400],
                                            display: "flex",
                                            width: "16px",
                                            height: "16px",
                                            p: "4px",
                                            borderRadius: "50%",
                                            fontSize: "10px",
                                            fontWeight: "700",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        56
                                    </Badge>
                                </Box>
                            }
                        ></Tab>
                        <Tab
                            label={
                                <Box
                                    display={"flex"}
                                    gap={"4px"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    padding={0}
                                >
                                    <Typography
                                        fontWeight={500}
                                        fontSize={12}
                                        color={theme.palette.grey[600]}
                                    >
                                        خوانده نشده
                                    </Typography>
                                    <Badge
                                        color="info"
                                        sx={{
                                            backgroundColor: theme.palette.error[500],
                                            display: "flex",
                                            width: "16px",
                                            height: "16px",
                                            p: "4px",
                                            borderRadius: "50%",
                                            fontSize: "10px",
                                            fontWeight: "700",
                                            color: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        3
                                    </Badge>
                                </Box>
                            }
                        />
                    </Tabs>
                </Box>
                {/* Tab Content */}
                <Box
                    display={"flex"}
                    gap={"6px"}
                    flexDirection={"column"}
                    paddingTop={"10px"}
                    overflow={"auto"}
                    maxHeight={"90vh"}
                    sx={{
                        overflow: "auto",
                        scrollbarWidth: "none", // For Firefox
                        "&::-webkit-scrollbar": {
                            display: "none", // For Chrome, Safari, and Edge
                        },
                    }}
                >
                    {activeTab === 0 && <ChatPapers onClickMessage={onClickMessage} />}
                    {activeTab === 1 && (
                        <Typography variant="body1">
                            این پیام‌ها خوانده نشده‌اند.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
