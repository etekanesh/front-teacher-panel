import React from "react";
import { Box, Typography } from "@mui/material";
import { useUnreadMessages } from "hooks/useUnreadMessages.hook";
import theme from "theme";

interface UnreadMessagesBadgeProps {
  size?: "small" | "medium" | "large";
  showZero?: boolean;
}

/**
 * Reusable component for displaying unread messages badge
 * Can be used anywhere in the app where unread message count is needed
 */
export const UnreadMessagesBadge: React.FC<UnreadMessagesBadgeProps> = ({ 
  size = "medium", 
  showZero = false 
}) => {
  const totalUnreadMessages = useUnreadMessages();

  if (totalUnreadMessages === 0 && !showZero) {
    return null;
  }

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          minWidth: 16,
          height: 16,
          fontSize: 9,
          padding: "2px 4px",
        };
      case "large":
        return {
          minWidth: 24,
          height: 24,
          fontSize: 12,
          padding: "4px 8px",
        };
      default: // medium
        return {
          minWidth: 20,
          height: 20,
          fontSize: 11,
          padding: "2px 6px",
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.error[500],
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        ...sizeStyles,
        animation: totalUnreadMessages > 0 ? "pulse 2s infinite" : "none",
        "@keyframes pulse": {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(244, 67, 54, 0.7)",
          },
          "70%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 0 6px rgba(244, 67, 54, 0)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(244, 67, 54, 0)",
          },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: sizeStyles.fontSize,
          fontWeight: 600,
          color: "white",
        }}
      >
        {totalUnreadMessages > 99 ? "99+" : totalUnreadMessages}
      </Typography>
    </Box>
  );
};
