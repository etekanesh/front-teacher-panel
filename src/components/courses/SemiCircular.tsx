import React from "react";
import { Box, Typography } from "@mui/material";

interface SemiCircleProgressProps {
  value: number; // درصد بین 0 تا 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

const SemiCircleProgress: React.FC<SemiCircleProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  color = "#1B7F4C",
  backgroundColor = "#E0E0E0",
  showLabel = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const progress = Math.min(Math.max(value, 0), 100);
  const endAngle = 180 - (180 * progress) / 100;

  return (
    <Box width={size} height={size / 2} position="relative">
      <svg width={size} height={size / 2}>
        {/* زمینه خاکستری (نیم‌دایره کامل) */}
        <path
          d={describeArc(center, center, radius, 180, 0)}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* نیم‌دایره رنگی متناسب با درصد */}
        <path
          d={describeArc(center, center, radius, 180, endAngle)}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* متن وسط نیم‌دایره */}
      {showLabel && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Typography fontSize={14} fontWeight={600} color="text.secondary">
            {`${progress.toFixed(0)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SemiCircleProgress;

// توابع کمکی رسم آرک
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}
