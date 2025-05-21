import { IconProps } from "core/types";

export const EyeIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 13 13"}
            width={width ? width : "13px"}
            height={height ? height : "13px"}
            className={className ? className : ""}
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.63971 11.5784C9.68539 11.5784 12.1544 9.0288 12.1544 7.28922C12.1544 5.54963 9.68539 3 6.63971 3C3.59403 3 1.125 5.55141 1.125 7.28922C1.125 9.02702 3.59403 11.5784 6.63971 11.5784Z"
                stroke={color ? color : "#686F82"}
                strokeLinejoin="round"
            />
            <path
                d="M6.80601 9.1324C7.82124 9.1324 8.64424 8.30939 8.64424 7.29417C8.64424 6.27894 7.82124 5.45593 6.80601 5.45593C5.79078 5.45593 4.96777 6.27894 4.96777 7.29417C4.96777 8.30939 5.79078 9.1324 6.80601 9.1324Z"
                stroke={color ? color : "#686F82"}
                strokeLinejoin="round"
            />
            <path
                d="M3.51709 2.47369L4.31197 3.58282"
                stroke={color ? color : "#686F82"}
                strokeLinecap="round"
            />
            <path
                d="M10.3677 2.60986L9.57275 3.71902"
                stroke={color ? color : "#686F82"}
                strokeLinecap="round"
            />
            <path
                d="M6.80908 1.16669V3.00492"
                stroke={color ? color : "#686F82"}
                strokeLinecap="round"
            />
        </svg>
    );
};
