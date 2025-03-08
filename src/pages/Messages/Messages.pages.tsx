import React from "react";
import { Box } from "@mui/material";

import { BreadCrumbsModel } from "types";
import theme from "theme";
import { ChatTextInput, AllMessages } from "components";
import { HeaderLayout } from "layouts";

export const MessagesPage: React.FC = () => {
    const breadcrumbData: BreadCrumbsModel[] = [
        {
            title: "پیــــــــام ها",
            link: "/messages",
            id: "0",
            color: theme.palette.grey[600],
            active: true,
        },
    ];

    return (
        <Box gap={"16px"} display={"flex"} flexDirection={"column"}>
            <HeaderLayout title="پیــــــــام ها" breadcrumb={breadcrumbData} />
            <Box display={"flex"} gap={"2px"}>
                <AllMessages />
                <Box
                    bgcolor={"white"}
                    height={"88vh"}
                    borderRadius={"10px 0px 0 0"}
                    position={"relative"}
                    width={"100%"}
                    overflow={"hidden"}
                >
                    <ChatTextInput
                        onSendMessage={function (message: string): void {
                            console.log(message);
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
