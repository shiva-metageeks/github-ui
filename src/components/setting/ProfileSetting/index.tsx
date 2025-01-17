"use client";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import InputField from "./InputField";
import SaveButton from "./SaveButton";
import { useCurrentUser } from "@/hooks/user";

const ProfileSettings = () => {
  const { user } = useCurrentUser();
  const optionalFields = [
    {
      label: "Full Name",
      key: "name",
      value: user?.name || "",
      placeholder: "Your full name",
      isSocial: false,
      optional: false,
    },
    {
      label: "Homepage",
      key: "homepage",
      value: user?.socials?.homepage || "",
      placeholder: "Your homepage URL",
      isSocial: true,
      optional: true,
    },
    {
      label: "AI & ML interests",
      key: "ai_ml_interests",
      value: user?.socials?.ai_ml_interests || "",
      placeholder: "Your AI & ML interests",
      isSocial: true,
      optional: true,
    },
    {
      label: "GitHub username",
      key: "github_username",
      value: user?.socials?.github_username || "",
      placeholder: "Your GitHub username",
      isSocial: true,
      optional: true,
    },
    {
      label: "Twitter username",
      key: "twitter_username",
      value: user?.socials?.twitter_username || "",
      placeholder: "Your Twitter username",
      isSocial: true,
      optional: true,
    },
    {
      label: "LinkedIn profile",
      key: "linkedin_profile",
      value: user?.socials?.linkedin_profile || "",
      placeholder: "Your LinkedIn profile URL",
      isSocial: true,
      optional: true,
    },
  ];

  return (
    <main className="flex flex-col rounded-none">
      <section className="flex flex-col px-px pt-5 w-full rounded-2xl border border-solid border-zinc-900 max-md:max-w-full">
        <h1 className="self-start ml-12 text-2xl font-medium text-white max-md:ml-2.5">
          Profile Settings
        </h1>
        <hr className="shrink-0 mt-5 max-w-full h-px border border-solid border-zinc-800 w-[1572px] max-md:mr-0.5" />
        <div className=" w-full max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[25%] items-center max-md:ml-0 max-md:w-full">
              <ProfileAvatar />
              {/* <div className="flex z-10 flex-wrap grow mr-0 text-base font-medium text-zinc-500 max-md:max-w-full">
                <div className="flex flex-col self-start mr-0 max-md:max-w-full">
                  <div className="shrink-0 h-px border border-solid border-zinc-800 max-md:max-w-full" />
                  
                </div>
                <div className="flex shrink-0 w-px bg-zinc-800 h-[762px]" />
              </div> */}
            </div>
            <div className="flex flex-col mb-10 px-10 border-l-[1px] border-zinc-800 w-[75%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-12 text-base font-medium text-zinc-500 max-md:mt-10 max-md:max-w-full">
                {user &&
                  optionalFields.map((field, index) => (
                    <InputField key={index} field={field} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileSettings;
