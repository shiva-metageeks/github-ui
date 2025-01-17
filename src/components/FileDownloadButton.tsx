"use client";
import React from "react";
import { GoDownload } from "react-icons/go";
import axios from "axios";

const FileDownloadButton = ({
  projectId,
  path,
  branch,
}: {
  projectId: number;
  path: string;
  branch: string;
}) => {
  const handleDownload = async () => {
    // const baseUrl = process.env.GIT_REPO_URL;
    const urlEncodedPath = encodeURIComponent(path);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_GIT_REPO_URL}/projects/${projectId}/repository/files/${urlEncodedPath}/raw?ref=${branch}`,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = path.split("/").pop() || "download"; // Fallback to 'download' if name is undefined
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
    }
  };
  return (
    <button onClick={handleDownload}>
      <GoDownload />
    </button>
  );
};

export default FileDownloadButton;
