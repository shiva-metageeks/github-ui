import React from "react";

interface CheckboxItem {
  label: string;
  name: string;
}

interface CheckboxGroupProps {
  title?: string;
  items: CheckboxItem[];
  isActive?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  items,
  isActive = false,
}) => {
  return (
    <div className="flex flex-col items-start w-full text-base text-zinc-500 max-md:mt-10 max-md:max-w-full">
      {title && <h2 className="font-semibold text-stone-300">{title}</h2>}
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-center gap-2.5 mt-4"
        >
          <input
            type="checkbox"
            id={item.name}
            name={item.name}
            checked={true}
            // readOnly
            // disabled
            className={`appearance-none text-sm shrink-0 rounded-sm border-2 mt-1 border-solid h-[15px] w-[15px] ${
              isActive || title === "Inference"
                ? "text-zinc-300 border-zinc-300 checked:bg-zinc-300 checked:border-zinc-300"
                : "border-zinc-500 text-zinc-500 checked:bg-zinc-500 checked:border-zinc-500"
            }`}
          />
          <label
            htmlFor={item.name}
            className={`flex-auto text-sm max-md:max-w-full cursor-not-allowed ${
              isActive ? "text-zinc-300" : ""
            }`}
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
