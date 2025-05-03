import { IconProps } from "core/types";

export const EditTwoIcons = (props: IconProps) => {
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
                d="M10.8895 2.70016L4.73203 9.21766C4.49953 9.46516 4.27453 9.95266 4.22953 10.2902L3.95203 12.7202C3.85453 13.5977 4.48453 14.1977 5.35453 14.0477L7.76953 13.6352C8.10703 13.5752 8.57953 13.3277 8.81203 13.0727L14.9695 6.55516C16.0345 5.43016 16.5145 4.14766 14.857 2.58016C13.207 1.02766 11.9545 1.57516 10.8895 2.70016Z"
                stroke={color ? color : "#108B62"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.86157 3.78735C10.1841 5.85735 11.8641 7.43985 13.9491 7.64985"
                stroke={color ? color : "#108B62"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.19427 16.5H16.6943"
                stroke={color ? color : "#108B62"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
