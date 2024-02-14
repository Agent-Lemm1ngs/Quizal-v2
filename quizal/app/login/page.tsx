"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { type NextRequest } from "next/server";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <main className="flex flex-col bg-blue-100 items-center w-full h-[650px] p-5">
      <ToastContainer />
      <div className="p-10 border-2 rounded-lg bg-white shadow-xl w-full h-full sm:w-4/5   max-w-4xl gap-10 flex flex-col lg:flex-row">
        <div className="flex flex-col gap-5 w-full justify-center h-full items-center md:items-start">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
        <div className="flex w-full h-full  items-center justify-center relative">
          <Image src="/drawings/clouds.svg" alt="clouds" fill={true} />
        </div>
      </div>
    </main>
  );
}
