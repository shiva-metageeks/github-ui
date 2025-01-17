import React from "react";
import ProjectList from "@/components/ProjectList";
import SpaceComponent from "@/components/owner/SpacecComponent";
import Header from "@/components/Header";
import { publicRequest } from "@/config/request";
import { Space } from "@/types/Space";

const page = async () => {
  const publicSpacesReq = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/spaces/public")
  const publicSpaces:Space[] = await publicSpacesReq.json()
  
  return <SpaceComponent data={publicSpaces}/>
};
export default page;
