import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isValidPassword) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
