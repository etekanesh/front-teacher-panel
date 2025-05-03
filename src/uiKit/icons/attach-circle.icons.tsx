import { IconProps } from "core/types";

export const AttachCircleIcons = (props: IconProps) => {
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
            <g opacity="0.5">
                <path
                    d="M11.8 11.8L13.21 13.21C13.99 13.99 13.99 15.26 13.21 16.04C12.43 16.82 11.16 16.82 10.38 16.04L8.15998 13.82C6.59998 12.26 6.59998 9.72999 8.15998 8.15999C9.71998 6.59999 12.25 6.59999 13.82 8.15999L16.24 10.58C17.58 11.92 17.58 14.09 16.24 15.43"
                    stroke={color ? color : "#686F82"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
                    stroke={color ? color : "#686F82"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
};
