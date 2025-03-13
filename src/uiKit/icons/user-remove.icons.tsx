import { IconProps } from "types";

export const UserRemoveIcons = (props: IconProps) => {
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
        d="M9.02728 8.45946C10.9864 8.45946 12.5746 6.87128 12.5746 4.91217C12.5746 2.95305 10.9864 1.36487 9.02728 1.36487C7.06816 1.36487 5.47998 2.95305 5.47998 4.91217C5.47998 6.87128 7.06816 8.45946 9.02728 8.45946Z"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.93286 15.554C2.93286 12.8084 5.66428 10.5878 9.02712 10.5878C9.7082 10.5878 10.368 10.6801 10.9852 10.8503"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.1212 12.7163C16.1212 12.9433 16.0929 13.1632 16.0361 13.376C15.9722 13.6598 15.8587 13.9365 15.7098 14.1777C15.2202 15.0007 14.3192 15.5541 13.2834 15.5541C12.5527 15.5541 11.8929 15.2774 11.3962 14.8233C11.1834 14.6389 10.9989 14.419 10.857 14.1777C10.5945 13.7521 10.4456 13.2484 10.4456 12.7163C10.4456 11.95 10.7506 11.2477 11.2472 10.7369C11.7652 10.2048 12.4888 9.87842 13.2834 9.87842C14.1206 9.87842 14.8797 10.2403 15.3905 10.822C15.8445 11.3257 16.1212 11.9926 16.1212 12.7163Z"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.0143 11.9642L12.5173 13.4612"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5317 11.9783L14.0358 13.4753"
        stroke={color ? color : "#334155"}
        stroke-width="1.2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
