import React from "react";

const SaveButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="self-end px-8 py-3.5 mt-7 font-semibold text-center text-white rounded-md shadow-[0px_2px_30px_rgba(147,97,232,0.25)] max-md:px-5"
    >
      Save Change
    </button>
  );
};

export default SaveButton;
