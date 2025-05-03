import { IconProps } from "core/types";

export const DashboardIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            viewBox={viewBox ? viewBox : "0 0 19 19"}
            width={width ? width : "19px"}
            height={height ? height : "19px"}
            className={className ? className : ""}
            fill={"none"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.636 17.929H11.6031C15.7423 17.929 17.398 16.2733 17.398 12.1341V7.16701C17.398 3.02779 15.7423 1.3721 11.6031 1.3721H6.636C2.49678 1.3721 0.841095 3.02779 0.841095 7.16701V12.1341C0.841095 16.2733 2.49678 17.929 6.636 17.929Z"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0751 15.0316V11.803"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0751 5.88384V4.26955"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0755 10.1888C13.2642 10.1888 14.2279 9.22514 14.2279 8.03641C14.2279 6.84767 13.2642 5.88401 12.0755 5.88401C10.8867 5.88401 9.92309 6.84767 9.92309 8.03641C9.92309 9.22514 10.8867 10.1888 12.0755 10.1888Z"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.16383 15.0314V13.4171"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.16383 7.49814V4.26955"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.16411 13.4172C7.35285 13.4172 8.31651 12.4536 8.31651 11.2648C8.31651 10.0761 7.35285 9.11243 6.16411 9.11243C4.97538 9.11243 4.01172 10.0761 4.01172 11.2648C4.01172 12.4536 4.97538 13.4172 6.16411 13.4172Z"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
