"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { type NextRequest } from "next/server";
import { signIn, useSession } from "next-auth/react";
import Captcha from "../ui/captcha";
function check_session() {
  const session = useSession();
  if (session) {
    return true;
  }
  return false;
}
export default function Login() {
  //if (check_session()) {
  //router.push("/dashboard");
  // }
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  console.log(error);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let value = await signIn("credentials", {
      email: data.email,
      password: data.password,
      //callbackUrl: "/dashboard",
      error: "Custom error message",
    });
    console.log(value);
    if (true) {
      if (!value.error) {
        toast.success("Succesfully logged in! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(value.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="flex flex-col bg-blue-100 items-center w-full h-screen p-5">
      <ToastContainer />
      <div className="p-10 border-2 rounded-lg bg-white shadow-xl w-full h-4/5 sm:w-4/5   max-w-4xl gap-10 flex flex-col lg:flex-row">
        <form
          className="flex flex-col gap-5 w-full justify-center h-full items-center md:items-start"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p>
              Don't have an account yet?{" "}
              <Link href="/register" className="underline">
                Register instead
              </Link>
            </p>
          </div>
          <div className="w-full items-center lg:items-start">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="on"
              required
              type="email"
              name="email"
              placeholder="youremail@email.com"
              className="border-2 p-2 duration-75 w-full outline-none focus:border-blue-400 focus:shadow rounded"
            />
          </div>
          <div className="w-full items-center lg:items-start">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="on"
              required
              type="password"
              name="password"
              placeholder="••••••••"
              className="border-2 p-2 duration-75 w-full outline-none focus:border-blue-400 focus:shadow rounded"
            />
          </div>
          <Captcha className="w-full" />
          {error && <h1 className="text-red-500">{error}</h1>}
          <button
            type="submit"
            className="btn border-2 border-blue-400 font-bold text-xl p-3 rounded w-full disabled:cursor-progress disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex w-full h-full relative">
          <Image
            src="/drawings/clouds.svg"
            alt="clouds"
            className="w-auto"
            fill={true}
          />
        </div>
      </div>
    </main>
  );
}
