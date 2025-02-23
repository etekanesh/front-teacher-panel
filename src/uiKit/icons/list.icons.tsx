import { IconProps } from "types";

export const ListIcons = (props: IconProps) => {
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
                d="M7.67366 9.06046C7.58807 9.0519 7.48537 9.0519 7.39122 9.06046C5.35427 8.99199 3.73669 7.32306 3.73669 5.26899C3.73669 3.17213 5.4313 1.46896 7.53672 1.46896C9.63358 1.46896 11.3367 3.17213 11.3367 5.26899C11.3282 7.32306 9.71061 8.99199 7.67366 9.06046Z"
                stroke="#686F82"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.8792 3.18069C15.5395 3.18069 16.8747 4.5244 16.8747 6.17621C16.8747 7.79379 15.5909 9.11182 13.9904 9.17173C13.9219 9.16317 13.8449 9.16317 13.7679 9.17173"
                stroke="#686F82"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M3.39448 12.2186C1.3233 13.6051 1.3233 15.8646 3.39448 17.2425C5.7481 18.8173 9.60804 18.8173 11.9617 17.2425C14.0328 15.856 14.0328 13.5965 11.9617 12.2186C9.6166 10.6524 5.75666 10.6524 3.39448 12.2186Z"
                stroke="#686F82"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M15.5308 16.8745C16.147 16.7461 16.729 16.4979 17.2083 16.1299C18.5434 15.1285 18.5434 13.4767 17.2083 12.4754C16.7376 12.1159 16.1641 11.8763 15.5565 11.7393"
                stroke="#686F82"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
