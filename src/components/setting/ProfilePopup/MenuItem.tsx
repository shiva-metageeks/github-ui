import React from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { firebaseAuth } from "@/config/firebase";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  label: string;
  link: string;
  isHeader?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  link,
  isHeader = false,
}) => {
  const Tag = isHeader ? "h2" : "li";
  const className = isHeader ? "font-semibold text-stone-300" : "";

  const queryClient = useQueryClient();
  const router = useRouter()

  const handleLogout = async () => {
    await firebaseAuth.signOut();
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    router.push("/login")
    };

  return (
    <Tag className={className}>
      {isHeader ? (
        label
      ) : (
        <>
          {label === "Logout" ? (
            <button
              onClick={handleLogout}
              className="hover:underline mr-4 whitespace-nowrap  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-stone-300"
            >
              {label}
            </button>
          ) : (
            <Link
              href={link}
              className="hover:underline mr-4 whitespace-nowrap  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-stone-300"
            >
              {label}
            </Link>
          )}
        </>
      )}
    </Tag>
  );
};
