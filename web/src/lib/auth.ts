import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
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
  ],
  secret: process.env.SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return Promise.resolve(
        url.startsWith(baseUrl + "/dashboard") ? url : "/dashboard"
      );
    },
  },
};
