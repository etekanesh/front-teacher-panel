import { Box, Typography, Avatar } from "@mui/material";
import { ReactElement } from "react";
import theme from "theme";
import SemiCircleProgress from "./SemiCircular";

interface RatingRowProps {
  label?: string;
  value?: number;
  color: string;
  icon: ReactElement;
  chart?: any;
}

export function RatingRow({ label, value = 0, color, icon, chart }: RatingRowProps) {
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
        <Typography fontSize={12} color={theme.palette.grey[500]} fontWeight={700}>
          {typeof label === "string" ? label : "عنوان نامشخص"}
        </Typography>
      </Box>
      <Box component={"img"} src={chart} alt="chart" />
      <SemiCircleProgress value={value} color={color} />
    </Box>
  );
}
