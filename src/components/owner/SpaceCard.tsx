import React from "react";
import { Project } from "@/types/project";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { Space } from "@/types/Space";
import { formatDistanceToNow } from "date-fns";
import { generateAvatar } from "@/utils/avatar";
import Image from "next/image";
import { authenticatedRequest } from "@/config/request";
import { toast } from "react-toastify";
import { BsFillHeartFill } from "react-icons/bs";

const SpaceCard = ({
  space,
  link,
  queryData,
  isLiked,
  handleLike
}: {
  space: Space;
  link: string;
  isLiked:boolean
  queryData?: Space;
  handleLike:any
}) => {
  return (
    <div className="h-full flex flex-col card-hover-effect px-4 py-2 relative">
      

        <div className="relative overflow-hidden flex-1">
          {/* Top-left Half Border */}
          {/* <div className="absolute top-0 left-0 h-1/2 w-1/2 border-t border-l border-[#62626A] pointer-events-none rounded-l"></div> */}

          {/* Bottom-right Half Border */}
          {/* <div className="absolute bottom-0 right-0 h-1/2 w-1/2 border-b border-r border-[#62626A] pointer-events-none rounded-r"></div> */}

          {/* Card Content */}
          <div className="relative ">
            <div className="flex justify-between items-center">
              {/* <span className="text-sm border py-0.5 px-4 rounded">
                      {space.status}
                    </span> */}
              <span className={`text-sm text-xs borderbg-opacity-40 py-[1px] px-2 rounded border ${space.hardware_type.includes("cpu") ? "text-blue-300 border-blue-500 bg-blue-800 " : "text-purple-300 border-purple-500 bg-purple-800 "}`}>
                {space.hardware_type?.replace("_", " ") || "CPU Basic"}
              </span>
              <button className="flex gap-1 items-center relative z-10 pl-4 py-2" onClick={()=>{handleLike(space._id)}}>
                { isLiked ?<BsFillHeartFill className="h-5 w-5" /> : <FiHeart className="h-5 w-5" />}
                <span className="text-gray-400 text-sm"> {queryData?.likes.count || space.likes.count}</span>
              </button>

            </div>
            <Image className=" rounded-lg w-[27%] mx-auto my-4 text-center" width={100} height={100} src={generateAvatar(space._id)} alt="" />
            <h3 className=" text-center"><span className="text-sm font-thin text-gray-400">{space.user.username}</span> / <span className="font-bold text-lg">{space.name}</span> </h3>
          </div>
        </div>

        <div className="flex justify-end items-center text-sm">
          {/* <div className="flex gap-2">
                  <img src="/asset/Ellipse.svg" alt="" />
                  <h3>{space.user.username}</h3>
                </div> */}
          <p className="text-gray-400 mt-2 text-sm">created {formatDistanceToNow(space.created_at)} ago</p>
        </div>

        <Link href={link} className="absolute inset-0 w-full h-full">
        </Link>
    </div>

  );
};

export default SpaceCard;
