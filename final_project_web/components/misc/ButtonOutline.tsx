// ButtonOutline.tsx
import React from 'react';

interface ButtonOutlineProps {
  children: React.ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({ children }) => {
  return (
    <button className="border rounded-full border-[#7983FB] text-[#7983FB] hover:bg-[#7983FB] hover:text-white p-2 px-6 transition duration-300 mr-10">
      {children}
    </button>
  );
};

export default ButtonOutline;
