"use client"
import React, { useState } from 'react'
import SpaceIframe from './SpaceIframe'
import { Space } from '@/types/Space'
import LogsContainer from './LogsContainer'
import { useQuery } from '@tanstack/react-query'
import { publicRequest } from '@/config/request'
import { useCurrentUser } from '@/hooks/user'
import SpaceViewMenu from './SpaceViewMenu'

const SpaceViewContent = ({ data, emptyRepo }: { data: Space, emptyRepo: boolean }) => {
  // const [showLogs, setShowLogs] = useState(false)
  const {user}=  useCurrentUser()
  const statusQuery = useQuery({queryKey:[`status-${data._id}`],queryFn:async()=>{
    const resp = await publicRequest(`/spaces/${data._id}`)
    const respData:Space = resp.data
    return respData.status
  },refetchInterval:2*1000}) 
  console.log({statusQuery})
  return (
    <div className="relative w-full mt-4">
      <SpaceViewMenu />
      {/* { */}
      {/* //data.user._id == user?._id &&  */}
      {/* <button className="py-2 px-3 font-medium text-gray-300 absolute top-0 -translate-y-[125%] right-6 bg-blue-600 rounded-md" onClick={() => { setShowLogs(prev => !prev) }}>{showLogs ? "Hide Logs" : "Show Logs"}</button>} */}
      <div className="w-full bg-black border border-gray-800">
      {/* { */}
        {/* showLogs ?  */}
        {/* <LogsContainer status={statusQuery.data || ""}/> */}
        {/* : */}
        <SpaceIframe url={data.deployed_url || `https://${data.repository.path_with_namespace.replace("/", "-")}.spaces-dev.clusterprotocol.io`} emptyRepo={emptyRepo} />
      {/* } */}
      </div>
    </div>
  )
}

export default SpaceViewContent