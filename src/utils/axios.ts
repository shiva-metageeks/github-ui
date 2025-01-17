import axios from "axios";

export const gitlabAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GIT_REPO_URL,
  headers: {
    Authorization: `Bearer ${process.env.GITLAB_ACCESS_TOKEN}`,
  },
});
