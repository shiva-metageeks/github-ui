"use client";
import React, { useState } from "react";
import { IApiKey } from "@/hooks/keys";
import { IoCopyOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useDeleteApiKey,
  useRegenerateApiKey,
  useRevokeApiKey,
} from "@/hooks/keys";
import { CiWarning } from "react-icons/ci";
import { GrRefresh } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

interface TokenRowProps {
  token: IApiKey;
}

function TimeAgo({ date }: { date: Date }) {
  return <span>{formatDistanceToNow(date, { addSuffix: true })}</span>;
}

const TokenRow: React.FC<TokenRowProps> = ({ token }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { deleteApiKeyMutation, isDeleting } = useDeleteApiKey();
  const { regenerateApiKeyMutation, isRegenerating } = useRegenerateApiKey();
  const { revokeApiKeyMutation, isRevoking } = useRevokeApiKey();
  const handleCopy = () => {
    navigator.clipboard.writeText(token.key);
    toast.success("Copied to clipboard", { autoClose: 1000 });
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this token?"
    );
    if (confirm) {
      const toastId = toast.loading("Deleting token...");
      deleteApiKeyMutation(token.key);
      toast.update(toastId, {
        render: "Token deleted",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setIsPopoverOpen(false);
    }
  };
  const handleRegenerate = () => {
    const confirm = window.confirm(
      "Are you sure you want to regenerate this token?"
    );
    if (confirm) {
      const toastId = toast.loading("Regenerating token...");
      regenerateApiKeyMutation(token.key);
      toast.update(toastId, {
        render: "Token regenerated",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setIsPopoverOpen(false);
    }
  };
  const handleRevoke = () => {
    const confirm = window.confirm(
      "Are you sure you want to revoke this token?"
    );
    if (confirm) {
      const toastId = toast.loading("Revoking token...");
      revokeApiKeyMutation(token.key);
      toast.update(toastId, {
        render: "Token revoked",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setIsPopoverOpen(false);
    }
  };

  return (
    <tr className="text-zinc-500">
      <td className="px-5 py-3.5 font-medium">
        <div className="flex items-center gap-2 flex-nowrap">
          <span>{token?.name || "New API Key"}</span>
          {token.revoked && (
            <CiWarning title="Revoked" className="text-red-500 me-2" />
          )}
        </div>
      </td>
      <td className="px-5 py-3.5  ">
        <div className="flex items-center flex-nowrap">
          <div className="flex items-center whitespace-nowrap">
            {token.key.slice(0, 3) + "*****" + token.key.slice(-3)}
          </div>
          <button onClick={handleCopy} className="ml-2 px-2 text-white rounded">
            {isCopied ? <IoCopy /> : <IoCopyOutline />}
          </button>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <TimeAgo date={new Date(token.created_at)} />
      </td>
      <td className="px-5 py-3.5 font-medium">
        {token.last_used_at ? (
          <TimeAgo date={new Date(token.last_used_at)} />
        ) : (
          "-"
        )}
      </td>
      <td className="px-5 py-3.5">
        <span className="px-5 py-1.5 whitespace-nowrap rounded-md border border-solid bg-zinc-800 border-zinc-800 text-neutral-400">
          {"Repo/Inference"}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/45a09189f93828544bba51f53b9dcc78e1389a35e90e4d16520b722431a7984b?placeholderIfAbsent=true&apiKey=caf73ded90744adfa0fe2d98abed61c0"
              className="object-contain shrink-0 w-9 rounded-full aspect-square"
              alt=""
            />
          </PopoverTrigger>
          <PopoverContent className=" shadow-md shadow-zinc-500 border border-solid border-zinc-800 bg-zinc-700 flex flex-col gap-2 w-fit">
            <p
              className="text-white cursor-pointer flex justify-start items-center hover:text-red-500 pr-6"
              onClick={handleDelete}
            >
              <span className="mr-2">
                <MdDeleteOutline />
              </span>
              <span>Delete</span>
            </p>

            <p
              className="text-white cursor-pointer flex justify-center items-center hover:text-green-500 pr-6"
              onClick={handleRegenerate}
            >
              <span className="mr-2">
                <GrRefresh />
              </span>
              <span>Refresh</span>
            </p>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
};

export default TokenRow;
