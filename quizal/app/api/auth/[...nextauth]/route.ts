import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import User from "@/models/user";
import { list } from "postcss";
interface Session {
  user: {
    id: String;
    username: String;
    email: String;
  };
}
interface UserInfo {
  email: String;
  name: String;
  // other properties...
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      username: string;
    };
  }
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      console.log(sessionUser);
      session.user = {
        id: sessionUser._id,
        username: sessionUser.username,
        email: sessionUser.email,
      };

      return session;
    },
    async signIn({ user }) {
      const { name, email } = user;
      try {
        await connectDB();
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
          const profile = await User.create({
            email: email,
            username: name.replace(" ", "").toLowerCase(),
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
