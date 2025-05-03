import { IconProps } from "core/types";

export const PeopleIcons = (props: IconProps) => {
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
        d="M11.25 4.475C11.2125 4.46875 11.1688 4.46875 11.1313 4.475C10.2688 4.44375 9.5813 3.7375 9.5813 2.8625C9.5813 1.96875 10.3 1.25 11.1938 1.25C12.0875 1.25 12.8063 1.975 12.8063 2.8625C12.8 3.7375 12.1125 4.44375 11.25 4.475Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6066 9.0251C11.4629 9.16885 12.4066 9.01885 13.0691 8.5751C13.9504 7.9876 13.9504 7.0251 13.0691 6.4376C12.4004 5.99385 11.4441 5.84384 10.5879 5.99384"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.73154 4.475C3.76904 4.46875 3.81279 4.46875 3.85029 4.475C4.71279 4.44375 5.40029 3.7375 5.40029 2.8625C5.40029 1.96875 4.68154 1.25 3.78779 1.25C2.89404 1.25 2.17529 1.975 2.17529 2.8625C2.18154 3.7375 2.86904 4.44375 3.73154 4.475Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.37515 9.025C3.5189 9.16875 2.57515 9.01875 1.91265 8.575C1.0314 7.9875 1.0314 7.025 1.91265 6.4375C2.5814 5.99375 3.53764 5.84375 4.39389 5.99375"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.50005 9.14359C7.46255 9.13734 7.4188 9.13734 7.3813 9.14359C6.5188 9.11234 5.8313 8.40609 5.8313 7.53109C5.8313 6.63734 6.55005 5.91859 7.4438 5.91859C8.33755 5.91859 9.0563 6.64359 9.0563 7.53109C9.05005 8.40609 8.36255 9.11859 7.50005 9.14359Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.68096 11.1123C4.79971 11.6998 4.79971 12.6623 5.68096 13.2498C6.68096 13.9186 8.31846 13.9186 9.31846 13.2498C10.1997 12.6623 10.1997 11.6998 9.31846 11.1123C8.32471 10.4498 6.68096 10.4498 5.68096 11.1123Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
