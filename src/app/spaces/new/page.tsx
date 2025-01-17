import React from "react";
import NewSpaceForm from "./components/NewSpaceForm";
const Page: React.FC = () => {
  return (
    <div className=" my-5 flex flex-col items-center justify-center pt-5 px-4 ">
      {/* w-[90%] m-auto bg-[#000000] border border-[#17161B] rounded-xl */}
      {/* Header */}
      <div className="text-center mb-6 max-w-3xl  flex flex-col  items-center">
        <img
          src="/icons/multi-color-grids.png"
          alt="Logo"
          className="mx-auto mb-4 w-12 h-12"
        />
        <h1 className="text-4xl font-bold">CREATE A NEW SPACE</h1>
        <p className="text-[#858585] mt-4">
          <span className="underline cursor-pointer">Spaces</span> are Git
          repositories that host application code for Machine Learning demos.
          You can build Spaces with Python libraries like
          <span className="underline"> Streamlit </span> or{" "}
          <span className="underline">Gradio</span>, or using{" "}
          <span className="underline">Docker images.</span>
        </p>
      </div>

      {/* Form */}
      <NewSpaceForm/>
    </div>
  );
};
export default Page;
