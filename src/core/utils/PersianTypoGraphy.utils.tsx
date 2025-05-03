import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

const PersianTypography: React.FC<TypographyProps> = ({
    children,
    ...props
}) => {
    function convertToPersian(numberString: string): string {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return numberString.replace(/\d/g, (digit) => persianDigits[+digit]);
    }

    const renderChildren = () => {
        if (typeof children === "string" || typeof children === "number") {
            return convertToPersian(children.toString());
        }
        return children;
    };

    return <Typography {...props}>{renderChildren()}</Typography>;
};

export default PersianTypography;
