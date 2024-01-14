"use client";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
}
