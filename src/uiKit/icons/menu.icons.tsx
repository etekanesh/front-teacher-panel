import { IconProps } from "core/types";

export const MenuIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 16 16"}
            width={width ? width : "16px"}
            height={height ? height : "16px"}
            className={className ? className : ""}
            fill="none"
        >
            <path
                d="M2 4.66675H14"
                stroke={color ? color : "#686F82"}
                strokeOpacity="0.5"
                strokeLinecap="round"
            />
            <path
                d="M2 8H14"
                stroke={color ? color : "#686F82"}
                strokeOpacity="0.5"
                strokeLinecap="round"
            />
            <path
                d="M2 11.3333H14"
                stroke={color ? color : "#686F82"}
                strokeOpacity="0.5"
                strokeLinecap="round"
            />
        </svg>
    );
};
