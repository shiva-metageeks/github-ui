import RepositoryViewContainer from "@/components/owner_repoName/RepositoryViewContainer";
import { getData } from "@/utils/getData";
import FilesAndFolderLayout from "@/components/FilesAndFolderLayout";

export default async function Page({
  params,
}: {
  params: { owner: string; repoName: string; branch: string; root: string[] };
}) {
  console.log(params, "root-params");
  const root = params.root || [];
  const path = root.join("/") || "";
  console.log(path, "path-root");

  const {
    data,
    initialBranch,
    commits,
    contributors,
    totalCommits,
    projectId,
    branchName,
    tagsData,
  } = await getData({
    currentBranch: params.branch,
    root: params.root,
    owner: params.owner,
    repoName: params.repoName,
  });

  if (projectId === -1) return <p>No data Found</p>;
  const pathname = `/${params.owner}/${params.repoName}`;

  return (
    <RepositoryViewContainer
      owner={params.owner}
      repoName={params.repoName}
      // tagsData={tagsData}
      pathname={pathname}
      rootPath={"spaces"}
    >
      <FilesAndFolderLayout
        initialBranch={initialBranch}
        path={path}
        data={data}
        owner={params.owner}
        repoName={params.repoName}
        rootPath={"datasets"}
        commits={commits}
        contributors={contributors}
        totalCommits={totalCommits}
        projectId={projectId}
        branchName={branchName}
      />
    </RepositoryViewContainer>
  );
}
// https://git.clusterprotocol.ai/api/v4/projects/ucirvine%2Fsms_spam
