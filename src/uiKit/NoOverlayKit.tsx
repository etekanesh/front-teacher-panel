import React from "react";
import { Box, Typography } from "@mui/material";

export const CustomNoRowsOverlay: React.FC = () => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        color="text.secondary"
    >
        <Typography fontSize={14} fontWeight={500}>
            اطلاعاتی یافت نشد!
        </Typography>
    </Box>
);
