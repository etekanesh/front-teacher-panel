import { IconProps } from "core/types";

export const CalendarIcon = (props: IconProps) => {
    const { className, width, height, viewBox, color } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox ? viewBox : "0 0 15 15"}
            width={width ? width : "15px"}
            height={height ? height : "15px"}
            className={className ? className : ""}
            fill="none"
        >
            <path
                d="M13.9162 7.98411V6.02295C13.9162 4.80256 13.9162 4.19236 13.6831 3.72624C13.478 3.31622 13.1509 2.98287 12.7484 2.77395C12.2909 2.53645 11.692 2.53645 10.4942 2.53645H4.50586C3.30807 2.53645 2.70917 2.53645 2.25168 2.77395C1.84926 2.98287 1.52207 3.31622 1.31703 3.72624C1.08392 4.19236 1.08392 4.80256 1.08392 6.02295V8.25043C1.08392 9.47082 1.08392 10.081 1.31703 10.5471C1.52207 10.9572 1.84926 11.2905 2.25168 11.4994C2.70917 11.7369 3.30807 11.7369 4.50586 11.7369H5.95543M13.9162 6.89457H1.08392M10.3517 1.08374V3.98916M4.64844 1.08374V3.98916M11.7775 13.916V9.55787M9.63876 11.7369H13.9162"
                stroke={color ? color : "#334155"}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
