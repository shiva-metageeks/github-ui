"use client";
import { useCurrentUser } from "@/hooks/user";
import React from "react";

const ProfileAvatar: React.FC = () => {
  const { user } = useCurrentUser();
  return (
    <div className="flex flex-col items-center mt-14  max-w-full w-[177px] max-md:mt-10 max-md:ml-2.5">
      <img
        loading="lazy"
        src={user?.display_photo || ""}
        alt={user?.name || "profile photo"}
        className="object-contain rounded-full max-w-full aspect-square w-[110px]"
      />
      <div className="mt-5 text-center">
        {user?.name} <span className="text-neutral-700">({user?.email})</span>
      </div>
      {/* <button className="self-stretch whitespace-nowrap px-12 py-3.5 mt-4 bg-gray-900 rounded-md border-2 border-solid border-zinc-600 shadow-[0px_2px_30px_rgba(147,97,232,0.25)] max-md:px-5">
        Upload file
      </button> */}
    </div>
  );
};

export default ProfileAvatar;
