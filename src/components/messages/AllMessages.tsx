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
} from "@mui/material";

import theme from "theme";
import { EditTwoIcons, SearchInput } from "uiKit";
import { ChatPapers } from "./ChatPapers";
import PersianTypography from "core/utils/PersianTypoGraphy.utils";
import { MessageSocketDataTypes } from "core/types";
import { ContactListModal } from "./ContactListModal";

type Props = {
    onClickMessage: (userName: string, chatId: string) => void;
    data: MessageSocketDataTypes[];
};

export const AllMessages: React.FC<Props> = ({ onClickMessage, data }) => {
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
            <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                    color={theme?.palette.grey[600]}
                    fontSize={16}
                    fontWeight={700}
                >
                    پیام ها
                </Typography>
                <IconButton onClick={() => setOpen(true)}
                >

                    <EditTwoIcons
                        width={18}
                        height={18}
                        color={theme.palette.primary[600]}
                        cursor={"pointer"}
                    />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ContactListModal onClickMessage={onClickMessage} />
                </Modal>
            </Box>
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
                                        <PersianTypography fontSize={12}>
                                            {data?.length}
                                        </PersianTypography>
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
                    display={"flex"}
                    gap={"6px"}
                    flexDirection={"column"}
                    paddingTop={"10px"}
                    paddingBottom={"10px"}
                    overflow={"auto"}
                    maxHeight={isMobile ? "55vh" : "69vh"}
                    sx={{
                        overflow: "auto",
                        scrollbarWidth: "none", // For Firefox
                        "&::-webkit-scrollbar": {
                            display: "none", // For Chrome, Safari, and Edge
                        },
                    }}
                >
                    {activeTab === 0 && (
                        <>
                            {data &&
                                data?.map((item: any) => (
                                    <ChatPapers
                                        onClickMessage={onClickMessage}
                                        item={item}
                                        key={item?.uuid}
                                    />
                                ))}
                        </>
                    )}
                    {activeTab === 1 && (
                        <>
                            {data &&
                                data?.filter((item) => item?.last_message?.seen === false) &&
                                data?.map((item: any) => (
                                    <ChatPapers
                                        onClickMessage={onClickMessage}
                                        item={item}
                                        key={item?.uuid + 1}
                                    />
                                ))}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
