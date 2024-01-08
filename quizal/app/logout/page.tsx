import { useSession, signOut } from "next-auth/react";

export default function SignOut() {
  async function handleSignOut() {
    signOut();
  }
  

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
