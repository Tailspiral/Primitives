type IconProps = {
  color?: string;
  size?: "sm" | "md" | "lg";
  thickness?: number;
};
export const ChevronRight = ({
  color = "#333",
  size = "md",
  thickness = 1,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size === "sm" ? "12" : size === "md" ? "16" : "24"}
      height={size === "sm" ? "12" : size === "md" ? "16" : "24"}
      fill={color || "currentColor"}
      className="bi bi-chevron-right"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth={thickness}
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};
