import React from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button
      onClick={() => {}}
      className="px-8 py-3.5 mt-7 text-white bg-gray-900 rounded-md border border-solid border-zinc-600 shadow-[0px_2px_30px_rgba(147,97,232,0.25)] max-md:px-5"
    >
      {text}
    </button>
  );
};

export default Button;
