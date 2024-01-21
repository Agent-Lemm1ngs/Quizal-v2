import NextAuth, { getHandlers, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { NextAuthConfig } from "next-auth";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
        id: { label: "ID", type: "string" },
      },
      async authorize(credentials, req) {
        //console.log(credentials);

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const exist = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!exist) {
          return null;
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

        if (!result) {
          // Passwords do not match
          return null;
        } else {
          console.log("LOGGED IN!", exist);
          return exist;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60 * 30, // 24 hours (adjust as needed)
  },

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - user:", user, token);
      if (user) {
        token.user = user;
        token.id = user.id;
        return token;
      }
      return {}; // Return an empty object instead of null
    },
    session({ session, user, token }) {
      console.log("CALLBACK!", session, user);

      if (session) {
        console.log("RETURNED TRUE ¬");
        return session;
      }
      return null;
    },
  },
} satisfies NextAuthConfig;
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as auth };
//const handler = NextAuth(authOptions);

//export { handler as GET, handler as POST };
