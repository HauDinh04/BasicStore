import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDB } from "@/lib/mongoDB";
import { compare } from "bcryptjs";
import Users from "@/lib/models/User";

// Mở rộng kiểu JWT và Session của NextAuth để thêm thông tin của người dùng
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  }

  interface JWT {
    id: string;
    role: string;
    userName: string;
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await ConnectToDB();

        const user = await Users.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("User not found");
        }

        const isMatchedPassword = await compare(
          credentials.password,
          user.password
        );
        if (!isMatchedPassword) {
          throw new Error("Incorrect password");
        }
        console.log("User found:", user);
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          userName: user.userName,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
          name: token.userName as string,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
