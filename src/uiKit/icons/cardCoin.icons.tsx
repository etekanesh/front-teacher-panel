import { IconProps } from "core/types";

export const CardCoinIcons = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 16 15"}
      width={width ? width : "16px"}
      height={height ? height : "15px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M1.63428 10.6625H7.88428"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.02176 8.4375H6.4968C7.6093 8.4375 7.88428 8.7125 7.88428 9.8125V12.3813C7.88428 13.4813 7.6093 13.7563 6.4968 13.7563H3.02176C1.90926 13.7563 1.63428 13.4813 1.63428 12.3813V9.8125C1.63428 8.7125 1.90926 8.4375 3.02176 8.4375Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1343 9.375C14.1343 11.7937 12.178 13.75 9.75928 13.75L10.4155 12.6562"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.63428 5.625C1.63428 3.20625 3.59053 1.25 6.00928 1.25L5.35303 2.34375"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9468 6.875C13.5001 6.875 14.7593 5.6158 14.7593 4.0625C14.7593 2.5092 13.5001 1.25 11.9468 1.25C10.3935 1.25 9.13428 2.5092 9.13428 4.0625C9.13428 5.6158 10.3935 6.875 11.9468 6.875Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
