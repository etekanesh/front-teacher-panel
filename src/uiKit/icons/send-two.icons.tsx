import { IconProps } from "types";

export const SendTwoIcons = (props: IconProps) => {
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
                d="M11.6237 3.52409L4.93318 1.29392C1.93072 0.293096 0.299462 1.93223 1.2924 4.93469L3.52257 11.6252C5.01986 16.125 7.47857 16.125 8.97586 11.6252L9.63782 9.63933L11.6237 8.97737C16.1234 7.48008 16.1234 5.02926 11.6237 3.52409Z"
                stroke={color ? color : "white"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.48834 9.30052L6.66714 6.47144"
                stroke={color ? color : "white"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
