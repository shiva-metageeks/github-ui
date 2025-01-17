import React from "react";
import ProjectList from "@/components/ProjectList";
import { fetchRequest } from "@/config/request";

const Page = async () => {
 const data= await fetchRequest("/datasets/public")
  return <ProjectList rootPath="datasets" projectList={data}/>;
};

export default Page;
