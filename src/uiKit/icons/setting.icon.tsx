import { IconProps } from "core/types";

export const SettingIcon = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 28 19"}
      width={width ? width : "28px"}
      height={height ? height : "19px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M21.833 4.77075H17.083"
        stroke={color ? color : "#686F82"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16667 4.77075H6"
        stroke={color ? color : "#686F82"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3333 7.54167C13.8636 7.54167 15.1042 6.30112 15.1042 4.77083C15.1042 3.24054 13.8636 2 12.3333 2C10.803 2 9.5625 3.24054 9.5625 4.77083C9.5625 6.30112 10.803 7.54167 12.3333 7.54167Z"
        stroke={color ? color : "#686F82"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.8337 13.4792H18.667"
        stroke={color ? color : "#686F82"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 13.4792H6"
        stroke={color ? color : "#686F82"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5003 16.2499C17.0306 16.2499 18.2712 15.0094 18.2712 13.4791C18.2712 11.9488 17.0306 10.7083 15.5003 10.7083C13.97 10.7083 12.7295 11.9488 12.7295 13.4791C12.7295 15.0094 13.97 16.2499 15.5003 16.2499Z"
        stroke={color ? color : "#686F82"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
