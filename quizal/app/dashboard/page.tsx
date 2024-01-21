import { getSession, useSession } from "next-auth/react";

export default function Dashboard() {
  const session = getSession();
  return JSON.stringify(session);
}
