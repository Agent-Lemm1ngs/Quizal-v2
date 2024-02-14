import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import User from "@/models/user";
import { list } from "postcss";
interface Session {
  user: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  };
}
interface UserInfo {
  email: string;
  name: string;
  image: string;
  // other properties...
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      console.log(session);
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      console.log(sessionUser);
      session.user = {
        id: sessionUser._id,
        avatar: session.user.image,
        username: sessionUser.username,
        email: sessionUser.email,
      };

      return session;
    },
    async signIn({ user }: { user: UserInfo }) {
      const { name, email } = user;
      try {
        await connectDB();
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
          const profile = await User.create({
            email: email,
            username: name.replace(" ", "").toLowerCase(),
            name: name,
            avatar: user.image,
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
