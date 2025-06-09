import { IconProps } from "core/types";

export const ClipboardTextIcon = (props: IconProps) => {
  const { className, width, height, viewBox } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 17 17"}
      width={width ? width : "17px"}
      height={height ? height : "17px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M5.6665 8.6416H10.6248"
        stroke="#686F82"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.6665 11.4751H8.769"
        stroke="#686F82"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.08317 4.24984H9.9165C11.3332 4.24984 11.3332 3.5415 11.3332 2.83317C11.3332 1.4165 10.6248 1.4165 9.9165 1.4165H7.08317C6.37484 1.4165 5.6665 1.4165 5.6665 2.83317C5.6665 4.24984 6.37484 4.24984 7.08317 4.24984Z"
        stroke="#686F82"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 2.84766C13.6921 2.97516 14.875 3.84641 14.875 7.08349V11.3335C14.875 14.1668 14.1667 15.5835 10.625 15.5835H6.375C2.83333 15.5835 2.125 14.1668 2.125 11.3335V7.08349C2.125 3.85349 3.30792 2.97516 5.66667 2.84766"
        stroke="#686F82"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
