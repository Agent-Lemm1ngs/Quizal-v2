import NextAuth from "next-auth/next";
import googleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import User from "@/models/user";

interface UserInfo {
  name?: string;
  email?: string;
  username?: string;
  _id?: string;
}
const authOptions = {
  providers: [
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
