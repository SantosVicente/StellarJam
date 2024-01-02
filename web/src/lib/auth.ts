import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prismaClient.user.findFirst({
          where: { email: credentials?.email },
        });

        if (user && user.password === credentials?.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return Promise.resolve(
        url.startsWith(baseUrl + "/dashboard")
          ? url
          : `${process.env.NEXTAUTH_URL}/dashboard`
      );
    },
  },
};
