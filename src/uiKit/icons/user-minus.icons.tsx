import { IconProps } from "core/types";

export const UserMinusIcons = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 18 19"}
      width={width ? width : "18px"}
      height={height ? height : "19px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M8.62176 8.45946C10.5809 8.45946 12.1691 6.87128 12.1691 4.91217C12.1691 2.95305 10.5809 1.36487 8.62176 1.36487C6.66264 1.36487 5.07446 2.95305 5.07446 4.91217C5.07446 6.87128 6.66264 8.45946 8.62176 8.45946Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.52734 15.554C2.52734 12.8084 5.25878 10.5878 8.62162 10.5878C9.3027 10.5878 9.9625 10.6801 10.5797 10.8503"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7157 12.7163C15.7157 12.9433 15.6873 13.1632 15.6306 13.376C15.5667 13.6598 15.4532 13.9365 15.3042 14.1777C14.8147 15.0007 13.9137 15.5541 12.8779 15.5541C12.1471 15.5541 11.4874 15.2774 10.9907 14.8233C10.7779 14.6389 10.5934 14.419 10.4515 14.1777C10.189 13.7521 10.04 13.2484 10.04 12.7163C10.04 11.95 10.3451 11.2477 10.8417 10.7369C11.3596 10.2048 12.0833 9.87842 12.8779 9.87842C13.715 9.87842 14.4741 10.2403 14.985 10.822C15.439 11.3257 15.7157 11.9926 15.7157 12.7163Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9352 12.7021H11.821"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
