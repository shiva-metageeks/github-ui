import React from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="w-full mt-6">
      <label
        htmlFor={label.toLowerCase().replace(/\s/g, "-")}
        className="mt-6 text-base font-medium text-zinc-500"
      >
        {label}
      </label>
      <input
        type="text"
        id={label.toLowerCase().replace(/\s/g, "-")}
        placeholder={placeholder}
        className="self-stretch px-5 text-white bg-gray-900 py-3.5 mt-1.5 text-base font-medium rounded-md border border-solid border-neutral-700  max-md:pr-5 max-md:mr-2.5 max-md:max-w-full w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
