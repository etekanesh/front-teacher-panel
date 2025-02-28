import { IconProps } from "types";

export const ExitIcons = (props: IconProps) => {
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
                d="M9.96885 5.93612V10M6.71776 7.56128C6.20741 8.24055 5.90498 9.08495 5.90498 10C5.90498 12.2444 7.72444 14.0639 9.96885 14.0639C12.2133 14.0639 14.0327 12.2444 14.0327 10C14.0327 9.08495 13.7303 8.24055 13.2199 7.56128M18.0966 10C18.0966 14.4888 14.4577 18.1277 9.96885 18.1277C5.48002 18.1277 1.84111 14.4888 1.84111 10C1.84111 5.51117 5.48002 1.87225 9.96885 1.87225C14.4577 1.87225 18.0966 5.51117 18.0966 10Z"
                stroke="#EF5353"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
