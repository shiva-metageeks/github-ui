import React from "react";
import { MenuItem } from "./MenuItem";
import { useQueryClient } from "@tanstack/react-query";
import { firebaseAuth } from "@/config/firebase";

interface ProfileSettingsProps {
  items: Array<{ label: string; link: string; isHeader?: boolean }>;
  setIsProfilePopupOpen: (value: React.SetStateAction<boolean>) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  items,
  setIsProfilePopupOpen,
}) => {
  return (
    <nav className="flex flex-col text-sm leading-10 rounded-none max-w-[200px] text-neutral-400">
      <ul className="px-5 pt-0.5 pb-8 w-full bg-black rounded-md border border-solid border-zinc-900 shadow-[7px_7px_4px_rgba(0,0,0,1)]">
        {items.map((item, index) => (
          <div key={index} onClick={() => setIsProfilePopupOpen((prev) => !prev)}>
            <MenuItem
              key={index}
              link={item.link}
              label={item.label}
              isHeader={item.isHeader}
            />
          </div>
        ))}
      </ul>
    </nav>
  );
};
