"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputField from "./InputFields";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { authenticatedRequest } from "@/config/request";
import { toast } from "react-toastify";
import { firebaseAuth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { IArenaModel } from "@/types/Arena";

const ModelForm = ({
  model,
  loading,
  setLoading,
  setOutputData,
}: {
  model: IArenaModel;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setOutputData: any;
}) => {
  const initialFormData: any = {};
  model.inputParams.forEach((ip) => {
    if (ip.default_value) {
      initialFormData[ip.id] = ip.default_value;
    }
  });
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter()
  const handleChange = (id: string, value: string | number | boolean) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!firebaseAuth.currentUser) {
      toast.error("Please login first")
      return router.push("/login")
    }
    try {
      setOutputData(null);
      setLoading(true);
      const resp = await authenticatedRequest.post("/jobs", { input: formData, model_id: model.model_id })
      setOutputData(resp.data.data);
    } catch (e) {
      console.log(e);
      toast.error("Some error occurred!!")
      setLoading(false);
      setOutputData(null)
    }
  };
  const handleReset = () => {
    const defaultFormData: any = {};
    model.inputParams.forEach((ip) => {
      if (ip.default_value) {
        defaultFormData[ip.id] = ip.default_value;
      }
    });
    setFormData(defaultFormData)
  }
  return (
    <div>
      <form
        className="flex flex-col gap-6 mt-10 pb-2.5 max-w-[848px]"
        onSubmit={handleSubmit}
      >
        {model.inputParams.map((param) => (
          <InputField
            key={param.id}
            param={param}
            handleChange={handleChange}
            formData={formData}
          />
        ))}
        <div className="">
          <div className="flex gap-2 items-center justify-end">
            {/* <button type="button" className="border border-black py-2 px-5">Reset</button> */}
            <button onClick={handleReset} className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-white-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Reset
              </span>
            </button>

            <button disabled={loading} className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-md  text-center px-4 py-1 rounded-lg flex items-center ${loading && "opacity-50"}`}>
              Run
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModelForm;
