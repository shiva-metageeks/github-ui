import RepositoryViewContainer from "@/components/owner_repoName/RepositoryViewContainer";
import { gitlabAxiosInstance } from "@/utils/axios";
import { fetchFile, getData } from "@/utils/getData";
import ReadmeViewer from "@/components/ReadmeViewer";
import { Project } from "@/types/project";
import Header from "@/components/owner_repoName/Header";
import SpaceIframe from "./components/SpaceIframe";
import { fetchRequest, publicRequest } from "@/config/request";
import { Space } from "@/types/Space";
import SpaceViewContent from "./components/SpaceViewContent";

const page = async ({
  params,
}: {
  params: { owner: string; repoName: string; branch: string };
}) => {
  const data: Space = await fetchRequest(`/spaces/namespace/${encodeURIComponent(params.owner + "/" + params.repoName)}`)

  const { projectId } = await getData({
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
      {/* <Header rootPath="spaces" pathname={pathname}/> */}
      <RepositoryViewContainer
        // tagsData={tagsData}
        pathname={pathname}
        owner={params.owner}
        repoName={params.repoName}
        rootPath={"spaces"}
      >
        <SpaceViewContent data={data} emptyRepo={!data.deployed_url && !file}/>
      </RepositoryViewContainer>
    </div>
  );
};

export async function generateStaticParams() {

  const spaceData = await publicRequest("/spaces/all")
  const allSpaces: Space[] = spaceData.data

  return allSpaces.map((space) => {
    const owner = space.repository.path_with_namespace.split("/")[0];
    const repoName = space.repository.path_with_namespace.split("/")[1];
    return { owner, repoName };
  });
}

export default page;
