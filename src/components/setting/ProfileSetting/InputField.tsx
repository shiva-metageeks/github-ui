"use client";
import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { cn } from "@/utils/clx";
import { useUpdateUser } from "@/hooks/user";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/hooks/user";
interface InputFieldProps {
  field: {
    label: string;
    key: string;
    value: string;
    placeholder: string;
    isSocial: boolean;
    optional: boolean;
  };
}

const InputField: React.FC<InputFieldProps> = ({ field }) => {
  const { user } = useCurrentUser();
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(field.value);
  const { updateUserMutation, isPending } = useUpdateUser();

  const payload = field.isSocial
    ? { socials: { ...user?.socials, [field.key]: inputValue } }
    : { [field.key]: inputValue };

  const handleOnSave = () => {
    if (!inputValue) {
      toast.error("Please enter a value");
      return;
    }
    const toastId = toast.loading("Saving changes...");
    updateUserMutation(payload);
    toast.update(toastId, {
      render: "Changes saved successfully",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    setIsEdit(false);
  };

  return (
    <>
      <label
        htmlFor={field.label.toLowerCase().replace(/\s/g, "-")}
        className="self-start mt-7"
      >
        {field.label}{" "}
        {field.optional && <span className="text-neutral-700">(Optional)</span>}
      </label>
      <input
        type="text"
        readOnly={!isEdit}
        id={field.label.toLowerCase().replace(/\s/g, "-")}
        className={cn(
          "px-7 py-3.5 mt-1.5 text-sm font-semibold bg-gray-900 leading-none rounded-md text-neutral-400 max-md:px-5 max-md:max-w-full",
          !isEdit
            ? "border-none outline-none"
            : "border border-solid border-neutral-700"
        )}
        value={inputValue}
        placeholder={field.placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isEdit ? (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="self-end border border-solid border-neutral-700 flex gap-2 justify-center items-center  p-3 mt-2  text-center text-white rounded-md max-md:px-5"
          >
            <span>Cancel</span>
          </button>
          <button
            disabled={isPending}
            onClick={handleOnSave}
            className="bg-gradient-to-r py-3 from-[#5CB6DA] to-[#9361E8] self-end flex gap-2 justify-center items-center  p-3.5 mt-2  text-center text-white rounded-md shadow-[0px_2px_30px_rgba(147,97,232,0.25)] max-md:px-5"
          >
            <span>Save Changes</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="self-end py-3 flex gap-2 justify-center items-center  p-3.5 mt-2  text-center text-white rounded-md shadow-[0px_2px_30px_rgba(147,97,232,0.25)] max-md:px-5"
        >
          <span>
            <RiEditLine />
          </span>
          <span>Edit</span>
        </button>
      )}
    </>
  );
};

export default InputField;
