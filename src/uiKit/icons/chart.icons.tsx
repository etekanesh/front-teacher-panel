import { IconProps } from "core/types";

export const ChartIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 15 16"}
            width={width ? width : "15px"}
            height={height ? height : "16px"}
            className={className ? className : ""}
            fill="none"
        >
            <path
                d="M13 5.40695V11.766C13 13.7227 11.8325 14.3749 10.3911 14.3749H5.17343C3.73204 14.3749 2.56458 13.7227 2.56458 11.766V5.40695C2.56458 3.28726 3.73204 2.7981 5.17343 2.7981C5.17343 3.20247 5.33647 3.56771 5.60388 3.83511C5.87128 4.10252 6.23654 4.26558 6.64091 4.26558H8.92366C9.73241 4.26558 10.3911 3.60684 10.3911 2.7981C11.8325 2.7981 13 3.28726 13 5.40695Z"
                stroke={color ? color : "#334155"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.3911 2.79829C10.3911 3.60704 9.73232 4.26577 8.92357 4.26577H6.64082C6.23645 4.26577 5.87119 4.10272 5.60378 3.83531C5.33638 3.5679 5.17334 3.20266 5.17334 2.79829C5.17334 1.98955 5.83208 1.33081 6.64082 1.33081H8.92357C9.32794 1.33081 9.6932 1.49387 9.96061 1.76127C10.228 2.02868 10.3911 2.39392 10.3911 2.79829Z"
                stroke={color ? color : "#334155"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.17334 8.50513H7.7822"
                stroke={color ? color : "#334155"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.17334 11.114H10.3911"
                stroke={color ? color : "#334155"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
