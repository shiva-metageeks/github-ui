"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import useDatasetAccess from "@/hooks/useDatasetAccess";
import { access } from "fs";

interface NavItem {
  isActive: boolean;
  label: string;
  icon: string;
  count?: number;
  link: string;
}

const DatasetNavigation = ({
  pathname,
  rootPath,
  tokenized_id=1
}: {
  pathname: string;
  rootPath: string;
  tokenized_id?:number
}) => {



  const currentPath = usePathname();
  const navItems: NavItem[] = [
    {
      isActive: currentPath === `/${rootPath}${pathname}`,
      label: "Description",
      link: `/${rootPath}${pathname}`,
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ddcd302b0d3531659e32b2444dc9f569b5c26cce5499baa24f69d0ff6d341a19?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
    },

  ];
  // @ts-expect-error
  const accessData:{owner:string,access:boolean,formattedDataset:any,purchaseDataset:any} | false = useDatasetAccess(pathname,rootPath)
  if((accessData && accessData.access) || tokenized_id==1 || rootPath != "datasets"){
    navItems.push(
      {
        isActive: currentPath.includes("tree"),
        link: `/${rootPath}${pathname}/tree/main`,
        label: "Files and versions",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/359757bd72a2d90830998a81a4c0a52e8ebcc1768a4934b228efa1861814a438?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      },)
  }
  return (
    <>
    <nav className="flex gap-3.5 items-center mt-6">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`flex gap-1.5 self-stretch ${
            item.isActive
              ? "p-3.5 text-base underline font-semibold "
              : "my-auto text-base text-white"
          }`}
        >
          <img
            loading="lazy"
            src={item.icon}
            alt=""
            className="object-contain shrink-0 my-auto w-4 aspect-square"
          />
          <span className="my-auto text-white">{item.label}</span>
        </Link>
      ))}
    </nav>
    {
      // @ts-expect-error
      (!accessData.access && accessData?.formattedDataset?.prices) && <div className="flex gap-2 justify-center w-full mb-6">
      {/* @ts-expect-error */}
        <button className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md "  onClick={()=>{accessData?.purchaseDataset("full")}}>Buy Full Access {accessData.formattedDataset.prices.fullAccessPrice} {accessData.formattedDataset.paymentUnit}</button>
      {/* @ts-expect-error */}
        <button className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-md " onClick={()=>{accessData?.purchaseDataset("expiry")}}>Buy Temporary Access {accessData.formattedDataset.prices.expiryAccessPrice} {accessData.formattedDataset.paymentUnit}</button>
      </div>
    }
    
    </>
  );
};

export default DatasetNavigation;
