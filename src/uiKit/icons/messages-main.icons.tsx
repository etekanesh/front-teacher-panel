import { IconProps } from "core/types";

export const MessagesMainIcons = (props: IconProps) => {
    const { className, width, height, viewBox } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 17 17"}
            width={width ? width : "20px"}
            height={height ? height : "20px"}
            className={className ? className : ""}
            fill={"none"}
        >

            <path d="M5.75814 12.8708H5.41943C2.7098 12.8708 1.35498 12.1934 1.35498 8.80632V5.41928C1.35498 2.70965 2.7098 1.35483 5.41943 1.35483H10.8387C13.5483 1.35483 14.9032 2.70965 14.9032 5.41928V8.80632C14.9032 11.516 13.5483 12.8708 10.8387 12.8708H10.5C10.29 12.8708 10.0868 12.9724 9.95807 13.1417L8.94196 14.4966C8.49487 15.0927 7.76327 15.0927 7.31618 14.4966L6.30007 13.1417C6.19168 12.9927 5.94104 12.8708 5.75814 12.8708Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.836 7.4515H10.842" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.126 7.4515H8.13208" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.41555 7.4515H5.42163" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );
};
