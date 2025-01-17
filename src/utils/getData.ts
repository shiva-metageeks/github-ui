import { Branch, Commit, Contributor, FileStructure } from "@/types/type";
import { gitlabAxiosInstance } from "./axios";
import { ITagsData } from "@/types/type";

export const fetchProject = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    // console.log(response.data, "response.data");
    return response.data;
  } catch (error) {
    console.log(error, "response.error");
    return null;
  }
};

export const fetchBranches = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchData = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchCommit = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAllCommit = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchFile = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchContributor = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchProjectByOwner = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchUser = async (url: string) => {
  try {
    const response = await gitlabAxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProjectId = async ({
  owner,
  repoName,
}: {
  owner: string;
  repoName: string;
}) => {
  console.log(`/${owner}/${repoName}`);
  const projectIdentifier = encodeURIComponent(`${owner}/${repoName}`);
  const project = await fetchProject(`/${projectIdentifier}`);
  return project?.id ? project.id : -1;
};

export async function getData({
  currentBranch,
  root = [],
  owner,
  repoName,
}: {
  root: string[];
  currentBranch: string;
  owner: string;
  repoName: string;
}) {
  interface DefaultReturnValue {
    initialBranch: string;
    data: FileStructure[];
    commits: Commit[];
    contributors: Contributor[];
    totalCommits: number;
    projectId: number;
    branchName: string[];
    tagsData: ITagsData;
  }

  const tagsData = {
    like: 28,
    tasks: "intent classification",
    language: "english",
    dataset_type: "text",
    dataset_size: "1000",
    license: "MIT",
    modalities: ["text"],
    format: "json",
    sub_tasks: "intent classification",
    size: "1k-10k",
    libraries: "datasets",
    pandas: "pandas",
    croissant: "croissant +1",
  };

  const defaultReturnValue: DefaultReturnValue = {
    initialBranch: "main",
    data: [],
    commits: [],
    contributors: [],
    totalCommits: -1,
    projectId: -1,
    branchName: [],
    tagsData: tagsData,
  };
  const projectIdentifier = encodeURIComponent(`${owner}/${repoName}`);
  console.log(projectIdentifier, "projectIdentifier");
  const project = await fetchProject(`/projects/${projectIdentifier}`);
  if (!project) return defaultReturnValue;

  const projectId = project.id;
  defaultReturnValue.projectId = projectId;

  const branches: Branch[] = await fetchBranches(
    `/projects/${projectId}/repository/branches`
  );
  if (!branches) return defaultReturnValue;

  const branchName: string[] = branches.map((branch) => branch.name);
  defaultReturnValue.branchName = branchName;

  const branch = currentBranch || "main";
  const path = root.join("/") || "";
  defaultReturnValue.initialBranch = branch;

  const data: FileStructure[] = await fetchData(
    `/projects/${projectId}/repository/tree/?ref=${branch}&path=${path}`
  );
  defaultReturnValue.data = data;
  if (!data) return defaultReturnValue;
  const commits: Commit[] = await Promise.all(
    data.map(async (file) => {
      const res = await fetchCommit(
        `/projects/${projectId}/repository/commits?path=${file.path}&ref_name=${branch}`
      );
      return res;
    })
  );
  if (!commits) return defaultReturnValue;
  defaultReturnValue.commits = commits;

  const allCommits: Commit[] = await fetchAllCommit(
    `/projects/${projectId}/repository/commits`
  );
  defaultReturnValue.totalCommits = allCommits.length;
  if (!allCommits) return defaultReturnValue;
  const contributors: Contributor[] = await fetchContributor(
    `/projects/${projectId}/repository/contributors`
  );
  if (!contributors) return defaultReturnValue;
  defaultReturnValue.contributors = contributors;

  return defaultReturnValue;
}
