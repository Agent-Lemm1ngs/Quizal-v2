import NextAuthOptions from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";
const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "youremail@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const user = {
          id: 1,
          name: "J Smith",
          email: "youremail@email.com",
          password: "password",
        };
        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default options;
