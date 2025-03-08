import React from "react";
import { TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

import { CustomButton } from "uiKit";
import theme from "theme";

const WrapForm = styled("form")(() => ({
    display: "flex",
    justifyContent: "center",
    width: "95%",
    margin: "0 auto",
}));

const WrapText = styled(TextField)({
    width: "100%",
    color: theme.palette.grey[600],
    fontWeight: 500,
});

export const ChatTextInput: React.FC = () => {
    return (
        <WrapForm noValidate autoComplete="off">
            <WrapText
                id="standard-text"
                placeholder="نوشتن پیام..."
                variant="outlined"
                color="primary"

            >
            </WrapText>
            <CustomButton variant="contained" color="primary">
                <SendIcon />
            </CustomButton>
        </WrapForm>
    );
};
