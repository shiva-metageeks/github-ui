"use client"
import Link from 'next/link'
import React from 'react'


import { IoRocketOutline } from "react-icons/io5";
import { IArenaModel } from '@/types/Arena';
import Header from '@/components/Header';



const HomepageContent = ({models}:{models:IArenaModel[]}) => {
    
    const llmModels = models.filter(m=>m.category=="chat-completion") 
    const mediaModels = models.filter(m=>m.category!="chat-completion") 
  return (
    
<div>
      <div className="bg-black text-white  p-6 mx-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            <span className="text-white">LLM</span> MODELS
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {llmModels.map((model, index) => (
            <Link
            href={`/arena/${model.owner}/${model.title}`}
              key={index}
              className="   shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="relative pt-[60%] rounded-lg overflow-hidden">
              <img
                src={model.display_image}
                alt={model.title}
                className="w-full absolute top-0 left-0 object-cover"
              />
              </div>
              <h3 className="text-xl font-semibold mt-4">{model.title}</h3>
              <p className="mt-2 text-sm text-neutral-400">
                {model.description?.slice(0,100)}...
              </p>
              <div className="mt-auto pt-2 text-sm text-neutral-400 flex justify-start">
                {/* <span>{"Updated 10 hours ago"}</span> */}
                <div className="flex gap-1 items-center">
                  <IoRocketOutline className="h-4 w-4" />
                  <span>{model.total_runs +" runs"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>

       
{/* 
      <div className="flex p-6 mx-10 gap-8">
        <div className="flex flex-col basis-[50%]  ">
          <div className="flex flex-col ">
            <img
              src={largeSectionData.image}
              alt="Large Model"
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-white text-xl font-semibold">
              {largeSectionData.title}
            </h2>
            <p className="text-gray-400">{largeSectionData.description}</p>
            <div className="text-gray-500 text-sm flex justify-between mt-2">
              <span>{largeSectionData.updateInfo}</span>
              <div className="flex gap-1 items-center">
                <IoRocketOutline className="h-4 w-4" />
                <span>{largeSectionData.userStats}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-5 ">
            <div>
              <img
                src={largeSectionData.image}
                alt="Large Model"
                className="w-64 h-28 object-cover mb-4"
              />
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">
                {largeSectionData.title}
              </h2>
              <p className="text-gray-400">{largeSectionData.description}</p>
              <div className="text-gray-500 text-sm flex justify-between mt-2">
                <span>{largeSectionData.updateInfo}</span>
                <div className="flex gap-1 items-center">
                  <IoRocketOutline className="h-4 w-4" />
                  <span>{largeSectionData.userStats}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col basis-[50%] gap-6">
          {smallSectionData.map((data, index) => (
            <div key={index} className="flex gap-4 ">
              <div>
                <img
                  src={data.image}
                  alt={`Small Model ${index + 1}`}
                  className="w-44 h-24 object-cover "
                />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {data.title}
                </h3>
                <p className="text-gray-400">{data.description}</p>
                <div className="text-gray-500 text-sm flex justify-between mt-3">
                  <span>{data.updateInfo}</span>
                  <div className="flex gap-1 items-center">
                    <IoRocketOutline className="h-4 w-4" />
                    <span>{data.userStats}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="p-6 mx-10">
        <h2 className="text-white text-3xl font-bold mb-8">Media Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {mediaModels.map((model, index) => (
            <Link
            href={`/arena/${model.owner}/${model.title}`}
            key={index}
            className="relative rounded-xl cursor-pointer overflow-hidden"
          >
            {/* Gradient Border */}
            <div className="p-[1px] rounded-lg bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 h-full">
              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden h-full">
                <img
                  src={model.display_image}
                  alt={model.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {model.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {model.description?.slice(0,100)}
                  </p>
                  <div className="flex gap-1 items-center text-xs text-gray-400 mt-auto">
                    <IoRocketOutline className="h-4 w-4" />
                    <span>{model.total_runs}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomepageContent

