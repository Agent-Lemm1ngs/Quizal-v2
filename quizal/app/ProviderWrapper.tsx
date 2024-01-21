"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
// Types
import type { Session } from "next-auth";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const ProviderWrapper = ({ children, session }: Props) => (
  <SessionProvider session={session}>
    <h1>{JSON.stringify(session)}</h1>
    {children}
  </SessionProvider>
);

export default ProviderWrapper;
