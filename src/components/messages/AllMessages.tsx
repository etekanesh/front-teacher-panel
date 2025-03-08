import React, { useState } from "react";
import { Tabs, Tab, Badge, Box, Typography } from "@mui/material";

import theme from "theme";
import { EditTwoIcons, SearchInput } from "uiKit";

export const AllMessages: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box
            bgcolor={"white"}
            padding={"20px"}
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
                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                >
                    <Tab label="همـه" />
                    <Tab
                        label={
                            <Badge badgeContent={"3"} color="error">
                                خوانده نشده
                            </Badge>
                        }
                    />
                </Tabs>

                {/* Tab Content */}
                <Box sx={{ mt: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                    {activeTab === 0 && (
                        <Typography variant="body1">
                            تمام پیام‌ها نمایش داده می‌شوند.
                        </Typography>
                    )}
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
