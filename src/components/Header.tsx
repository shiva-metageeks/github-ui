"use client";
import { useEffect, useRef, useState } from "react";
import { firebaseAuth } from "@/config/firebase";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ProfilePopup from "./setting/ProfilePopup";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const router = useRouter();
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { user ,loading , firebaseUser} = useCurrentUser();
  const pathname =usePathname()
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  };

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsProfilePopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(()=>{
    if(!firebaseUser && !loading && !["login","signup","spaces","datasets","models"].includes(pathname)){
      router.push("/login")
    }
  },[firebaseUser])
  return (
    <header className="bg-black sticky top-0 z-30 text-white flex justify-between items-center py-6 px-14 border-b border-[#201e27]">
      {/* Logo Section */}
      <div
        onClick={() => router.push("/")}
        className="text-xl cursor-pointer font-bold flex flex-col"
      >
        <img src="/asset/logo.svg" alt="" />
      </div>

      {/* Button Section */}
      <div className="flex gap-16 items-center ">


{/* Menu Items */}
<div className="flex gap-8">
        <ul className="flex items-center space-x-8 text-sm">
          <li className="relative group cursor-pointer">
        <Link className="font-semibold" href={"/datasets"}>Datasets</Link>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 -mb-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group cursor-pointer">
        <Link className="font-semibold" href={"/models"}>Models</Link>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 -mb-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group cursor-pointer">
        <Link className="font-semibold" href={"/spaces"}>Agents</Link>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 -mb-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group cursor-pointer">
        <Link className="font-semibold" href={"/deployment"}>Deployments</Link>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 -mb-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group cursor-pointer">
        <Link className="font-semibold" href={"/arena"}>Arena</Link>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 -mb-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
          {/* <li className="relative group cursor-pointer">
        <Link className="font-semibold" href={"#"}>Pricing</Link>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 -mb-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </li> */}
        </ul>
      </div>



        <div className="flex justify-center items-center gap-3">
          {!isUserLoggedIn && (
            <div className="inline-block p-[1px] rounded-[5px] bg-gradient-to-r from-blue-400 to-purple-500">
              <button
                onClick={handleClick}
                className="bg-black text-white px-6 py-2 rounded-[5px] hover:bg-[#333] transition"
              >
                Login
              </button>
              
            </div>
          )}
          <div className="flex relative  items-center justify-center gap-2 ">
            {user && isUserLoggedIn ? (
              <div className="flex items-center space-x-3" 
              onClick={() => setIsProfilePopupOpen((prev) => !prev)}
              >
              <span
                className="text-sm cursor-pointer hover:text-gray-300"
              >
                {user.name}
              </span>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user?.display_photo}
                  alt="Profile"
                  className="object-cover"
                />
              </div>
            </div>
            ) : null}

            {isProfilePopupOpen && (
              <div className="absolute top-14 right-0" ref={popupRef}>
                <ProfilePopup setIsProfilePopupOpen={setIsProfilePopupOpen} username={user?.username || ""}/>
              </div>
            )}
          </div>
          <ConnectButton/>
          {/* <img src="/asset/logo.svg" alt="Logo" /> */}
        </div>
      </div>    </header>
  );
};

export default Header;
