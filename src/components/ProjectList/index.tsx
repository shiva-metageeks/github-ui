"use client";
import FilterProject from "@/components/ProjectList/FilterProject";
import ProjectCard from "@/components/ProjectList/ProjectCard";
import SearchProject from "@/components/ProjectList/SearchProject";
import { authenticatedRequest } from "@/config/request";
import { useCurrentUser } from "@/hooks/user";
import { Dataset } from "@/types/Dataset";
import { Model } from "@/types/Model";
import { Project } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProjectList = ({ rootPath, projectList }: { rootPath: string, projectList: (Model | Dataset)[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<string>("trending");
  const { user } = useCurrentUser()
  const projectsQuery = useQuery({
    queryKey: ["projectsData"], queryFn: async () => {
      const projectsResp = await authenticatedRequest.get(`/${rootPath}/public?only_metadata=1`)
      const data: (Model | Dataset)[] = projectsResp.data
      return data
    }, enabled: !!user
  })

  const handleLike = async (id: string) => {
    const resp = await toast.promise(authenticatedRequest.get(`/${rootPath}/like/` + id), { pending: "loading..." })
    if (resp.status == 200) {
      projectsQuery.refetch()
    }
    console.log(resp)
  }
  let filteredList = projectList
  if(searchQuery){
    filteredList = filteredList.filter(d => d.repository.path_with_namespace.includes(searchQuery))
  } 
  if(sorting =="trending"){
    filteredList = filteredList.sort((a,b)=>a.likes.count-b.likes.count)
  }
  return (
    <div>
      <div className="py-10 px-10">
        {rootPath == "datasets" && <FilterProject />}
        <SearchProject setSearchQuery={setSearchQuery} projects={projectList} setSorting={setSorting}/>
        <div className="mb-4 p-4">
          <div className="grid grid-cols-4 gap-x-[3%] gap-y-10">
            {filteredList.map((item, index) => {
              const newData = projectsQuery.data?.find(s=>s._id==item._id)
              const isLiked =user?._id && newData?.likes.users.includes(user._id )
              return <ProjectCard
                key={index}
                project={item}
                link={`/${rootPath}/${item.repository.path_with_namespace}`}
                queryData={newData}
                isLiked={!!isLiked}
                handleLike={handleLike}
              />}
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
