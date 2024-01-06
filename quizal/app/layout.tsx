import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import NavBar from "./ui/navbar";
export const metadata: Metadata = {
  title: "Quizal",
  description:
    "Boost your exam success and level up your learning with Quizal's engaging gamemodes, where you earn rewards by acing quizzes, participating in contests, and unlocking new levels of academic achievement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </head>
      <body className={`${inter.className}`}>
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
        <NavBar />
        {children}
        <div className="w-full flex flex-row p-5 items-center">
          <Link className="btn  text-pink-500 font-bold text-2xl" href="/">
            Quizal
          </Link>
          <h1 className="flex-grow flex justify-end">© 2023</h1>
        </div>
      </body>
    </html>
  );
}
