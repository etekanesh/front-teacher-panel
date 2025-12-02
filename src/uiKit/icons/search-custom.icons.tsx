import { IconProps } from "core/types";

export const SearchCustomIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 14 14"}
            width={width ? width : "14px"}
            height={height ? height : "14px"}
            className={className ? className : ""}
            fill={"none"}
        >
            <g opacity="0.8">
                <path
                    d="M6.44288 12.3857C9.72503 12.3857 12.3857 9.725 12.3857 6.44285C12.3857 3.1607 9.72503 0.5 6.44288 0.5C3.16073 0.5 0.5 3.1607 0.5 6.44285C0.5 9.725 3.16073 12.3857 6.44288 12.3857Z"
                    stroke={color ? color : "#686F82"}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M13.5 13.5L11.6428 11.6429"
                    stroke={color ? color : "#686F82"}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
        </svg>
    );
};
