import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import User from "@/models/user";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session: session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      console.log(profile);
      try {
        await connectDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          const user = await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            name: profile.name,
            avatar: profile.picture,
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
