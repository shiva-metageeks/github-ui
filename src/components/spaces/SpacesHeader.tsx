import React from "react";
import SearchBar from "@/components/SearchBar";
import NavigationItems from "@/components/NavigationItems";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col justify-center text-white items-center px-16 py-4 w-full max-md:px-5">
      <div className="flex flex-nowrap gap-5 justify-between w-full ">
        <div className="flex flex-wrap gap-7">
          <div className="flex gap-2 my-auto text-lg font-bold leading-loose ">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc3d8813791446cd0dee507d09d701fe224baeabd2953e3953b987c6e3a2800a?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
              alt=""
              className="object-contain shrink-0 w-7 aspect-[1.08]"
            />
            <span className="my-auto basis-auto">Hugging Face</span>
          </div>
          <SearchBar />
        </div>
        <NavigationItems rootPath="spaces" pathname="/spaces" />
      </div>
    </header>
  );
};

export default Header;
