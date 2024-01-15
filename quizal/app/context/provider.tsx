"use client";
import { SessionProvider } from "next-auth/react";
export default function Provider({ children: children, session: session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
