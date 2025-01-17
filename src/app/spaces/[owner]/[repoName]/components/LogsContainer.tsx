import { Space } from '@/types/Space'
import React from 'react'
import { MdError } from "react-icons/md";

import { FaCheck } from 'react-icons/fa6'
import { Hourglass, Oval } from 'react-loader-spinner'
const logIds = ['creating_cloud_infrastructure', 'initializing_environment', 'pushing_code_to_repository', 'building_docker_image', 'deploying_docker_image_to_cloud', 'adding_ssl_certificate', 'final_configuration_and_setup']
const LogsContainer = ({ status }: { status: string }) => {
  const foundStatusIndex = logIds.findIndex(s => s == status)
  let currentStatusIndex = foundStatusIndex != -1 ? foundStatusIndex : 4
  if (status == "final_configuration_and_setup" || status=="success") {
    currentStatusIndex = 10
  }

  const isError = status == "error"
  return (
    <div className='py-6 px-[5%]'>
      <h3 className='text-xl mb-5'>Logs:</h3>
      <ul className='flex flex-col gap-8'>
        {
          logIds.map((id, index) => {
            return <li key={id} className='flex items-center gap-2'>

             {(isError && index>=currentStatusIndex) ?
             <div>
<ErrorIcon/>
             </div>
             : <div>
                {index > currentStatusIndex ? <LoadingIcon /> : (index == currentStatusIndex ? <LoadingIcon /> : <TickIcon />)}
              </div>}
              <span className={`text-2xl font-medium capitalize ${index < currentStatusIndex && "text-green-500"} ${index > currentStatusIndex && "text-orange-500 opacity-35"} ${index == currentStatusIndex && "text-white"}`}>{id.replaceAll("_", " ")}</span>
            </li>
          })
        }
      </ul>

    </div>
  )
}
const HourGlassIcon = () => {
  return <Hourglass
    visible={true}
    height="16"
    width="16"
    ariaLabel="hourglass-loading"
    wrapperStyle={{}}
    wrapperClass=""
    colors={['#6C757D', '#ffffff']}
  />
}
const LoadingIcon = () => {
  return <Oval
    visible={true}
    strokeWidth={9}
    height="24"
    width="24"
    ariaLabel="hourglass-loading"
    wrapperStyle={{}}
    wrapperClass=""
    color={"#ffffff"}
  />
}
const TickIcon = () => {
  return <div className='bg-[#198754] rounded-full w-6 h-6 flex items-center justify-center'>
    <FaCheck color={"#ffffff"} size={16} />
  </div>
}
const ErrorIcon = () => {
  return <MdError color={"#ef4444"} size={22} />
}
export default LogsContainer