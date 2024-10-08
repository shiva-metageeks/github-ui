// authenticatedRequest.js
import axios from "axios";
import { firebaseAuth } from "./firebase";

const authenticatedRequest = axios.create({
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

export { authenticatedRequest };
