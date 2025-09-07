import React, { useState } from "react";
import {
    Tabs,
    Tab,
    Badge,
    Box,
    Typography,
    useMediaQuery,
    Modal,
    IconButton,
    CircularProgress,   // 👈 use loader instead of Skeleton
} from "@mui/material";

import theme from "theme";
import { EditTwoIcons, SearchInput } from "uiKit";
import { ChatPapers } from "./ChatPapers";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { MessageSocketDataTypes } from "core/types";
import { ContactListModal } from "./ContactListModal";

type Props = {
    onClickMessage: (userName: string, chatId: string) => void;
    onCLickNewMessages: (userName: string, userId: string) => void;
    data: MessageSocketDataTypes[];
    loading: boolean;
};

export const AllMessages: React.FC<Props> = ({
    onClickMessage,
    onCLickNewMessages,
    data,
    loading,
}) => {
    const isMobile = useMediaQuery("(max-width:768px)");

    const [activeTab, setActiveTab] = useState(0);
    const [open, setOpen] = useState(false);

    const customData = data?.filter(
        (item: MessageSocketDataTypes) => item?.last_message?.seen === false
    );

    return (
        <Box
            bgcolor={"white"}
            padding={"20px 16px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"12px"}
            borderRadius={"0 10px 0 0"}
            maxWidth={isMobile ? "100%" : 350}
            width={"100%"}
        >
            {/* Header */}
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                    color={theme?.palette.grey[600]}
                    fontSize={16}
                    fontWeight={700}
                >
                    پیام ها
                </Typography>
                <IconButton onClick={() => setOpen(true)}>
                    <EditTwoIcons
                        width={18}
                        height={18}
                        color={theme.palette.primary[600]}
                        cursor={"pointer"}
                    />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ContactListModal onClickMessage={onCLickNewMessages} onClose={() => setOpen(false)} />
                </Modal>
            </Box>

            {/* Search */}
            <SearchInput
                placeholderText="جستجو در بین پیــــــــام ها..."
                onSearch={() => console.log("e")}
            />

            <Box sx={{ width: "100%", maxWidth: isMobile ? "100%" : 400 }}>
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
                                <Box display="flex" gap="4px" alignItems="center">
                                    <Typography fontWeight={500} fontSize={12}>
                                        همه
                                    </Typography>
                                    <Badge
                                        sx={{
                                            backgroundColor: theme.palette.grey[400],
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            fontSize: "10px",
                                            fontWeight: "700",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <PersianTypography fontSize={12}>
                                            {data?.length}
                                        </PersianTypography>
                                    </Badge>
                                </Box>
                            }
                        />
                        <Tab
                            label={
                                <Box display="flex" gap="4px" alignItems="center">
                                    <Typography
                                        fontWeight={500}
                                        fontSize={12}
                                        color={theme.palette.grey[600]}
                                    >
                                        خوانده نشده
                                    </Typography>
                                    <Badge
                                        sx={{
                                            backgroundColor: theme.palette.error[500],
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            fontSize: "10px",
                                            fontWeight: "700",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <PersianTypography fontSize={12}>
                                            {customData?.length}
                                        </PersianTypography>
                                    </Badge>
                                </Box>
                            }
                        />
                    </Tabs>
                </Box>

                {/* Tab Content */}
                <Box
                    display="flex"
                    gap="6px"
                    flexDirection="column"
                    paddingTop="10px"
                    paddingBottom="10px"
                    maxHeight={isMobile ? "55vh" : "69vh"}
                    sx={{
                        overflow: "auto",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {loading ? (
                        // 🔹 Show loader centered
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="200px"
                        >
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            {activeTab === 0 &&
                                data?.map((item) => (
                                    <ChatPapers
                                        onClickMessage={onClickMessage}
                                        item={item}
                                        key={item?.uuid}
                                    />
                                ))}
                            {activeTab === 1 &&
                                data
                                    ?.filter((item) => item?.last_message?.seen === false)
                                    ?.map((item) => (
                                        <ChatPapers
                                            onClickMessage={onClickMessage}
                                            item={item}
                                            key={item?.uuid + "_unread"}
                                        />
                                    ))}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
