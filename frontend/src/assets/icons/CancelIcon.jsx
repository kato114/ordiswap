import React from "react";

function CancelIcon({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <g
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      >
        <path d="M12 33C8.66666 33 4 31.5 4 25.5C4 18.5 11 17 13 17C14 13.5 16 8 24 8C31 8 34 12 35 15.5C35 15.5 44 16.5 44 25C44 31 40 33 36 33"></path>
        <path d="M29 28L19 38"></path>
        <path d="M19 28L29 38"></path>
      </g>
    </svg>
  );
}

export default CancelIcon;
