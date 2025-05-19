import { IconProps } from "core/types";

export const ChartMarketingIcon = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 16 16"}
      width={width ? width : "16px"}
      height={height ? height : "16px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M14.74 8.49057V6.50377C14.74 5.26743 14.74 4.64926 14.5038 4.17704C14.2961 3.76166 13.9647 3.42395 13.557 3.21231C13.0935 2.9717 12.4868 2.9717 11.2733 2.9717H5.20666C3.99321 2.9717 3.38649 2.9717 2.92301 3.21231C2.51533 3.42395 2.18387 3.76166 1.97614 4.17704C1.73999 4.64926 1.73999 5.26743 1.73999 6.50377V8.76038C1.73999 9.99672 1.73999 10.6149 1.97614 11.0871C2.18387 11.5025 2.51533 11.8402 2.92301 12.0518C3.38649 12.2925 3.99321 12.2925 5.20666 12.2925H6.67518M14.74 7.38679H1.73999M11.1289 1.5V4.4434M5.3511 1.5V4.4434M12.5733 14.5V10.0849M10.4067 12.2925H14.74"
        stroke="#334155"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
