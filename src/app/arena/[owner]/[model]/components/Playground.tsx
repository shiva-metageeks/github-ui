"use client";
import { useState, useEffect, ReactNode } from "react";
import ModelForm from "./dynamicForm/ModelForm";
import JsonFormatter from "react-json-formatter";
import { IoRocketOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { TbReportSearch, TbVersions } from "react-icons/tb";
import { IoPlayOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa6";
import { RiDownload2Line, RiShareForwardLine } from "react-icons/ri";
import { authenticatedRequest } from "@/config/request";
import MetricsContainer from "./dynamicForm/MetricsContainer";
import AudioWave from "./dynamicForm/AudioWave";
import { IArenaModel } from "@/types/Arena";
import Loader from "./Loader";

interface OutputData {
  _id:string,
  completed_at: string;
  created_at: string;
  error: string | null;
  input: {
    top_p: number;
    prompt: string;
    temperature: number;
  };
  metrics: {
    total_time: number;
    input_token_count?: number;
    tokens_per_second?: number;
    output_token_count?: number;
    predict_time?: number;
    time_to_first_token?: number;
  };
  output: string[];
  started_at: string;
  status: string;
}

const defaultData = {
  completed_at: "2024-05-03T13:45:15.445073Z",
  created_at: "2024-05-03T13:45:13.788000Z",
  error: null,
  input: {
    top_p: 0.95,
    prompt:
      "Johnny has 8 billion parameters. His friend Tommy has 70 billion parameters. What does this mean when it comes to speed?",
    temperature: 0.7,
  },
  metrics: {
    total_time: 1.657073,
    // input_token_count: 39,
    // tokens_per_second: 92.80206135476371,
    // output_token_count: 149,
    // predict_time: 1.652461,
    // time_to_first_token: 0.060728942999999994,
  },
  output: [
    `The number of parameters in a neural network can impact its speed, but it's not the only factor.

    In general, a larger number of parameters can lead to:
    
    1. Increased computational complexity: More parameters mean more calculations are required to process the data.
    2. Increased memory requirements: Larger models require more memory to store their parameters, which can impact system performance.
    
    However, it's worth noting that the relationship between the number of parameters and speed is not always linear. Other factors, such as:
    
    * Model architecture
    * Optimizer choice
    * Hyperparameter tuning
    
    can also impact the speed of a neural network.
    
    In the case of Johnny and Tommy, it's difficult to say which one's model will be faster without more information about the models themselves.`,
  ],
  started_at: "2024-05-03T13:45:13.792612Z",
  status: "succeeded",
};
const Playground = ({
  modelData,
}: {
  modelData: IArenaModel;
}) => {


  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "json">("preview");
  if (modelData?.default_output) {
    defaultData.output = modelData?.default_output;
  }
  const [outputData, setOutputData] = useState<OutputData | null>(null);
  const fetchJobStatus=async ()=>{
    const resp  = await authenticatedRequest("/jobs/"+outputData?._id)
    setOutputData(resp.data.data)
  }
  useEffect(() => {
    setOutputData(null);
  }, [modelData?.title]);
  useEffect(() => {
    if (outputData?.status == "success" || outputData?.status == "error" ) {
      setLoading(false);
    }
    else if(outputData?.status=="pending"){
      setLoading(true)
      const i =setInterval(()=>{
        fetchJobStatus()
      },3000)
      return ()=>{clearInterval(i)}
    }
  }, [outputData?.status]);
  return (
    <div className="flex w-full h-full">
      <div className="w-[50%] py-6 pr-4 border-r border-[#14121c] px-6">
        <h2 className="text-lg font-semibold ">Input</h2>
        <ModelForm
          model={modelData}
          loading={loading}
          setLoading={setLoading}
          setOutputData={setOutputData}
        />
      </div>

      <div className="w-[50%]  text-white ">
        <div className="">
          {/* Image Section */}
          <h1 className=" mt-5 px-6 text-xl">Output</h1>
          <div className="flex gap-5 px-6 border-b border-[#272530]">
            <button
              className={`pt-2.5 pb-3 font-semibold ${activeTab == "preview"
                ? "border-b-2 border-solid border-white"
                : "text-stone-500 "
                }`}
              onClick={() => {
                setActiveTab("preview");
              }}
            >
              Preview
            </button>
            <button
              className={`justify-center font-semibold py-3 leading-[145%] ${activeTab == "json"
                ? "border-b-2 border-solid border-white"
                : "text-stone-500 "
                }`}
              onClick={() => {
                setActiveTab("json");
              }}
            >
              JSON
            </button>
          </div>

          
            <OutputViewerContainer
              activeTab={activeTab}
              outputData={outputData}
              loading={loading}
            />

          {/* Details Section */}
          {outputData?.metrics?.total_time && <div className="flex justify-between px-6">
            <MetricsContainer data={outputData.metrics}/>
            <div className="flex gap-1 mt-6">
              {/* <button className=" flex items-center gap-2 text-sm border text-white px-4 py-1 rounded-md">
                <img src="/asset/Group.svg" alt="" />
                Tweak it
              </button> */}
              {/* \ */}
              {/* <button className=" flex gap-1 items-center text-sm border text-white px-4 py-1 rounded-md">
                <TbReportSearch className="h-4 w-4" />
                Reports
              </button> */}
            </div>
          </div>}
        </div>


      </div>
    </div>

  );
};
const OutputViewerContainer = ({
  activeTab,
  outputData,
  loading
}: {
  activeTab: "json" | "preview";
  outputData?: OutputData | null;
  loading:boolean
}) => {
  if (!outputData) {
    return <p className="text-stone-400 text-center my-6">No output to show</p>
  }
  return (
    <>
      {activeTab == "preview" ? (
        (loading? <div className="flex justify-center items-center mt-10 ">
        <Loader/>
      </div> :<ParsedOutput output={outputData.output} />)
      ) : (
        <div className="">
          <OutputWrapper>

            <JsonFormatter json={JSON.stringify(outputData)} tabWith={4} />
          </OutputWrapper>
        </div>
      )}
      {/* <MetricsContainer data={outputData.metrics} /> */}
    </>
  );
};
const OutputWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" space-y-6 text-stone-300 px-6 py-2 bg-black rounded-lg m-4">
      {children}
    </div>
  );
};
const ParsedOutput = ({ output }: { output: string[] }) => {
  const outputEl = output[0];
  if (outputEl.endsWith(".png")) {
    return (
      <div className="w-full my-2 px-6">
        <img src={outputEl} alt="" className="w-full" />
      </div>
    );
  }
  if (outputEl.endsWith(".wav")) {
    return (
      <div className="w-full my-2 px-6">
        <AudioWave link={outputEl} />
      </div>
    );
  }
  return (
    <div className="">
      <OutputWrapper>
        <p>{outputEl}</p>
      </OutputWrapper>
    </div>
  );
};
export default Playground;