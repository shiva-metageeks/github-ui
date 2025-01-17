import React from "react";
import Header from "../Header";
import DatasetInfo from "./DatasetInfo";
import DatasetTags from "./DatasetTags";
import DatasetNavigation from "./DatasetNavigation";
import { ITagsData } from "@/types/type";

const RepositoryViewContainer = ({
  tagsData,
  pathname,
  children,
  owner,
  repoName,
  rootPath,
}: {
  owner: string;
  repoName: string;
  tagsData?: ITagsData;
  pathname: string;
  children: React.ReactNode;
  rootPath: string;
}) => {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col items-center px-20 pt-10 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-start w-full max-w-[1400px] max-md:max-w-full">
          <DatasetInfo owner={owner} repoName={repoName} />
          {tagsData && <DatasetTags tagsData={tagsData} />}
          {rootPath === "spaces" ? null : (
            <DatasetNavigation pathname={pathname} rootPath={rootPath} tokenized_id={7}/>
          )}
        </div>
        {children}
      </section>
    </main>
  );
};

export default RepositoryViewContainer;
