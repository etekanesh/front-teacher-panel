import React from "react";
import { Box } from "@mui/material";

import { ChatTextInput } from "components/messages";

export const MessagesPage: React.FC = () => {
    return (
        <Box>
            <ChatTextInput />
        </Box>
    );
};
