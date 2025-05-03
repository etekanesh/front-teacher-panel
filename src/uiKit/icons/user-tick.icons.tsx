import { IconProps } from "core/types";

export const UserTickIcons = (props: IconProps) => {
  const { className, width, height, viewBox, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox ? viewBox : "0 0 18 18"}
      width={width ? width : "18px"}
      height={height ? height : "18px"}
      className={className ? className : ""}
      fill={"none"}
    >
      <path
        d="M9.21649 8.59459C11.1756 8.59459 12.7638 7.00642 12.7638 5.0473C12.7638 3.08818 11.1756 1.5 9.21649 1.5C7.25737 1.5 5.66919 3.08818 5.66919 5.0473C5.66919 7.00642 7.25737 8.59459 9.21649 8.59459Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.12207 15.6892C3.12207 12.9436 5.85349 10.723 9.21632 10.723C9.89741 10.723 10.5572 10.8152 11.1744 10.9855"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3107 12.8514C16.3107 13.3835 16.1617 13.8872 15.8992 14.3129C15.7502 14.5683 15.5587 14.7953 15.3387 14.9798C14.8421 15.4267 14.1894 15.6892 13.4728 15.6892C12.437 15.6892 11.536 15.1358 11.0465 14.3129C10.784 13.8872 10.635 13.3835 10.635 12.8514C10.635 11.9575 11.0465 11.1558 11.6992 10.6379C12.1887 10.2477 12.806 10.0135 13.4728 10.0135C15.0408 10.0135 16.3107 11.2835 16.3107 12.8514Z"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3662 12.8513L13.0686 13.5536L14.5797 12.156"
        stroke={color ? color : "#334155"}
        strokeWidth="1.13514"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
