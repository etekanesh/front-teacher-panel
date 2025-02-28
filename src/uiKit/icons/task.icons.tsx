import { IconProps } from "types";

export const TaskIcons = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 20 20"}
            width={width ? width : "20px"}
            height={height ? height : "20px"}
            className={className ? className : ""}
            fill={"none"}
        >
            <path
                d="M8.97917 15.2812H16.6875"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.97917 9.88542H16.6875"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.97917 4.48958H16.6875"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.8125 4.48959L3.58333 5.26042L5.89583 2.94792"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.8125 9.88542L3.58333 10.6562L5.89583 8.34375"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.8125 15.2812L3.58333 16.0521L5.89583 13.7396"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
