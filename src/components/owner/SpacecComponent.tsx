"use client";

import { Project } from "@/types/project";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SpaceCard from "./SpaceCard";
import SortButton from "./SortButton";
import { Space } from "@/types/Space";
import { useQueries, useQuery } from "@tanstack/react-query";
import { authenticatedRequest } from "@/config/request";
import Spinner from "../Spinner";
import { useCurrentUser } from "@/hooks/user";
import { toast } from "react-toastify";


const SpacesComponent = (
  {
    data
  }:
    {
      data: Space[]
    }
) => {
  const { user } = useCurrentUser()
  const spacesQuery = useQuery({
    queryKey: ["spacesData"], queryFn: async () => {
      const spacesResp = await authenticatedRequest.get("/spaces/public?only_metadata=1")
      const data: Space[] = spacesResp.data
      return data
    }, enabled: !!user
  })
  
  const handleLike =async (id:string)=>{
    const resp = await toast.promise(authenticatedRequest.get("/spaces/like/"+id),{pending:"loading..."})
    if(resp.status ==200){
      spacesQuery.refetch()
    }
    console.log(resp)
  }
  return (
    <section className="flex flex-col mb-10 px-[5%] py-10">
      {/* Search Bar */}
      {/* <div className="flex items-center justify-between my-4">
          <input
            type="text"
            placeholder="Search spaces..."
            className=" bg-[#0A090F] border border-[#292830] px-4 py-2 rounded focus:outline-none"
          />
          <div className="flex gap-5 items-center text-[#999999]">
            <p>Browse & ZeroGPU Spaces</p>
            <button className="bg-[#28272D] border border-[#464549] text-[#999999] px-4 py-2 rounded">
              Filter
            </button>
             <input
            type="text"
            placeholder="Full-text search"
            className=" bg-[#28272D] border border-[#464549] px-4 py-2 rounded focus:outline-none"
          />


            <button className="bg-[#28272D] border border-[#464549] text-[#999999] px-4 py-2 rounded flex items-center gap-3">
              <img src="/icons/arrow.svg" alt="" />
              Sort: Trending
            </button>
          </div>
        </div> */}
      <div className="w-full max-md:max-w-full">
        <h2 className="mb-3 font-semibold">Public Agents</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[2%] gap-y-8 w-full">
          {data.map((spaceData, index) => {
            const d = spacesQuery.data?.find(s=>s._id==spaceData._id)
            const isLiked =user?._id && d?.likes.users.includes(user._id )
            return <SpaceCard
              key={spaceData._id}
              link={`/spaces/${spaceData.repository.path_with_namespace}`}
              space={spaceData}
              queryData={d}
              isLiked={!!isLiked}
              handleLike={handleLike}
            />
          })}
        </div>
      </div>
      {/* <ExpandButton /> */}
    </section>
  );
};

export default SpacesComponent;
