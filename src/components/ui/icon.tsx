import * as React from "react";

export const SearchIcon = ({
  size = 46,
  strokeWidth = 2,
  color = "#000000",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m21 21-6-6m2-5a7.001 7.001 0 0 1-11.95 4.95A7 7 0 1 1 17 10Z" />
  </svg>
);

export const Qrcode = ({
  size = 46,
  strokeWidth = 2,
  color = "#000000",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 4v1" />
    <path d="M18 16h2" />
    <path d="M14 16h-2v4" />
    <path d="M12 9v3m0 0h.01M12 12h4.01" />
    <path d="M16 20h4" />
    <path d="M4 12h4" />
    <path d="M20 12h.01" />
    <path d="M7 8H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" />
    <path d="M19 8h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" />
    <path d="M7 20H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Z" />
  </svg>
);
