import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// 1. Definimos una interfaz para que TypeScript sepa qué campos tiene nuestro usuario
interface CustomUser {
  id: string;
  name: string;
  dni: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "DNI Login",
      credentials: {
        dni: { label: "DNI", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.dni || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { dni: credentials.dni },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) return null;

        // Retornamos el objeto cumpliendo con los campos de la DB
        return {
          id: user.id,
          name: user.name,
          dni: user.dni,
        } as CustomUser; // Forzamos el tipo aquí
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario acaba de iniciar sesión, pasamos el DNI al token
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.dni = customUser.dni;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos el DNI del token a la sesión para el frontend
      if (session.user) {
        // Usamos aserciones de tipo para evitar el error de 'any'
        (session.user as { id: string }).id = token.id as string;
        (session.user as { dni: string }).dni = token.dni as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
