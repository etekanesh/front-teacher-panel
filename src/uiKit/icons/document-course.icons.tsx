import { IconProps } from "core/types";

export const DocumentCourseIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 16 15"}
            width={width ? width : "16px"}
            height={height ? height : "15px"}
            className={className ? className : ""}
            fill="none"
        >
            <path
                d="M14.6694 6.26605V9.35073C14.6694 12.4354 13.4355 13.6693 10.3508 13.6693H6.64924C3.56456 13.6693 2.33069 12.4354 2.33069 9.35073V5.64911C2.33069 2.56444 3.56456 1.33057 6.64924 1.33057H9.73391"
                stroke={color ? color : "white"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6694 6.26605H12.2016C10.3508 6.26605 9.73389 5.64911 9.73389 3.79831V1.33057L14.6694 6.26605Z"
                stroke={color ? color : "white"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.41528 8.11719H9.1169"
                stroke={color ? color : "white"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.41528 10.5845H7.88303"
                stroke={color ? color : "white"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
