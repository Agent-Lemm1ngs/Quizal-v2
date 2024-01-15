"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth/";
export default function Provider({ children, session: Session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
