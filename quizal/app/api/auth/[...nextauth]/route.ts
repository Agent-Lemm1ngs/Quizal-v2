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
    image: string;
  };
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
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ user }: { user: any }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
          const profile = await User.create({
            email: user.email,
            username: user.name.replace(" ", "").toLowerCase(),
            name: user.name,
            avatar: user.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
