import React, { useState, useRef, useEffect } from "react";
import { MdApps } from "react-icons/md";
import { FiFile } from "react-icons/fi";
import { TbLogs } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoCopy } from "react-icons/io5";

const CloneRepositoryModal = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [cloneMethod, setCloneMethod] = useState<"https" | "ssh">("https");
  const [httpsCommand, setHttpsCommand] = useState("git clone https://huggingface.co/spaces/kanhaiya47/rgergr");
  const [sshCommand, setSshCommand] = useState("git clone git@huggingface.co:spaces/kanhaiya47/rgergr.git");
  const [skipLfsCommand, setSkipLfsCommand] = useState(cloneMethod === "https"
    ? "GIT_LFS_SKIP_SMUDGE=1 git clone https://huggingface.co/spaces/kanhaiya47/rgergr"
    : "GIT_LFS_SKIP_SMUDGE=1 git clone git@huggingface.co:spaces/kanhaiya47/rgergr.git"
  );

  const handleCopy = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/60"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="m-auto w-full max-w-2xl flex-col rounded-xl bg-zinc-800 shadow-alternate overflow-hidden sm:w-11/12 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 text-white">
          <h3 className="font-semibold text-base sm:text-lg">Clone this Space repository</h3>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="p-4 space-y-4 sm:p-6">
          <div className="flex items-center space-x-4">
            <button
              className={`w-1/2 sm:w-auto rounded-lg px-3 py-1 text-white ${cloneMethod === "https"
                ? "bg-zinc-900"
                : "bg-zinc-700"
                }`}
              onClick={() => setCloneMethod("https")}
            >
              HTTPS
            </button>

            <button
              className={`w-1/2 sm:w-auto rounded-lg px-3 py-1 text-white ${cloneMethod === "ssh"
                ? "bg-zinc-900"
                : "bg-zinc-700"
                }`}
              onClick={() => setCloneMethod("ssh")}
            >
              SSH
            </button>
          </div>

          <div className="border-t pt-4 relative">
            <p className="text-sm text-gray-400">
              Make sure you have git-lfs installed (https://git-lfs.com)
            </p>
            <pre className="bg-zinc-700 rounded px-4 py-2 mt-2 text-sm text-gray-100 whitespace-normal overflow-x-auto break-words relative">
              git lfs install
              <button
                className="absolute top-3 right-2 text-gray-300 hover:text-white"
                onClick={() => handleCopy("git lfs install")}
              >
                <IoCopy />
              </button>
            </pre>
          </div>

          <div className="border-t pt-4 relative">
            <pre className="bg-zinc-700 rounded px-4 py-2 mt-2 text-sm text-gray-100 whitespace-normal overflow-x-auto break-words relative">
              {cloneMethod === "https" ? httpsCommand : sshCommand}
              <button
                className="absolute top-3 right-2 text-gray-300 hover:text-white"
                onClick={() => handleCopy(cloneMethod === "https" ? httpsCommand : sshCommand)}
              >
                <IoCopy />
              </button>
            </pre>
          </div>

          <div className="border-t pt-4 relative">
            <p className="text-sm text-gray-400">
              If you want to clone without large files - just their pointers
            </p>
            <pre className="bg-zinc-700 rounded px-4 py-2 mt-2 text-sm text-gray-100 whitespace-normal overflow-x-auto break-words relative">
              {skipLfsCommand}
              <button
                className="absolute top-3 right-2 text-gray-300 hover:text-white"
                onClick={() => handleCopy(skipLfsCommand)}
              >
                <IoCopy />
              </button>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const DuplicateSpaceModal = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [owner, setOwner] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [hardware, setHardware] = useState("");

  const owners = ["john", "james"];
  const cpuList = [
    { id: 1, type: "CPU", name: "Intel Core i9-13900K" },
    { id: 2, type: "CPU", name: "AMD Ryzen 9 7950X" },
    { id: 3, type: "CPU", name: "Intel Core i7-12700K" },
    { id: 4, type: "CPU", name: "AMD Ryzen 7 5800X" },
  ];
  const gpuList = [
    { id: 1, type: "GPU", name: "NVIDIA GeForce RTX 4090" },
    { id: 2, type: "GPU", name: "AMD Radeon RX 7900 XTX" },
    { id: 3, type: "GPU", name: "NVIDIA GeForce RTX 3080" },
    { id: 4, type: "GPU", name: "AMD Radeon RX 6800 XT" },
  ];

  const handleDuplicateSpace = () => {
    alert("Space duplicated");
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/60"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="m-auto w-full max-w-2xl flex-col rounded-xl bg-zinc-800 shadow-alternate overflow-hidden sm:w-11/12 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 text-white">
          <h3 className="font-semibold text-base sm:text-lg">Duplicate this Space</h3>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdClose />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 sm:p-6">
          {/* Owner Selection and Space Name */}
          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              <label className="text-sm text-gray-400">Owner</label>
              <select
                className="form-input bg-zinc-700 text-gray-200 rounded-lg w-full p-2 border-r-8 border-zinc-700"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              >
                <option value="">Select an owner</option>
                {owners.map((ownerName) => (
                  <option key={ownerName} value={ownerName}>
                    {ownerName}
                  </option>
                ))}
              </select>
            </div>            
            
            <div className="w-1/2">
              <label className="text-sm text-gray-400">Space Name</label>
              <input
                type="text"
                className="form-input bg-zinc-700 text-gray-200 rounded-lg w-full p-2 border-r-8 border-zinc-700"
                placeholder="New space name"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-1/2">
              <label className="text-sm text-gray-400">Visibility</label>
              <select
                className="form-input bg-zinc-700 text-gray-200 rounded-lg w-full p-2 border-r-8 border-zinc-700"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as "public" | "private")}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <label className="text-sm text-gray-400">Space Hardware</label>
            <select
              className="form-input bg-zinc-700 text-gray-200 rounded-lg w-full p-2 border-r-8 border-zinc-700"
              value={hardware}
              onChange={(e) => setHardware(e.target.value)}
            >
              <option disabled value="">Select a hardware</option>
              <optgroup label="CPU" className="text-gray-300">
                {cpuList.map((cpu) => (
                  <option key={cpu.id} value={cpu.name}>
                    {cpu.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="GPU" className="text-gray-300">
                {gpuList.map((gpu) => (
                  <option key={gpu.id} value={gpu.name}>
                    {gpu.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t bg-zinc-900">
          <button
            className={`w-1/2 sm:w-auto rounded-lg px-3 py-1 text-white text-gray-300 bg-zinc-800 rounded-md hover:bg-opacity-80`}
            onClick={handleDuplicateSpace}
          >
            Duplicate Space
          </button>

          <button
            className="w-1/2 sm:w-auto rounded-lg px-3 py-1 text-white text-gray-300 bg-zinc-800 rounded-md hover:bg-opacity-80 ml-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const LogsModal = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isVisible, setIsVisible] = useState(false);
  const logs = [
    "[INFO] App started successfully...",
    "[INFO] Listening on port 3000...",
    "[ERROR] Something went wrong!"
  ];

  useEffect(() => {
    // Trigger visibility change to animate sliding up
    setIsVisible(true);
  }, []);

  return (
    <div
      className={
        `fixed inset-0 z-50 flex items-end justify-center backdrop-blur-sm bg-black/60 transition-all duration-300 
        ${isVisible ? "opacity-100" : "opacity-0"}`
      }
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className={`w-full bg-zinc-800 rounded-t-xl p-6 transform transition-all duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between text-white">
          <h3 className="font-semibold">Logs</h3>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="mt-4 text-gray-300">
          <pre className="bg-zinc-700 rounded-md p-4 text-sm">
            {logs.map((log, index) => (
              <div key={index}>
                {log}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

const SpaceViewMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [isDuplicateSpaceModelOpen, setIsDuplicateSpaceModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 absolute top-0 -translate-y-[125%] right-4">

        <button
          className="hidden sm:flex items-center text-white border-2 rounded-lg hover:bg-gray-700 text-sm border-gray-700 px-4 py-2"
          onClick={() => { }}
        >
          <MdApps className="mr-2" size={20} /> App
        </button>

        <button
          className="hidden sm:flex items-center text-white border-2 rounded-lg hover:bg-gray-700 text-sm border-gray-700 px-4 py-2"
          onClick={() => { }}
        >
          <FiFile className="mr-2" size={20} /> Files
        </button>

        <button
          className="hidden sm:flex items-center text-white border-2 rounded-lg hover:bg-gray-700 text-sm border-gray-700 px-4 py-2"
          onClick={() => { setIsLogsModalOpen(true) }}
        >
          <TbLogs className="mr-2" size={20} /> Logs
        </button>


        <div className="relative">
          <button className="p-2 border-2 rounded-lg hover:bg-gray-700 text-sm border-gray-700 px-4 py-2" onClick={() => setShowMenu((prev) => !prev)} >
            <BsThreeDotsVertical size={20} />
          </button>

          {showMenu && (
            <div
              ref={menuRef}
              className="absolute top-full right-0 mt-2 w-auto border-2 rounded-lg text-sm border-gray-700 shadow-lg z-10"
            >
              <ul className="whitespace-nowrap">

                {/** App, Files and Logs (only on mobile view)*/}
                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center sm:hidden"
                  onClick={() => { }}
                >
                  <MdApps className="mr-2" size={20} /> App
                </li>

                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center sm:hidden"
                  onClick={() => { }}
                >
                  <FiFile className="mr-2" size={20} /> Files
                </li>

                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center sm:hidden"
                  onClick={() => { setIsLogsModalOpen(true) }}
                >
                  <TbLogs className="mr-2" size={20} /> Logs
                </li>

                {/** Menu Options */}
                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => { setIsCloneModalOpen(true) }}
                >
                  <FaGitAlt className="mr-2" size={20} /> Clone Repository
                </li>

                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => { setIsDuplicateSpaceModalOpen(true) }}
                >
                  <HiOutlineDocumentDuplicate className="mr-2" size={20} /> Duplicate this Space
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isCloneModalOpen && <CloneRepositoryModal setIsModalOpen={setIsCloneModalOpen} />}
      {isLogsModalOpen && <LogsModal setIsModalOpen={setIsLogsModalOpen} />}
      {isDuplicateSpaceModelOpen && <DuplicateSpaceModal setIsModalOpen={setIsDuplicateSpaceModalOpen} />}

    </>
  );
};

export default SpaceViewMenu;
