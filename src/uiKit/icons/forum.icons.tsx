import { IconProps } from "types";

export const ForumIcons = (props: IconProps) => {
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
                d="M17.1176 8.98124V5.67071C17.1176 4.16741 17.1176 3.41577 16.8291 2.84158C16.5754 2.33651 16.1704 1.92588 15.6723 1.66854C15.1061 1.37598 14.3648 1.37598 12.8824 1.37598H7.23529C5.7528 1.37598 5.01156 1.37598 4.44532 1.66854C3.94724 1.92588 3.54229 2.33651 3.28851 2.84158C3 3.41577 3 4.16741 3 5.67071V12.9818C3 14.4851 3 15.2368 3.28851 15.811C3.54229 16.316 3.94724 16.7267 4.44532 16.984C5.01156 17.2766 5.7528 17.2766 7.23529 17.2766H10.0588M11.8235 9.42861H6.52941M8.29412 13.0076H6.52941M13.5882 5.84966H6.52941M15.3529 18.376V13.0076M12.7059 15.6918H18"
                stroke={color ? color : "#686F82"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
