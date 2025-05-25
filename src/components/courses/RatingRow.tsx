import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import { ReactElement } from "react";
import theme from "theme";
import SemiCircleProgress from "./SemiCircular";

interface RatingRowProps {
  label?: string;
  value?: number;
  color: string;
  icon: ReactElement;
}

export function RatingRow({ label, value = 0, color, icon }: RatingRowProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      bgcolor={"#EDF0EF80"}
      borderRadius={"10px"}
      gap={2}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Avatar variant="rounded" sx={{ bgcolor: color }}>
          {icon}
        </Avatar>
        <Typography fontSize={14} color={theme.palette.grey[500]}>
          {typeof label === "string" ? label : "عنوان نامشخص"}
        </Typography>
      </Box>

      <Box flex={1} ml={2}>
        
        <SemiCircleProgress value={value} color="#4CAF50" />
      </Box>
    </Box>
  );
}
