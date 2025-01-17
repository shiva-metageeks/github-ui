"use client"
import { ModelDataItem } from '@/contants/temp-model-data'
import { ModelType } from '@/types/models/model'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegImage } from 'react-icons/fa6'
import { HiOutlineChatAlt } from 'react-icons/hi'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
const sidebarOptionsData = [
    {
        title: "Chat Completion Models",
        id: "chat-completion",
        icon: <HiOutlineChatAlt className="h-5 w-5 text-neutral-500"/>
    },
    {
        title: "Image Generation Models",
        id: "image-generation",
        icon: <FaRegImage className="h-5 w-5 text-neutral-500"/>
    },
    {
        title: "Image Detection Models",
        id: "image-detection",
        icon: <FaRegImage className="h-5 w-5 text-neutral-500"/>
    },
    {
        title: "Speech Models",
        id: "text-to-speech",
        icon: <VscAccount className="h-5 w-5 text-neutral-500"/>
    },
]
const SidebarContent = ({modelsData}:{modelsData:ModelType[]}) => {
    const [selectedOption,setSelectedOption] = useState<string | boolean>(sidebarOptionsData[0].id)
    const selectedOptionsModels = modelsData.filter((m=>m.category==selectedOption))

    return (<div className="w-[18%] fixed bg-[#0A090F] border-r border-x-gray-900 h-screen overflow-y-auto">
        {sidebarOptionsData.map(d => {
            return <div className='w-full'>
                <button
                    className="flex items-center justify-center mt-4 w-full"
                    onClick={()=>{setSelectedOption(prev=>prev==d.id ? false :d.id)}}
                >
                    <div className="flex gap-2 flex-1 items-center justify-start pl-6 pr-4 border-t border-b py-3 border-neutral-700">
                        {d.icon}
                        <h3 className="font-normal">{d.title}</h3>
                        {selectedOption == d.id ? (
                            <MdKeyboardArrowDown className="h-5 w-5" />
                        ) : (
                            <MdKeyboardArrowRight className="h-5 w-5" />
                        )}
                    </div>
                </button>

                {selectedOption == d.id && (
                    <div className="mt-2 space-y-2 rounded-md px-8">
                        {selectedOptionsModels.map((model,i)=>{
                            return <Link href={`/arena/${model.owner}/${model.title}`} key={i} className="w-full block py-2 cursor-pointer hover:bg-[#0e0d15] text-left rounded">
                            <span>{model.title}</span>
                        </Link>
                        })}
                    </div>
                )}

            </div>
        })}
    </div>
    )
}

export default SidebarContent