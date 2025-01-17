import RepositoryViewContainer from "@/components/owner_repoName/RepositoryViewContainer";
import { gitlabAxiosInstance } from "@/utils/axios";
import { fetchFile, getData } from "@/utils/getData";
import ReadmeViewer from "@/components/ReadmeViewer";
import { Project } from "@/types/project";
import { publicRequest } from "@/config/request";
import { Dataset } from "@/types/Dataset";

const page = async ({
  params,
}: {
  params: { owner: string; repoName: string; branch: string };
}) => {
  console.log(params, "params");

  const { projectId, tagsData } = await getData({
    currentBranch: params.branch,
    root: [],
    owner: params.owner,
    repoName: params.repoName,
  });
  if (projectId === -1) {
    return <div>Project not found</div>;
  }
  const filePath = encodeURIComponent(`README.md`);
  const file = await fetchFile(
    `/projects/${projectId}/repository/files/${filePath}/raw?ref=${"main"}`
  );

  const pathname = `/${params.owner}/${params.repoName}`;

  return (
    <div>
      <RepositoryViewContainer
        tagsData={tagsData}
        pathname={pathname}
        owner={params.owner}
        repoName={params.repoName}
        rootPath={"datasets"}
      >
        {file ? (
          <ReadmeViewer readme={file} />
        ) : (
          <div>No description found</div>
        )}
      </RepositoryViewContainer>
    </div>
  );
};

export async function generateStaticParams() {
  const data = await publicRequest("/spaces/all")
  const allSpaces:Dataset[] = data.data

  return allSpaces.map((space) => {
    const owner = space.repository.path_with_namespace.split("/")[0];
    const repoName = space.repository.path_with_namespace.split("/")[1];
    return { owner, repoName };
  });
}

export default page;
