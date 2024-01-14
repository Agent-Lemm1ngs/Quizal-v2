"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { type NextRequest } from "next/server";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastMessage = toast.loading("Validating credentials...", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const userInfo = await response.json();
    const status = await response.status;
    if (status === 200) {
      toast.update(toastMessage, {
        render: userInfo.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
      signIn("credentials", {
        ...data,
        callbackUrl: "/dashboard",
      });
    } else {
      toast.update(toastMessage, {
        render: userInfo.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-col bg-blue-100 items-center w-full h-[650px] p-5">
      <ToastContainer />
      <div className="p-10 border-2 rounded-lg bg-white shadow-xl w-full h-full sm:w-4/5   max-w-4xl gap-10 flex flex-col lg:flex-row">
        <form
          className="flex flex-col gap-5 w-full justify-center h-full items-center md:items-start"
          onSubmit={loginUser}
        >
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p>
              Don&apos;t have an account yet?{" "}
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
              onChange={(e) => setData({ ...data, email: e.target.value })}
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
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="••••••••"
              className="border-2 p-2 duration-75 w-full outline-none focus:border-blue-400 focus:shadow rounded"
            />
          </div>
          <h1 className="italic text-gray-400">
            By pressing Login, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms and Conditions
            </Link>
          </h1>
          <button
            type="submit"
            className="btn border-2 border-blue-400 font-bold text-xl p-3 rounded w-full disabled:cursor-progress disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex w-full h-full  items-center justify-center relative">
          <Image src="/drawings/clouds.svg" alt="clouds" fill={true} />
        </div>
      </div>
    </main>
  );
}
