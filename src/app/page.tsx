"use client"
import Link from "next/link";
import { Project } from "@/types/project";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default async function Home() {
  // const projects: Project[] = await fetch(
  //   "https://git.clusterprotocol.ai/api/v4/projects"
  // ).then((res) => res.json());

  // return (
  //   <div className="flex flex-col gap-4 p-4">
  //     {projects.map((project) => (
  //       <Link href={`/dataset/${project.path_with_namespace}`} key={project.id}>
  //         {project.name}
  //       </Link>
  //     ))}
  //   </div>
  // );
  const router = useRouter()
  useEffect(()=>{
    router.push("/spaces")
  })
  return <></>
}
