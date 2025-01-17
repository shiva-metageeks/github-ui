"use client";
import React, { useEffect } from "react";
import TokenTable from "./TokenTable";
import CreateTokenButton from "./CreateTokenButton";
import { useGetApiKeys } from "@/hooks/keys";

interface AccessTokensProps {}

const AccessTokens: React.FC<AccessTokensProps> = () => {
  
  const { apiKeys, isLoading ,refetch} = useGetApiKeys();
  useEffect(()=>{
    refetch()
  },[])
  return (
    <main className="flex flex-col rounded-none">
      <section className="flex flex-col pt-7 pb-56 w-full rounded-2xl border border-solid border-zinc-900 max-md:pb-24 max-md:max-w-full">
        <h1 className="self-start ml-12 text-2xl font-medium text-white max-md:ml-2.5">
          Access Tokens
        </h1>
        <hr className="shrink-0 mt-5 max-w-full h-px border border-solid border-zinc-800 w-[1572px] max-md:mr-0.5" />
        <div className="flex flex-col px-12 mt-12 -mb-11 w-full text-base max-md:px-5 max-md:mt-10 max-md:mb-2.5 max-md:max-w-full">
          <h2 className="self-start font-semibold text-stone-300">
            User Access Tokens
          </h2>
          <div className="flex flex-wrap gap-5 justify-between mt-3 text-zinc-500 max-md:max-w-full">
            <p className="max-md:max-w-full">
              Access tokens authenticate your identity to the Cluster Protocol
              and allow applications to perform actions based on token
              permissions.
              <br />
              <strong className="font-bold text-neutral-400">
                Do not share your Access tokens with anyone;
              </strong>{" "}
              we regularly check for leaked Access Tokens and remove them
              immediately.
            </p>
            <CreateTokenButton />
          </div>
          {apiKeys ? <TokenTable tokens={apiKeys} /> : <div>Loading...</div>}
        </div>
      </section>
    </main>
  );
};

export default AccessTokens;
