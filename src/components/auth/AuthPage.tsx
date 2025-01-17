"use client";
import { useState } from "react";
import { firebaseApp } from "@/config/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import withAuthRedirect from "./withAuthRedirect";
import { useRouter } from "next/navigation";

interface AuthPageContentProps {
  type: "login" | "signup";
}

function AuthPageContent({ type }: AuthPageContentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    const toastId = toast.loading(
      type === "login" ? "Logging in..." : "Signing up..."
    );

    try {
      let userCredential;
      if (type === "login") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);
      }
      const idToken = await userCredential.user.getIdToken();
      console.log("ID Token:", idToken);
      
      toast.update(toastId, { render: (userCredential.user.emailVerified ? (type === 'login' ? "Logged in successfully!" : "Signed up successfully!") : "A verification email has been sent to your email! Please verify your email"), type: "success", isLoading: false, autoClose: 5000 });
      
      // Handle successful login/signup and token verification here
      router.push(type === 'login' ? '/' : '/login');
    } catch (error) {
      setError(
        type === "login" ? "Invalid email or password" : "Sign up failed"
      );
      toast.update(toastId, {
        render:
          type === "login" ? "Invalid email or password" : "Sign up failed",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error(
        `Error ${
          type === "login" ? "logging in" : "signing up"
        } with email and password:`,
        error
      );
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    // const toastId = toast.loading("Logging in with Google...");

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log("ID Token:", idToken);
      // toast.update(toastId, { render: "Logged in successfully!", type: "success", isLoading: false, autoClose: 5000 });
      // Handle successful login and token verification here
    } catch (error) {
      setError("Failed to log in with Google");
      // toast.update(toastId, {
      //   render: "Failed to log in with Google",
      //   type: "error",
      //   isLoading: false,
      //   autoClose: 5000,
      // });
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-max-w-md p-8 space-y-8 bg-[#0A090F] rounded-3xl shadow-md border border-[#2b2934]">
          <div className="text-center">
            <img
              src="/asset/clusterProtocol-logo 1.svg"
              alt="Cluster Protocol"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              {type === "login"
                ? "Login to Your Account!"
                : "Sign Up for an Account!"}
            </h2>
          </div>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-5">
              <div>
                <span className="text-sm text-neutral-400">Email Address</span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="appearance-none mt-1 rounded-md bg-[#0A090F] relative block w-full px-3 py-2.5 border border-[#46454a] placeholder-gray-500 rounded-t-md focus:outline-none sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <span className="text-sm text-neutral-400">Password</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none mt-1 bg-[#0A090F] rounded-md relative block w-full px-3 py-2.5 border border-[#46454a] placeholder-gray-500 rounded-t-md focus:outline-none sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            {type === "login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-neutral-400"
                  >
                    Remember Me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-neutral-400 hover:text-white underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {type === "login" ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>

          {/* OR Line Separator */}
          <div className="flex items-center justify-center my-6 px-5">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-neutral-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div className="mt-6 text-center text-neutral-400">
            <div className="flex justify-center gap-4 mt-2">
              <button
                className="text-neutral-300 flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md text-sm"
                onClick={handleGoogleLogin}
              >
                <img
                  src="/icons/google.png"
                  alt="Google"
                  className="w-6 h-6"
                />
                Google
              </button>
              {/* <button className="text-neutral-300 text-sm flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md">
                <img src="/asset/Vector.svg" alt="Facebook" />
                Facebook
              </button>
              <button className="text-neutral-300 text-sm flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md">
                <img src="/asset/Instagram_1_.svg" alt="Instagram" />
                Instagram
              </button>
              <button className="text-neutral-300 flex gap-1 items-center border border-neutral-500 px-2 py-1 rounded-md text-sm">
                <img
                  src="/asset/Group1.svg"
                  alt="FAM Protocol"
                  className="w-6 h-6"
                />
                FAM Protocol
              </button> */}
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-neutral-400">
            {type === "login" ? (
              <>
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-white hover:text-gray-300 underline"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-white hover:text-gray-300 underline"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuthRedirect(AuthPageContent);
