"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth/";
export default function Provider({ children, session }, props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
