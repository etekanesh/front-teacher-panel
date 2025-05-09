import { IconProps } from "core/types";

export const FinanceRequestIcons = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 24 24"}
      width={width ? width : "24px"}
      height={height ? height : "24px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M13.55 4.11111C13.55 5.27705 10.9644 6.22222 7.775 6.22222C4.58556 6.22222 2 5.27705 2 4.11111M13.55 4.11111C13.55 2.94518 10.9644 2 7.775 2C4.58556 2 2 2.94518 2 4.11111M13.55 4.11111V5.69444M2 4.11111V16.7778C2 17.9437 4.58556 18.8889 7.775 18.8889M7.775 10.4444C7.59803 10.4444 7.42291 10.4415 7.25 10.4358C4.30659 10.3389 2 9.43457 2 8.33333M7.775 14.6667C4.58556 14.6667 2 13.7215 2 12.5556M22 9.97222C22 11.1382 19.4144 12.0833 16.225 12.0833C13.0356 12.0833 10.45 11.1382 10.45 9.97222M22 9.97222C22 8.80629 19.4144 7.86111 16.225 7.86111C13.0356 7.86111 10.45 8.80629 10.45 9.97222M22 9.97222V17.8889C22 19.0548 19.4144 20 16.225 20C13.0356 20 10.45 19.0548 10.45 17.8889V9.97222M22 13.9306C22 15.0965 19.4144 16.0417 16.225 16.0417C13.0356 16.0417 10.45 15.0965 10.45 13.9306"
        stroke={color ? color : "#108B62"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
