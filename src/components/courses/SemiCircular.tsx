import React from "react";
import { Box } from "@mui/material";

import PersianTypography from "core/utils/PersianTypoGraphy.utils";

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
  size = 77.5,
  strokeWidth = 13,
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
        <path
          d={describeArc(center, center, radius, -180, 0)}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={describeArc(center, center, radius, 360, endAngle)}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {showLabel && (
        <Box position={"absolute"} top={20} left={28}>
          <PersianTypography
            fontSize={14}
            fontWeight={600}
            color="text.secondary"
          >
            {`%${progress.toFixed(0)}`}
          </PersianTypography>
        </Box>
      )}
    </Box>
  );
};

export default SemiCircleProgress;

// توابع کمکی رسم آرک
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
