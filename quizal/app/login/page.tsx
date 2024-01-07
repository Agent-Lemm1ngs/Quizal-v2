"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { type NextRequest } from "next/server";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
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
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
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
