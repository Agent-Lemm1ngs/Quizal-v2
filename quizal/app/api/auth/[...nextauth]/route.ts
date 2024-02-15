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
  callbacks: {
    async session({ session }: { session: { user: UserInfo } }) {
      console.log(session);
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      console.log(sessionUser);
      session.user = {
        name: sessionUser?.name,
        _id: sessionUser._id,
        username: sessionUser.username,
        email: sessionUser.email,
      };

      return session;
    },
    async signIn({ profile }: { profile: { name?: string; email?: string } }) {
      const { name, email } = profile;
      try {
        await connectDB();
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
          const profile = await User.create({
            email: email,

            name: name,
          });
        }
        return true;
      } catch (error) {
        console.log("error!" + error);
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
