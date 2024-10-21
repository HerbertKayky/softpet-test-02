import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prismaClient from "./prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credenciais não fornecidas.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isValid) {
            // Converte o id para string antes de retornar
            return {
              ...user,
              id: user.id.toString(), // Aqui estamos convertendo o id
            } as NextAuthUser; // Certifique-se de que o retorno é do tipo NextAuthUser
          }
        }

        return null; // Retorne null se as credenciais não forem válidas
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString(); // Convertendo para string
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Garantindo que token.id é string
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
