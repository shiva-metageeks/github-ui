"use client";
import React, { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import InputField from "./InputField";
import SectionHeader from "./SectionHeader";
import { useGenerateAccessToken } from "@/hooks/keys";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateAccessToken = () => {
  const { generateAccessTokenMutation, isPending } = useGenerateAccessToken();
  const router = useRouter();
  const repositoryPermissions = [
    {
      label:
        "Read access to contents of all repos under your personal namespace",
      name: "readPersonalRepos",
    },
    {
      label: "Read access to contents of all public gated repos you can access",
      name: "readPublicRepos",
    },
    {
      label:
        "Write access to contents/settings of all repos under your personal namespace",
      name: "writePersonalRepos",
    },
  ];

  const webhookPermissions = [
    { label: "Access webhooks data", name: "accessWebhooks" },
    { label: "Create and manage webhooks", name: "manageWebhooks" },
  ];

  const inferencePermissions = [
    {
      label: "Make calls to the serverless Inference API",
      name: "callInferenceAPI",
    },
    {
      label: "Make calls to inference Endpoints",
      name: "callInferenceEndpoints",
    },
    { label: "Manage Inference Endpoints", name: "manageInferenceEndpoints" },
  ];

  const collectionPermissions = [
    {
      label: "Read access to all collections under your personal namespace",
      name: "readCollections",
    },
    {
      label: "Write access to all collections under your personal namespace",
      name: "writeCollections",
    },
  ];

  const discussionPermissions = [
    {
      label:
        "Interact with discussions / open PRs on repos under your personal namespace",
      name: "interactPersonalRepos",
    },
    {
      label: "Interact with discussions/Open PRs on external repos",
      name: "interactExternalRepos",
    },
    { label: "Interact with posts", name: "interactPosts" },
  ];

  const billingPermissions = [
    {
      label:
        "Read access to your billing usage and know if a payment method is set",
      name: "readBilling",
    },
  ];
  const [name, setName] = useState("");
  const handleCreateAccessToken = async () => {
    const permissions = inferencePermissions.map(
      (permission) => permission.name
    );
    await toast.promise(generateAccessTokenMutation({ permissions, name }),{pending:"Creating.."});
    router.push("/setting/access-tokens");
  };

  return (
    <form className="flex flex-col rounded-none">
      <div className="flex flex-col items-start pt-7 pb-11 w-full rounded-2xl border border-solid border-zinc-900 max-md:max-w-full">
        <h1 className="ml-12 text-2xl font-medium text-white max-md:ml-2.5">
          Create New Access Token
        </h1>
        <hr className="shrink-0 self-stretch mt-5 h-px border border-solid border-zinc-800 max-md:max-w-full" />
        <div className="flex flex-col items-start mt-12 ml-12 w-full max-w-[1203px] max-md:mt-10 max-md:max-w-full">
          <SectionHeader title="User Access Tokens" />
          <div className="flex gap-5 justify-between mt-4 max-w-full text-base font-medium text-zinc-500 w-[263px]">
            <div className="text-white">Fine-grained </div>
            {/* <div>Read</div>
            <div>Write</div> */}
          </div>
          <div className="flex shrink-0 mt-3 h-0.5 rounded-sm w-[88px]" />
          
          <h2 className="text-base mt-8 font-semibold text-stone-300">
            Use permissions
          </h2>

          <div className="mt-9 w-full max-w-[1139px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                <CheckboxGroup
                  title="Repositories"
                  isActive={true}
                  items={repositoryPermissions}
                />
                {/* <div className="mt-9">
                  <CheckboxGroup title="Webhooks" items={webhookPermissions} />
                </div>
                <div className="mt-9">
                  <CheckboxGroup
                    title="Discussions & Posts"
                    items={discussionPermissions}
                  />
                </div> */}
              </div>
              <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                <CheckboxGroup
                  title="Inference"
                  isActive={true}
                  items={inferencePermissions}
                />
                {/* <div className="mt-9">
                  <CheckboxGroup
                    title="Collections"
                    items={collectionPermissions}
                  />
                </div>
                <div className="mt-9">
                  <CheckboxGroup title="Billing" items={billingPermissions} />
                </div> */}
              </div>
            </div>
          </div>
          <p className="mt-4 text-base font-medium text-zinc-500">
            This cannot be changed after token creation.
          </p>
          <div className="w-full">
            <InputField
              label="Token Name"
              placeholder="Enter Token Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex justify-end w-full mt-4">
              <div className="inline-block p-[1px]  rounded-[5px] bg-gradient-to-r from-blue-400 to-purple-500">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateAccessToken();
                  }}
                  className="bg-black text-white px-6 py-2 rounded-[5px] hover:bg-[#333] transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="shrink-0 mt-6 max-w-full h-px border border-solid border-zinc-800 w-[1471px]" />
        {/* <div className="flex flex-col items-start mt-8 ml-12 w-full text-base max-w-[1193px] text-zinc-500 max-md:max-w-full">
          <SectionHeader title="Repositories permissions" />
          <p className="self-stretch mt-2 mr-24 max-md:mr-2.5 max-md:max-w-full">
            Override any user-level or orgilevel permissions st below for the
            specified repositories. The token will always have read access to
            all public repos contents.
          </p>
          <div className="flex flex-wrap gap-4 self-stretch px-5 py-3 mt-4 font-medium rounded-md border border-solid border-neutral-700 text-neutral-700">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7c7d74e4ae18d84c1fe4785ea0af07a285aeb73d6d00157bf853eb21fc572f5?placeholderIfAbsent=true&apiKey=caf73ded90744adfa0fe2d98abed61c0"
              className="object-contain shrink-0 self-start w-6 aspect-square"
              alt=""
            />
            <div className="flex-auto w-[1110px] max-md:max-w-full">
              Search for repos
            </div>
          </div>
          <CheckboxGroup
            items={[
              {
                label: "Read access to contents of selected repos",
                name: "readSelectedRepos",
              },
              {
                label:
                  "Interact with discussions/Open pull requests on selected repos",
                name: "interactSelectedRepos",
              },
              {
                label: "Write access to contents/settings of selected repos",
                name: "writeSelectedRepos",
              },
            ]}
          />
        </div> */}
      </div>
    </form>
  );
};

export default CreateAccessToken;
