import React from "react";
import Link from "next/link";

interface CreateTokenButtonProps {}

const CreateTokenButton: React.FC<CreateTokenButtonProps> = () => {
  return (
    <Link
      href="/setting/create-access-token"
      className="px-8 py-3.5 text-white font-medium bg-gray-900 rounded-md border-2 border-solid border-zinc-600 shadow-[0px_2px_30px_rgba(147,97,232,0.25)] max-md:px-5"
    >
      + Create New Token
    </Link>
  );
};

export default CreateTokenButton;
