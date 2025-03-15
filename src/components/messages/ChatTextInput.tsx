import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";

import { AttachCircleIcons, SendTwoIcon } from "uiKit";
import theme from "theme";

export const ChatTextInput: React.FC<{
    onSendMessage: (message: string) => void;
}> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
            setSelectedFile(null);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setSelectedFile(event.target.files[0]);
        }
    };

    console.log("selectedFile :>> ", selectedFile);
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="نوشتن پیام ..."
            value={message}
            multiline
            maxRows={5}
            inputProps={{
                sx: {
                    borderColor: theme.palette.grey[400],
                    borderRadius: 0,
                    border: "none",
                },
            }}
            sx={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                "& .MuiOutlinedInput-root": {
                    minHeight: "65px"
                }
            }}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
                endAdornment: (
                    <Box display={"flex"} gap={"10px"}>
                        <InputAdornment position="end" sx={{ margin: 0 }}>
                            <input
                                type="file"
                                hidden
                                id="file-input"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-input">
                                <IconButton
                                    component="span"
                                    color="primary"
                                    sx={{ padding: "0" }}
                                >
                                    <AttachCircleIcons />
                                </IconButton>
                            </label>
                        </InputAdornment>
                        <InputAdornment position="end" sx={{ margin: 0 }}>
                            <IconButton
                                sx={{
                                    width: 32,
                                    height: 32,
                                    background: theme.palette.primary[600],
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "8px",
                                    padding: 0,
                                }}
                                onClick={handleSendMessage}
                            >
                                <SendTwoIcon
                                    color={theme.palette.primary.contrastText}
                                    width={14}
                                    height={14}
                                />
                            </IconButton>
                        </InputAdornment>
                    </Box>
                ),
            }}
        />
    );
};
