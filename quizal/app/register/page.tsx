import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <main className="flex flex-col bg-pink-100 items-center w-full  p-5">
      <div className="p-10 border-2 rounded-lg bg-white shadow-xl w-full h-96 sm:w-4/5  md:w-3/5 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold">
          It starts <span className="underline">now</span>. Say hello to that{" "}
          <span className="text-pink-500 font-bold">A+</span>
        </h1>

      </div>
    </main>
  );
}
