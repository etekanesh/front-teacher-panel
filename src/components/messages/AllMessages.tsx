import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Badge, IconButton, Modal, CircularProgress, useMediaQuery } from "@mui/material";
import theme from "theme";
import { EditTwoIcons, SearchInput } from "uiKit";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { ChatType } from "core/types";
import { ContactListModal } from "./ContactListModal";
import { ChatItem } from "./ChatItem";

type Props = {
    data: ChatType[];
    loading: boolean;
    onClickMessage: (userName: string, chatId: string, messageId: string) => void;
    onCLickNewMessages: (userName: string, userId: string) => void;
};

export const AllMessages: React.FC<Props> = ({ data, loading, onClickMessage, onCLickNewMessages }) => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const [activeTab, setActiveTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [searchValue] = useState("");

    const filteredData = data.filter((chat) => {
        const name = chat.display_name.toLowerCase();
        return name.includes(searchValue.toLowerCase());
    });

    const unreadData = filteredData.filter(chat => !chat.last_message.seen && !chat.last_message.sender.is_me);
    const sortedData = [...filteredData].sort((a, b) => new Date(b.last_message.created_datetime).getTime() - new Date(a.last_message.created_datetime).getTime());
    const sortedUnread = [...unreadData].sort((a, b) => new Date(b.last_message.created_datetime).getTime() - new Date(a.last_message.created_datetime).getTime());

    return (
        <Box bgcolor="white" padding="20px 16px" display="flex" flexDirection="column" gap="12px" borderRadius="0 10px 0 0" maxWidth={isMobile ? "100%" : 350} width="100%" height="85vh" overflow="hidden">
            <Box display="flex" justifyContent="space-between">
                <Typography color={theme.palette.grey[600]} fontSize={16} fontWeight={700}>پیام ها</Typography>
                <IconButton onClick={() => setOpen(true)}>
                    <EditTwoIcons width={18} height={18} color={theme.palette.primary[600]} cursor="pointer" />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ContactListModal onClickMessage={onCLickNewMessages} onClose={() => setOpen(false)} />
                </Modal>
            </Box>

            <SearchInput
                placeholderText="جستجو در بین پیــــــــام ها..."
                onSearch={() => { }}
            />

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} textColor="inherit"
                    sx={{ "& .MuiTab-root.Mui-selected": { minWidth: "auto", p: 1, borderBottom: "2px solid", borderColor: theme.palette.grey[600] } }}>
                    <Tab label={
                        <Box display="flex" gap={2} alignItems="center">
                            <Typography fontSize={12} fontWeight={500}>همه</Typography>
                            <Badge sx={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: theme.palette.grey[400], display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <PersianTypography fontSize={12}>{filteredData.length}</PersianTypography>
                            </Badge>
                        </Box>
                    } />
                    <Tab label={
                        <Box display="flex" gap={2} alignItems="center">
                            <Typography fontSize={12} fontWeight={500} color={theme.palette.grey[600]}>خوانده نشده</Typography>
                            <Badge sx={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: theme.palette.error[500], display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                <PersianTypography fontSize={12}>{sortedUnread.length}</PersianTypography>
                            </Badge>
                        </Box>
                    } />
                </Tabs>
            </Box>

            <Box display="flex" flexDirection="column" gap={1} paddingTop={1} paddingBottom={1} maxHeight={isMobile ? "55vh" : "69vh"} sx={{ overflow: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height={200}><CircularProgress color="primary" /></Box>
                ) : (
                    <>
                        {activeTab === 0 && sortedData.map(chat => <ChatItem item={chat} onClickMessage={onClickMessage} key={chat.uuid} />)}
                        {activeTab === 1 && sortedUnread.map(chat => <ChatItem item={chat} onClickMessage={onClickMessage} key={chat.uuid + "_unread"} />)}
                    </>
                )}
            </Box>
        </Box>
    );
};
