import { IconProps } from "core/types";

export const DirectSaleIcon = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 22 22"}
      width={width ? width : "22px"}
      height={height ? height : "22px"}
      className={className ? className : ""}
      fill="none"
    >
      <path
        d="M8.17549 13.0333C8.17549 14.2576 9.16792 15.25 10.3922 15.25H12.4505C13.7622 15.25 14.8255 14.1867 14.8255 12.875C14.8255 11.5633 13.7622 10.5 12.4505 10.5H10.5505C9.23881 10.5 8.17549 9.43668 8.17549 8.125C8.17549 6.81332 9.23881 5.75 10.5505 5.75H12.6088C13.8331 5.75 14.8255 6.74244 14.8255 7.96667M11.5005 4.325V5.75M11.5005 15.25V16.675M21.0005 10.5C21.0005 15.7467 16.7472 20 11.5005 20C6.25378 20 2.00049 15.7467 2.00049 10.5C2.00049 5.25329 6.25378 1 11.5005 1C16.7472 1 21.0005 5.25329 21.0005 10.5Z"
        stroke="#108B62"
        stroke-width="1.82"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
