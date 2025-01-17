import React from "react";
import ProfileHeader from "@/components/owner/ProfileHeader";
import SpacesComponent from "@/components/owner/SpacecComponent";
import ModelList from "@/components/owner/ModelList";
import { User } from "@/types/user";
import { Project } from "@/types/project";
import { fetchProjectByOwner } from "@/utils/getData";
import { fetchUser } from "@/utils/getData";
import DataSetList from "@/components/owner/DataSetList";
import Header from "@/components/Header";

const OwnerPage = async ({
  params: { owner },
  rootPath,
}: {
  params: { owner: string };
  rootPath: string;
}) => {
  const encodedOwner = encodeURIComponent(owner);

  const projects: Project[] = await fetchProjectByOwner(
    `/users/${encodedOwner}/projects`
  );
  if (!projects || projects.length === 0) {
    return <p>No projects found</p>;
  }
  const user: User = await fetchUser(`/users/${projects[0].owner.id}`);

  if (!user) {
    return <p>No user found</p>;
  }

  return (
    <div className=" py-10">
      {/* <Header /> */}
      {!user ? <p>No user found</p> : <ProfileHeader user={user} />}
      {/* <SpacesComponent /> */}
      {projects.length > 0 ? (
        <ModelList models={projects} rootPath={rootPath} />
      ) : (
        <p>No models found</p>
      )}
      {projects.length > 0 ? (
        <DataSetList models={projects} rootPath={rootPath} />
      ) : (
        <p>No Datasets found</p>
      )}
    </div>
  );
};

export default OwnerPage;
