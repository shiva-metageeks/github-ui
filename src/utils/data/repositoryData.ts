import { GitlabProject } from "@/types/Gitlab"
import { gitlabAxiosInstance } from "../axios"


export const getAllDatasetsData = async () => {
    const projectsResp = await gitlabAxiosInstance
        .get("/groups/datasets/projects/shared")
    const projectsData: GitlabProject[] = projectsResp.data
    return projectsData
}
export const getAllModelsData = async () => {
    const projectsResp = await gitlabAxiosInstance
        .get("/groups/datasets/projects/shared")
    const projectsData: GitlabProject[] = projectsResp.data
    return projectsData
}

export const getSingleGitlabProjectById = async (id:number|string) => {
    const projectsResp = await gitlabAxiosInstance
        .get("/projects/")
    const projectsData: GitlabProject = projectsResp.data
    return projectsData
}
export const getSingleGitlabProjectByNamespace = async (namespace:string) => {
    const projectsResp = await gitlabAxiosInstance
        .get("/projects/"+encodeURIComponent(namespace))
    const projectsData: GitlabProject = projectsResp.data
    return projectsData
}