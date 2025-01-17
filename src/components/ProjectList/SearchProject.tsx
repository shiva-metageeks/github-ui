"use client";

import { Dataset } from "@/types/Dataset";
import { Model } from "@/types/Model";
import { Project } from "@/types/project";
import React from "react";

const SearchProject = ({ projects , setSearchQuery ,setSorting }: { projects: (Model | Dataset)[] , setSearchQuery:any ,setSorting:any}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-2">
          <div>Found {projects.length} items</div>
          <div className="flex justify-center items-center gap-2 p-4">
            <input

            onChange={(e)=>setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-transparent border px-4 py-2 border-gray-300 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  dark:bg-zinc-950 dark:border-gray-700 "
            />
            <button className="text-white border-2 rounded-lg hover:bg-gray-700 text-sm border-gray-700 px-4 py-2 ">
              Search
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 p-4">
          {/* <select
            id="text"
            className="bg-gray-50 border px-4 py-2 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-zinc-950 dark:border-gray-700 "
          >
            <option selected value="fullText">
              Full text
            </option>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
          </select> */}
          <select
          onChange={(e)=>setSorting(e.target.value)}
            id="sortBy"
            className="focus:outline-none w-full bg-transparent border px-4 py-2 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-zinc-950 dark:border-gray-700 "
          >
            <option className="px-2 py-1" selected value="trending">
              Sort by trending
            </option>
            <option className="px-2 py-1" value="recent">
              Sort by recent
            </option>
            {/* <option className="px-2 py-1" value="star">
              Sort by star
            </option>
            <option className="px-2 py-1" value="fork">
              Sort by fork
            </option> */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchProject;
