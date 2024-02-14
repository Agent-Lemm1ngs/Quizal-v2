"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import React from "react";

import { TbLogin2 } from "react-icons/tb";
import { FaBars } from "react-icons/fa";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <ul className="bg-white p-3 flex flex-row w-full gap-5 border-b-2 border-blue-200">
        <Image src="/logo.svg" width={50} height={50} alt="logo" />
        <Link href="/" className="btn btn-primary text-blue-400">
          Quizal
        </Link>
        <div className="flex-grow justify-end flex-row w-full items-center gap-5 hidden sm:flex">
          <Link
            href="/login"
            className="btn text-2xl text-blue-400 gap-2 items-center flex flex-row"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="btn  border-2 border-blue-400 text-2xl text-blue-400 gap-2 items-center flex flex-row"
          >
            <TbLogin2 />
            Register
          </Link>
        </div>
        <div className="flex-grow justify-end flex-row w-full items-center gap-5 flex sm:hidden">
          <button
            className="btn btn-primary text-blue-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars />
          </button>
        </div>
      </ul>
      {isOpen && (
        <div className="w-full flex flex-col gap-5 text-center absolute shadow-xl p-5 bg-white sm:hidden">
          <Link
            href={"/login"}
            onClick={() => setIsOpen(false)}
            className="btn text-xl text-blue-400"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            onClick={() => setIsOpen(false)}
            className="btn text-xl border-2 border-blue-400 text-blue-400 gap-2 justify-center w-full flex flex-row"
          >
            <TbLogin2 />
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
