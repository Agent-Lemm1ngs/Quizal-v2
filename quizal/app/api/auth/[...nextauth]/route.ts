import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        //console.log(credentials);

        if (!credentials || !credentials.email || !credentials.password) {
          return Promise.resolve(null);
        }

        const exist = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!exist) {
          return Promise.resolve(null);
        }

        let result; // Move the variable declaration here

        try {
          result = await new Promise((resolve, reject) => {
            bcrypt.compare(credentials.password, exist.password, (err, res) => {
              if (!res) {
                reject(res);
              } else {
                resolve(res);
              }
            });
          });
        } catch (err) {
          console.log(err);
        }

        console.log(result);
        if (!result) {
          // Passwords do not match
          return Promise.resolve(null);
        } else {
          console.log(exist);
          return {
            password: exist.password,
            username: exist.username, // Adjust the properties as needed
            email: exist.email,
            // ... other properties ...
          };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
