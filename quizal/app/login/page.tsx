import Image from "next/image";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Login() {
  return (
    <main className="flex flex-col bg-pink-100 items-center w-full h-screen p-5">
      <div className="p-10 border-2 rounded-lg bg-white shadow-xl w-full h-4/5 sm:w-4/5  md:w-3/5 max-w-4xl gap-5 flex flex-col">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <form className="flex flex-col gap-5">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="youremail@email.com"
              className="border-2 p-2 duration-75 w-full outline-none focus:border-pink-500 focus:shadow rounded"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="border-2 p-2 duration-75 w-full outline-none focus:border-pink-500 focus:shadow rounded"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
