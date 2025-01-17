import FileInput from "./FileInput";
import { RxText, RxTextAlignJustify } from "react-icons/rx";
import { MdOutlineNumbers } from "react-icons/md";

const InputField = ({
  param,
  handleChange,
  formData,
}: {
  param: any;
  handleChange: (id: string, value: string | number | boolean) => void;
  formData: any;
}) => {
  const { type, id, title, required, min, max, default_value, readonly, placeholder , description } =
    param;

  if (type === "string") {
    return (
      <div>
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-2 items-center justify-between whitespace-nowrap">
              <RxText className="w-4 h-4" />
              <div className="block text-sm font-medium">{title}</div>
            <div className="text-neutral-500 text-sm">{type}</div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="px-2 py-0.5 border border-neutral-500 rounded flex justify-center items-center">
              <p className="text-xs text-neutral-500">Shift</p>
            </div>
            <p className="text-neutral-500">+</p>
            <div className="px-2 py-0.5 border border-neutral-500 rounded flex justify-center items-center">
              <p className="text-xs text-neutral-500">Return</p>
            </div>
            <p className="text-xs text-neutral-500">to add a new line</p>
          </div>
        </div>
        <textarea
          rows={4}
          id={id}
          className="mt-2 w-full p-2 rounded text-white bg-transparent border border-gray-700 border-solid min-h-[42px] max-md:max-w-full"
          required={required}
          defaultValue={default_value}
          placeholder={placeholder}
          onChange={(e) => handleChange(id, e.target.value)}
          readOnly={readonly}
        />
                    <p className="text-xs text-neutral-500 mt-1">
                      {description}
                    </p>
        
      </div>
    );
  } else if (type === "integer") {
    return (
      <div>
        <div className="flex flex-wrap gap-5 justify-between content-center mt-5 w-full max-md:max-w-full">
          <div className="flex gap-0 justify-between whitespace-nowrap">
            <div className="flex gap-1.5 text-base leading-6 text-white">
             <MdOutlineNumbers/>
              <div className="block text-sm font-medium">{title}</div>
            </div>
            <div className="my-auto text-sm leading-5 ms-2  text-zinc-500">
              number
            </div>
          </div>
          <div className="my-auto text-xs leading-5 text-zinc-500">
            (minimum: {min}, maximum: {max})
          </div>
        </div>
        <div className="mt-2 text-base leading-6 text-white whitespace-nowrap max-md:flex-wrap">
          <input
            id={id}
            min={min}
            max={max}
            type="number"
            value={formData[id] || default_value}
            onChange={(e) => handleChange(id, parseFloat(e.target.value))}
            className=" w-full justify-center p-2 bg-transparent border border-gray-700 rounded border-solid"
          />{" "}
                    <p className="text-xs text-neutral-500 mt-1">
                      {description}
                    </p>
          
        </div>
      </div>
    );
  } else if (type === "number") {
    return (
      <div>
        <div className="flex flex-wrap gap-5 justify-between content-center mt-5 w-full max-md:max-w-full">
          <div className="flex gap-0 justify-between whitespace-nowrap">
            <div className="flex gap-1.5 text-base leading-6 text-white">
              <RxTextAlignJustify className="w-4 h-4" />
              <div className="block text-sm font-medium">{title}</div>

            </div>
            <div className="my-auto text-sm leading-5 ms-2  text-zinc-500">
              number
            </div>
          </div>
          <div className="my-auto text-xs leading-5 text-zinc-500">
            (minimum: {min}, maximum: {max})
          </div>
        </div>
        <div className="flex gap-4 justify-between mt-2 text-base leading-6 text-black whitespace-nowrap max-md:flex-wrap">
          <input
            id={id}
            min={min}
            max={max}
            type="number"
            step={0.01}
            value={formData[id] || default_value}
            onChange={(e) => handleChange(id, parseFloat(e.target.value))}
            className="justify-center p-2 text-white rounded bg-transparent border border-gray-700 border-solid"
          />

          <input
            className="w-full"
            type="range"
            id={id}
            min={min}
            max={max}
            step={0.01}
            defaultValue={default_value}
            onChange={(e) => handleChange(id, parseFloat(e.target.value))}
          />
          
        </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {description}
                    </p>
      </div>
    );
  } else if (type === "file") {
    
    return <FileInput param={param} handleChange={handleChange} />;
  }
  return null;
};

export default InputField;
