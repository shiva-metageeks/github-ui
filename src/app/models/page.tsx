import React from "react";
import ProjectList from "@/components/ProjectList";
import axios from "axios";
import { fetchRequest } from "@/config/request";

const Page = async () => {

  const data= await fetchRequest("/models/public")
  return <ProjectList rootPath="models" projectList={data}/>;
};

export default Page;
