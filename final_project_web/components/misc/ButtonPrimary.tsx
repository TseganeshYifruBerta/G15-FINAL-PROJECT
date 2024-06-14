import React, { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
  addClass?: string; 
  onClick?: () => void;// Marked as optional since you might not always want to add extra classes
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children, addClass = "", onClick }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-[#7983FB] hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
