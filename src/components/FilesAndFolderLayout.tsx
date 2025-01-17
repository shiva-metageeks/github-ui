"use client"
import FolderStructure from "./FolderStructure";
import SelectBranch from "./SelectBranch";
import { FileAndFolderLayoutProps } from "@/types/type";
import TimeAgo from "./TimeAgo";
import EmptyRepoPlaceholder from "./repository/EmptyRepoPlaceholder";
import { useEffect } from "react";

const FilesAndFolderLayout = ({
  initialBranch,
  path,
  data,
  owner,
  repoName,
  commits,
  contributors,
  totalCommits,
  projectId,
  branchName,
  rootPath,
}: FileAndFolderLayoutProps) => {

  useEffect(() => {
    console.log({initialBranch,
      path,
      data,
      owner,
      repoName,
      commits,
      contributors,
      totalCommits,
      projectId,
      branchName,
      rootPath,}, 404)
  }, [])
  const latestCommit =
    commits
      .sort(
        (a, b) =>
          new Date(b.committed_date).getTime() -
          new Date(a.committed_date).getTime()
      )
      .find(() => true) || null;
  if (totalCommits == -1 || !totalCommits) {
    return <EmptyRepoPlaceholder repoUrl={`https://git.clusterprotocol.ai/${owner}/${repoName}`} />
  }
  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full">
        <div className="grid w-full  min-h-screen py-4 pb-20 gap-16 sm:p-4 font-[family-name:var(--font-geist-sans)]">
          <div className="py-4 w-full">
            <section className="flex justify-between mb-4 items-center flex-wrap gap-10 rounded-none">
              <div className="flex gap-3.5 text-sm leading-none whitespace-nowrap text-neutral-400">
                <SelectBranch
                  initialBranch={initialBranch}
                  path={path}
                  rootPath={rootPath}
                  owner={owner}
                  repoName={repoName}
                  branchName={branchName}
                />
                <h2 className="my-auto">{repoName}</h2>
              </div>
              <div className="flex gap-7 items-center">
                <div className="flex flex-col justify-center items-center self-stretch px-0.5 my-auto w-5 h-5 bg-violet-500 rounded-full border border-solid border-stone-300">
                  {/* <Image
                    width={20}
                    height={20}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcbe3e3ea3caef502d6e61008557f88e5260b8eaca2ebcdda7dbe2db92446d24?placeholderIfAbsent=true&apiKey=3ffd321d22914a748ca8bbca39c4d0b3"
                    alt=""
                    className="object-contain z-10 w-5 rounded-full aspect-square"
                  /> */}
                </div>
                <p className="self-stretch my-auto text-sm leading-none text-neutral-400">
                  {contributors.length} contributors
                </p>
                <button className="flex gap-2 self-stretch px-3 py-1.5 text-sm leading-none rounded-md border border-solid bg-zinc-800 border-zinc-700 text-neutral-400">
                  {/* <Image
                    width={20}
                    height={20}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/af336e2f2e3523f0e6773064038bdcad68176605edb845336c948ebe3297d450?placeholderIfAbsent=true&apiKey=3ffd321d22914a748ca8bbca39c4d0b3"
                    alt=""
                    className="object-contain shrink-0 my-auto aspect-[0.73] w-[11px]"
                  /> */}
                  <span className="basis-auto">
                    History: {totalCommits} Commits
                  </span>
                </button>
              </div>
            </section>
            <div className="flex flex-col text-base leading-none rounded-none text-neutral-400">
              <div className="flex flex-col pb-5 w-full rounded-t-xl border border-solid h-fit bg-zinc-950 border-zinc-800 max-md:max-w-full">
                <header className="flex flex-wrap gap-5 justify-between px-5 py-4 w-full font-semibold rounded-t-xl border border-solid bg-zinc-800 border-zinc-800 max-md:max-w-full">
                  <div className="flex gap-5">
                    <div className="flex shrink-0 self-start bg-violet-500 rounded-full h-[13px] w-[13px]" />
                    <div>{latestCommit?.author_name}</div>
                    <div className="basis-auto">{latestCommit?.title}</div>
                    <div>{latestCommit?.short_id}</div>
                    {/* <div>verified</div> */}
                  </div>
                  <div>
                    {latestCommit?.committed_date && (
                      <TimeAgo date={new Date(latestCommit.committed_date)} />
                    )}
                  </div>
                </header>
                <section className="flex flex-wrap gap-5 justify-between items-center self-center mt-3.5 w-full max-w-[1450px] max-md:max-w-full">
                  <ul className="w-full flex flex-col self-stretch my-auto whitespace-nowrap list-none p-0">
                    {data?.length > 0 && (
                      <FolderStructure
                        treeStructure={data}
                        branch={initialBranch}
                        owner={owner}
                        rootPath={rootPath}
                        repoName={repoName}
                        commits={commits}
                        projectId={projectId}
                      />
                    )}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesAndFolderLayout;
