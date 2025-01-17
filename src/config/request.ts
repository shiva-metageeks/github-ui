// authenticatedRequest.js
import axios from "axios";
import { firebaseAuth } from "./firebase";
export const fetchRequest=async(path:string)=>{
  const resp = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+path)
  const data = await resp.json()
  return data
}
const authenticatedRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
const publicRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

authenticatedRequest.interceptors.request.use(
  async (config) => {
    const user = firebaseAuth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { authenticatedRequest, publicRequest};
