import { IconProps } from "core/types";

export const VideoIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox || "0 0 11 12"}
            width={width || "11px"}
            height={height || "12px"}
            className={className || ""}
            fill="none"
        >
            <path
                d="M9.9556 7.33677V4.66339C9.9556 2.43556 9.06447 1.54443 6.83665 1.54443H4.16326C1.93544 1.54443 1.04431 2.43556 1.04431 4.66339V7.33677C1.04431 9.56459 1.93544 10.4557 4.16326 10.4557H6.83665C9.06447 10.4557 9.9556 9.56459 9.9556 7.33677Z"
                stroke={color || "#686F82"}
                strokeWidth="0.668347"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.27612 3.82129H9.72403"
                stroke={color || "#686F82"}
                strokeWidth="0.668347"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.94946 1.59351V3.75895"
                stroke={color || "#686F82"}
                strokeWidth="0.668347"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.05054 1.59351V3.55845"
                stroke={color || "#686F82"}
                strokeWidth="0.668347"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.49744 7.09176V6.55708C4.49744 5.87091 4.9831 5.59021 5.5757 5.93329L6.03909 6.20063L6.50248 6.46797C7.09508 6.81105 7.09508 7.37246 6.50248 7.71555L6.03909 7.98289L5.5757 8.25023C4.9831 8.59331 4.49744 8.31261 4.49744 7.62644V7.09176Z"
                stroke={color || "#686F82"}
                strokeWidth="0.668347"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
