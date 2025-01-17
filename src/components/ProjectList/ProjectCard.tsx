import { Project } from "@/types/project";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { generateAvatar } from "@/utils/avatar";
import { Model } from "@/types/Model";
import { Dataset } from "@/types/Dataset";
import { BsFillHeartFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

const ProjectCard = ({ project, link, queryData,
  isLiked,
  handleLike }: {
    project: Model | Dataset; link: string, isLiked: boolean
    queryData?: Model | Dataset;
    handleLike: any
  }) => {
  return (
      <article className="flex flex-col text-sm leading-none rounded-none relative ">
        <button className=" absolute top-3 left-3 border-[2px] text-green-600 border-green-600 text-xs font-font-semibold border rounded-sm  px-[2px]">Tokenized</button>
        {/* Top-left Half Border */}
        {/* <div className="absolute top-0 left-0 h-1/2 w-1/2 border-t border-l border-[#62626A] pointer-events-none rounded-l"></div> */}

        {/* Bottom-right Half Border */}
        {/* <div className="absolute bottom-0 right-0 h-1/2 w-1/2 border-b border-r border-[#62626A] pointer-events-none rounded-r"></div> */}
        <button className="flex gap-1 items-center absolute top-4 right-4 z-10 pl-4 py-2" onClick={()=>{handleLike(project._id)}}>
                { isLiked ?<BsFillHeartFill className="h-5 w-5" /> : <FiHeart className="h-5 w-5" />}
                <span className="text-gray-400 text-sm"> {queryData?.likes.count || project.likes.count}</span>
              </button>
        <div className="flex flex-wrap  py-2 px-5 w-full rounded-md  max-md:px-5 max-md:max-w-full  cursor-pointer card-hover-effect">
          <div className="flex flex-auto gap-1">
            <div className="flex flex-col grow gap-2 shrink-0 basis-0 w-fit">
              <Image className=" rounded-full w-[27%] mx-auto my-4 text-center" width={100} height={100} src={generateAvatar(project._id, link.includes("dataset") ? "rings" : "identicon")} alt="" />
              <h3 className=" text-center">
                {/* <span className="text-sm font-thin text-gray-400">{project.user.username}</span> / */}
                <span className="font-bold text-lg">{project.name}</span> </h3>
              <div className="flex flex-row justify-end items-center gap-2 text-neutral-500">
                {/* <div className="flex gap-1">
                  <span>
                    <IoMdGrid />
                  </span>
                  <span>Viewer</span>
                </div> */}
                {/* <GoDotFill /> */}
                <div className="flex ">
                  <span>
                    {formatDistanceToNow(project.created_at)} ago
                  </span>
                </div>
                {/* <GoDotFill /> */}
                {/* <div className="flex gap-1">
                  <span>
                    <MdFileDownload />
                  </span>
                  <span>{project.forks_count || 0}</span>
                </div> */}
                {/* <GoDotFill /> */}
                {/* <div className="flex gap-1">
                  <span>
                    <CiHeart />
                  </span>
                  <span>{project.star_count || 0}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Link href={link} className="absolute inset-0 w-full h-full">
        </Link>
      </article>
  );
};

export default ProjectCard;
