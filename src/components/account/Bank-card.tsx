import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import cardImage from "assets/bank-card-bg.png";

export const BankCard: React.FC = () => {
    const isMobile = useMediaQuery("(max-width:768px)");

    return (
        <Box
            component={"img"}
            width={isMobile ? 343 : 422}
            height={isMobile ? 145 : 221}
            src={cardImage}
        />
    );
};
