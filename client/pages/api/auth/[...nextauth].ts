// all global configuration for the Next Auth
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_CLIENT_ID as string,
      //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      // }),
    ],
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    debug: true,
  });
