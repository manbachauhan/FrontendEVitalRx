import React from "react";

const CustomButton = ({
  type = "button",
  label,
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white py-2  px-4 md:px-10 rounded-full hover:bg-white hover:text-black hover:border-black border-2 transition-all duration-300 w-full ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
