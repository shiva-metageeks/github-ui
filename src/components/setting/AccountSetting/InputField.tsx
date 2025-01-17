import React from "react";

interface InputFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="w-[80%] mt-6">
      <label
        htmlFor={label.toLowerCase().replace(/\s/g, "-")}
        className="mt-7 me-8 "
      >
        {label}
      </label>
      <input
        id={label.toLowerCase().replace(/\s/g, "-")}
        type={type}
        value={value}
        placeholder={placeholder}
        className="px-5 py-3.5 mt-1.5 max-w-full text-sm font-semibold leading-none whitespace-nowrap rounded-md border border-solid border-neutral-700 text-neutral-400 w-[1192px] bg-gray-900 max-md:px-5"
      />
    </div>
  );
};

export default InputField;
