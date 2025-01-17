"use client";
import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import Divider from "./Divider";
import { useCurrentUser } from "@/hooks/user";

interface AccountSettingsProps {
  username: string;
  email: string;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  username,
  email,
}) => {
  const { user } = useCurrentUser();

  return (
    <main className="flex flex-col font-medium rounded-none">
      <section className="flex flex-col pt-5 pb-12 w-full rounded-2xl border border-solid border-zinc-900 max-md:max-w-full">
        <h1 className="self-start ml-12 text-2xl text-white max-md:ml-2.5">
          Account Details
        </h1>
        <Divider />
        <form className="flex flex-col items-start px-12 mt-12 text-sm w-full  text-zinc-500 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <InputField label="Username" value={user?.name || "name"} />
          <InputField label="Primary email" value={user?.email || "email"} />
          <p className="mt-2 text-zinc-500 max-md:max-w-full">
            We will use this email to communicate with you. This is also the
            email to use to authenticate on abcd.com
          </p>
          {/* <Button text="Save Changes" /> */}
          {/* <Divider />
          <InputField
            label="Old password"
            placeholder="Enter old password"
            type="password"
          />
          <InputField
            label="Password"
            placeholder="Enter new password"
            type="password"
          />
          <InputField
            label="Confirm your new password"
            placeholder="Confirm new password"
            type="password"
          />
          <Button text="Save Change" /> */}
          {/* <Divider />
          <h2 className="mt-7 font-semibold text-stone-300">
            Additional emails
          </h2>
          <p className="mt-3 max-md:max-w-full">
            Link additional emails to your account to join your organizations
            easily and <br /> identify fit commits you make.
          </p>
          <Button text="Add an email" /> */}
        </form>
      </section>
    </main>
  );
};

export default AccountSettings;
