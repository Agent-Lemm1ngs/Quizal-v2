import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import Head from "next/head";
import Provider from "./context/provider";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import NavBar from "./ui/navbar";
import { getServerSession } from "next-auth/next";

export const metadata: Metadata = {
  title: "Quizal",
  description:
    "Boost your exam success and level up your learning with Quizal's engaging gamemodes, where you earn rewards by acing quizzes, participating in contests, and unlocking new levels of academic achievement.",
};
import "react-toastify/dist/ReactToastify.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession()) ?? null;
  return (
    <html lang="en">
      <Provider session={session}>
        <Head>
          <meta property="og:image" content="<generated>" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
        </Head>
        <body className={`${inter.className}`}>
          <NavBar />
          {children}
          <ToastContainer closeButton={false} />
          <div className="w-full flex flex-row p-5 items-center">
            <div className="flex-grow flex-row gap-2 flex items-center">
              <Link className="btn  text-blue-400 font-bold text-2xl" href="/">
                Quizal
              </Link>
              <h1>© 2023</h1>
            </div>
            <h1 className="justify-end flex-grow flex-row gap-2 flex items-center">
              <Link className="btn " href="/terms">
                Terms
              </Link>
            </h1>
          </div>
        </body>
      </Provider>
    </html>
  );
}
