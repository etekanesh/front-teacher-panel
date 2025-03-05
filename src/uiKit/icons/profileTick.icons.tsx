import { IconProps } from "types";

export const ProfileTickIcons = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 15 15"}
      width={width ? width : "15px"}
      height={height ? height : "15px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M9.02539 11.9064L9.97539 12.8564L11.8754 10.9564"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.59963 6.79375C7.53713 6.7875 7.46213 6.7875 7.39338 6.79375C5.90588 6.74375 4.72463 5.525 4.72463 4.025C4.71838 2.49375 5.96213 1.25 7.49338 1.25C9.02463 1.25 10.2684 2.49375 10.2684 4.025C10.2684 5.525 9.08088 6.74375 7.59963 6.79375Z"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.49365 13.6312C6.35615 13.6312 5.2249 13.3437 4.3624 12.7687C2.8499 11.7562 2.8499 10.1062 4.3624 9.1C6.08115 7.95 8.8999 7.95 10.6187 9.1"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
