import Link from "next/link";
import React from "react";

const DatasetInfo = ({
  owner,
  repoName,
}: {
  owner: string;
  repoName: string;
}) => {
  return (
    <div className="flex gap-1.5 items-center max-w-full text-xl leading-snug whitespace-nowrap w-[425px]">
      <div className="flex gap-1.5 self-stretch my-auto font-semibold text-white">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e646d1e6be595f29b772dd0aad5b703e8522fa4c2254f5bf6f234fb316a0dbd9?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          alt=""
          className="object-contain shrink-0 w-5 aspect-square"
        />
        {/* <span className="my-auto">Datasets:</span> */}
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdc09d6dc5cc1be170ffda8c20df001c5128dbe3578711eaa93dcfdb2ad4dd84?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-3.5 rounded aspect-square"
      />
      <Link href={`/${owner}`} className="self-stretch my-auto text-gray-400">
        {owner}
      </Link>
      <div className="flex gap-0.5 self-start mt-1.5">
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-white">{repoName}</span>
      </div>
      <div className="flex gap-4 self-stretch text-sm leading-none text-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/15e41482c75e1f7ce9b6dbcfe59a82d0e26ad4279750198ea4efdaa3da8ec2bb?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          alt=""
          className="object-contain shrink-0 my-auto w-3.5 aspect-square"
        />
        {/* <div className="flex gap-1.5 items-center py-px pr-px pl-2 w-28 bg-gray-600 rounded-md">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0aefc42288580767d8bdb486577693fe1e1cff62363c3f4d1a00499173990d5e?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
          />
          <span className="self-stretch my-auto text-white">like</span>
          <span className="self-stretch px-2 py-2 text-white">28</span>
        </div> */}
      </div>
    </div>
  );
};

export default DatasetInfo;
