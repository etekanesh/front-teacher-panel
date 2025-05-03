import { IconProps } from "core/types";

export const DoubleTickIcons = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 14 9"}
            width={width ? width : "14px"}
            height={height ? height : "9px"}
            className={className ? className : ""}
            fill={"none"}
        >
            <path
                d="M10.5918 0.849032L9.7428 0L5.92516 3.81763L6.77419 4.66667L10.5918 0.849032ZM13.1449 0L6.77419 6.37075L4.2572 3.85979L3.40817 4.70882L6.77419 8.07484L14 0.849032L13.1449 0ZM0 4.70882L3.36602 8.07484L4.21505 7.22581L0.855054 3.85979L0 4.70882Z"
                fill={color ? color : "#40C792"}
            />
        </svg>
    );
};
