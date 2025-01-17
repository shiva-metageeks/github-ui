import React from "react";
import TokenRow from "./TokenRow";
import { IApiKey } from "@/hooks/keys";

interface TokenTableProps {
  tokens: IApiKey[];
}

const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  return (
    <>
      {tokens?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h3 className="text-white mt-12 text-xl">No tokens found</h3>
        </div>
      ) : (
        <div className="w-full mt-10 overflow-hidden border border-solid border-neutral-700 max-md:max-w-full rounded-2xl">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border border-solid border-neutral-700 text-stone-300 rounded-t-2xl">
                <th className="px-5 py-4 font-semibold text-left">Name</th>
                <th className="px-5 py-4 font-semibold text-left">Key</th>
                <th className="px-5 py-4 font-semibold text-left">
                  Last Refreshed Date
                </th>
                <th className="px-5 py-4 font-semibold text-left">
                  Last Used Date
                </th>
                <th className="px-5 py-4 font-semibold text-left">
                  Permissions
                </th>
                <th className="px-5 py-4 font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <React.Fragment key={index}>
                  <TokenRow token={token} />
                  {index < tokens.length - 1 && (
                    <tr>
                      <td colSpan={6}>
                        <hr className="border-t border-zinc-800" />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              <tr>
                <td className="rounded-bl-2xl"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="rounded-br-2xl"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TokenTable;
