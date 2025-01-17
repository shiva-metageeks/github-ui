import React from "react";
import { ProfileSettings } from "./ProfileSetting";
import { useCurrentUser } from "@/hooks/user";

const ProfileSettingsWrapper = ({
  setIsProfilePopupOpen,
  username
}: {
  setIsProfilePopupOpen: (value: React.SetStateAction<boolean>) => void;
  username:string
}) => {
  const { user } = useCurrentUser();
  const menuItems = [
    {
      label: user?.name || "Profile",
      link: "/setting/profile-setting",
      isHeader: true,
    },
    { label: "My profile", link: "/"+username },
    { label: "Create New Access Token", link: "/setting/create-access-token" },
    { label: "Create Deployment", link: "/deployment/new" },
    { label: "Create Dataset", link: "/datasets/new" },
    { label: "Create Agent", link: "/spaces/new" },
    { label: "Create Model", link: "/models/new" },
    // { label: "Create Dataset", link: "/datasets/create" },
    { label: "Access Tokens", link: "/setting/access-tokens" },
    { label: "Profile Setting", link: "/setting/profile-setting/avatar" },

    { label: "Logout", link: "#" },
  ];
  return (
    <ProfileSettings
      setIsProfilePopupOpen={setIsProfilePopupOpen}
      items={menuItems}
    />
  );
};

export default ProfileSettingsWrapper;
