import { IconProps } from "core/types";

export const ClipboardIcon = (props: IconProps) => {
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
                d="M8.53369 13.4752L9.90869 14.8502L13.5754 11.1835"
                stroke={color ? color : "#108B62"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.16683 5.5H12.8335C14.6668 5.5 14.6668 4.58333 14.6668 3.66667C14.6668 1.83333 13.7502 1.83333 12.8335 1.83333H9.16683C8.25016 1.83333 7.3335 1.83333 7.3335 3.66667C7.3335 5.5 8.25016 5.5 9.16683 5.5Z"
                stroke={color ? color : "#108B62"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6667 3.685C17.7192 3.85 19.25 4.9775 19.25 9.16667V14.6667C19.25 18.3333 18.3333 20.1667 13.75 20.1667H8.25C3.66667 20.1667 2.75 18.3333 2.75 14.6667V9.16667C2.75 4.98667 4.28083 3.85 7.33333 3.685"
                stroke={color ? color : "#108B62"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
