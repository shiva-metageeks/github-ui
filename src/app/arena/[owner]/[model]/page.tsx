import React from "react";
import { FaInbox } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import {
  MdOutlineCloudUpload,
} from "react-icons/md";
import { RxText, RxTextAlignJustify } from "react-icons/rx";
import { IoRocketOutline } from "react-icons/io5";
import { GrDocumentText } from "react-icons/gr";
import { TbReportSearch, TbVersions } from "react-icons/tb";
import { IoPlayOutline } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { RiDownload2Line, RiShareForwardLine } from "react-icons/ri";
import SidebarContent from "./components/SidebarContent";
import Playground from "./components/Playground";
import { getModelsData } from "../../page";


const page = async ({ params }: { params: { owner: string; model: string } }) => {
  const modelsData = await getModelsData()
  const currentModel = modelsData.find(m => (m.owner == params.owner && m.title == params.model))
  if (!currentModel) throw new Error(`No model found for ${params.owner}/${params.model}`)
  return (
    <div className="min-h-screen bg-[#0A090F] text-white">
      <div className="flex min-h-[90vh]">
        <SidebarContent modelsData={modelsData} />

        <div className=" pt-6 ml-auto w-[82%] flex flex-col">

          <div className="px-6 border-b border-[#272530]">
            <h1 className="text-2xl font-bold mb-2">
              {currentModel?.title}
            </h1>
            <div className="max-w-xl">
              <p className="text-gray-400 mb-4">
                {currentModel.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-gray-600 rounded bg-black text-gray-300">
                Warm
              </button>
              <div className="inline-block p-[1px] rounded-[5px] bg-gradient-to-r from-blue-400 to-purple-500">
                <button className="bg-black text-white px-6 py-1 rounded-[5px] hover:bg-[#333] transition">
                  Public
                </button>
              </div>
              {/* <button className="px-3 py-1 text-sm border border-gray-600 rounded bg-black text-gray-300">
                487.5k runs
              </button> */}
            </div>

            <div className="bg-[#0A090F] text-white py-4">
              <div className="flex items-center text-sm space-x-5 text-gray-400">
                <span className="flex items-center gap-1">
                  <IoPlayOutline className="w-5 h-5" />
                  Playground
                </span>

                {/* <span className="flex items-center gap-1">
                  <IoRocketOutline className="w-5 h-5" />
                  API
                </span>

                <span className="flex items-center gap-1">
                  <FaInbox className="w-4 h-4" />
                  Examples
                </span>

                <span className="flex items-center gap-1">
                  <GrDocumentText className="w-4 h-4" />
                  README
                </span>

                <span className="flex items-center gap-1">
                  <TbVersions className="w-5 h-5" />
                  Versions
                </span> */}
              </div>
            </div>

          </div>
          <div className="flex-1">
          <Playground modelData={currentModel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;


